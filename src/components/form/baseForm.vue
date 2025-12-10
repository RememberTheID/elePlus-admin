<template>
  <el-form :model="state" ref="formRef">
    <template v-for="item in schema" :key="item.field">
      <el-form-item :label="item.label" :prop="item.field" v-if="item.ifShow ? item.ifShow(state) : true"
        v-show="item.show ? item.show(state) : true">
        <formItem :item="item" v-model="state[item.field]"></formItem>
      </el-form-item>
    </template>
  </el-form>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useStateReactive } from './hooks/index.js'
import formItem from './components/formItem.vue'
const formRef = ref(null)
const props = defineProps(['register'])
const [state, reset] = useStateReactive(() => {
  return {}
})
const schema = ref([])
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
  initDetail()
})
</script>