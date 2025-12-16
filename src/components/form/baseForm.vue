<template>
  <el-form :model="state" ref="formRef" v-bind="omit(formConfig, ['colLayout'])">
    <el-row :gutter="10">
      <template v-for="item in schema" :key="item.field">
        <el-col v-bind="merge(formSetting.colLayout, formConfig.colLayout, item.colLayout)" :span="formConfig.colLayout"
          v-if="item.ifShow ? item.ifShow(state) : true" v-show="item.show ? item.show(state) : true">
          <el-form-item :label="item.label" :prop="item.field">
            <formItem :item="item" v-model="state[item.field]"></formItem>
          </el-form-item>
        </el-col>
      </template>
      <el-col :span="4">
        <slot name="buttons">
          <div class="flex">
            <el-button type="primary" :icon="Search">搜索</el-button>
            <el-button>重置</el-button>
          </div>
        </slot>
      </el-col>
    </el-row>
  </el-form>

</template>
<script setup>
import { omit, merge } from 'lodash-es'
import { ref, onMounted } from 'vue'
import {
  Search,
} from '@element-plus/icons-vue'

import { formSetting } from '@/setting/baseComponents.js'
import 'element-plus/dist/index.css' // 需要重新导入样式

import { useStateReactive } from './hooks/index.js'
import formItem from './components/formItem.vue'
const formRef = ref(null)
const props = defineProps(['register'])
const [state, reset] = useStateReactive(() => {
  return {}
})
const schema = ref([])
const formConfig = ref({})
const initDetail = () => {
  schema.value.forEach((item) => {
    state[item.field] = item.defaultValue
  })
}
onMounted(() => {
  const schemaProps = props.register({
    el: formRef
  })
  schema.value = schemaProps.schema
  formConfig.value = schemaProps.formConfig
  console.log(omit(formConfig.value), 'schemaProps')
  initDetail()
})
</script>