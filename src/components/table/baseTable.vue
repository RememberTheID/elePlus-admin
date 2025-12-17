<template>
  <div class="w-full">
    <baseForm :register="register" ref="formRef" @onSubmit="getData()" />
  </div>
  <div class="flex flex-col gap-2 w-full min-w-0">
    <div class="flex justify-between">
      <slot name="table-title">
        <div>{{ tbConfig.title || '' }}</div>
      </slot>
      <div>
        <columnSetting ref="columnRef" @success="SetColumn" />
      </div>
    </div>
    <ElTable :data="tableData" table-layout="fixed" ref="tableRef">
      <tableItem :columns="TableColumn">
        <template v-for="slotName in Object.keys(slots)" :key="slotName" #[slotName]="scope">
          <slot :name="slotName" v-bind="scope"></slot>
        </template>
      </tableItem>
    </ElTable>
    <div class="flex justify-end" v-if="tbConfig.Pagination !== false">
      <ElPagination v-model:current-page="paramsPlus.page" v-model:page-size="paramsPlus.pageSize"
        v-bind="mergeWith(tabSetting.Pagination, tbConfig.Pagination, customizer)" @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :total="tableData.length">
      </ElPagination>
    </div>
  </div>
</template>
<script setup>
import { onMounted, onUnmounted, nextTick, ref, unref, useSlots } from 'vue'
import { omit, mergeWith } from 'lodash-es'
import { ElTable, ElPagination } from 'element-plus'
import { tabSetting } from '@/setting/baseComponents.js'
import tableItem from './components/tableItem.vue'
import { baseForm, useForm } from '@/components/form'
import columnSetting from './components/columnSetting.vue'
const formRef = ref(null)
const tableRef = ref(null)
const columnRef = ref(null)
const [register, { validate, setProps }] = useForm({
  schema: []
})
const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return srcValue; // 如果是数组，直接使用新数组，不进行逐项合并
  }
}

const tableData = ref([{
  name: 'Tom',
  age: 18
}])
const slots = useSlots()
const columns = ref([])
const TableColumn = ref([])
const tbConfig = ref({})
const props = defineProps(['register'])
const paramsPlus = ref({
  page: 1,
  pageSize: 10
})
const SetColumn = (arr) => {
  TableColumn.value = arr
}
const getParams = async () => {
  const params = await validate()
  return {
    ...params,
    ...paramsPlus.value
  }
}
const getData = async () => {
  try {
    const params = await getParams()
    const { api } = unref(tbConfig)
    const { data } = await api(params)
    tableData.value = data
  } catch (error) {
  }
}

const handleSizeChange = (val) => {
  paramsPlus.value.pageSize = val
  getData()
}
const handleCurrentChange = (val) => {
  paramsPlus.value.page = val
  getData()
}

onMounted(async () => {
  const { config, tableConfig } = props.register({
    el: {
      formRef,
      tableRef
    },
    events: {

    }
  })
  setProps(config)
  columns.value = tableConfig.column
  TableColumn.value = tableConfig.column
  tbConfig.value = omit(tableConfig, ['column'])
  columnRef.value.SetColumn(tableConfig.column)
  getData()
})
</script>