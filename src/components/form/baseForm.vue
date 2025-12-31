<template>
  <el-form :model="state" ref="formRef" v-bind="omit(formConfig, ['colLayout'])">
    <el-row :gutter="10">
      <template v-for="item in schema" :key="item.field">
        <el-col :span="formConfig.colLayout" v-bind="item.colLayout || formConfig.colLayout || formSetting.colLayout"
          v-if="item.ifShow ? item.ifShow(state) : true" v-show="item.show ? item.show(state) : true">
          <el-form-item :label="item.label" :prop="item.field">
            <formItem :item="item" v-model="state[item.field]"></formItem>
          </el-form-item>
        </el-col>
      </template>
      <el-col :span="4" v-if="merge(formSetting, formConfig).showBtns">
        <slot name="buttons">
          <div class="flex">
            <el-button type="primary" :icon="Search" @click="searchData()" :loading="formConfig.loading">搜索</el-button>
            <el-button @click="resetForm()" v-if="merge(formSetting, formConfig).showReset">重置</el-button>
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
const emit = defineEmits(['onSubmit', 'reset'])
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

const resetForm = () => {
  formRef.value.resetFields()
  emit('reset')
}
const validForm = async () => {
  try {
    await formRef.value.validate()
    return state
  } catch (error) {
    return Promise.reject(error)
  }
}
const searchData = async () => {
  try {
    const value = await validForm()
    emit('onSubmit', value)
  } catch (error) {
  }
}

const setSchemaConfig = async (obj) => {
  schema.value = obj.schema || []
  formConfig.value = omit(obj, ['schema'])
  initDetail()
}
onMounted(() => {
  const schemaProps = props.register({
    el: formRef,
    events: {
      validForm,
      setSchemaConfig
    }
  })
  schema.value = schemaProps.schema
  formConfig.value = schemaProps.formConfig
  initDetail()
})
defineExpose({
  validForm,
  setSchemaConfig
})
</script>