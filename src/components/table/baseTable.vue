<template>
  <div class="h-full w-full bg-[--el-bg-color] p-4 box-border" ref="baseTableRef">
    <div class="w-full">
      <baseForm :register="register" ref="formRef" @onSubmit="getData()" />
    </div>
    <div class="flex flex-col gap-2 w-full min-w-0">
      <div class="flex justify-between">
        <slot name="table-title">
          <div>{{ tbConfig.title || '' }}</div>
        </slot>
        <div class="flex gap-2">
          <ElTooltip :show-after="300" placement="top" trigger="hover" :teleported="false">
            <span class="text-xl cursor-pointer text-[#606266]" @click="getData()">
              <Icon icon="mdi:reload" />
            </span>
            <template #content>
              <span>刷新</span>
            </template>
          </ElTooltip>
          <ElDropdown :teleported="false" :trigger="'click'">
            <div>
              <ElTooltip :show-after="300" placement="top" trigger="hover" :teleported="false">
                <span class="text-xl cursor-pointer">
                  <Icon icon="fluent:auto-fit-height-28-filled" />
                </span>
                <template #content>
                  <span class="whitespace-nowrap">行高</span>
                </template>
              </ElTooltip>
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem v-for="item in rowHeight"
                  :class="tableSize == item ? '!text-[#3894ff] bg-[#e9f3ff]' : ''" :key="item"
                  @click="setRowHeight(item)">{{ item }}
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
          <columnSetting ref="columnRef" @success="SetColumn" />
          <ElTooltip :show-after="300" ref="TooltipRef" placement="top" trigger="hover" :teleported="false">
            <span class="text-xl text-[#606266] cursor-pointer">
              <Icon icon="ic:round-open-in-full" v-if="!isFullscreen" @click="enterFullscreen" />
              <Icon icon="ic:round-close-fullscreen" v-else @click="closeFullscreen" />
            </span>
            <template #content>
              <span>{{ isFullscreen ? '退出全屏' : '全屏' }}</span>
            </template>
          </ElTooltip>
        </div>
      </div>
      <ElTable :teleported="false" :data="tableData" table-layout="fixed" ref="tableRef" :size="tableSize">
        <tableItem :columns="TableColumn">
          <template v-for="slotName in Object.keys(slots)" :key="slotName" #[slotName]="scope">
            <slot :name="slotName" v-bind="scope"></slot>
          </template>
        </tableItem>
      </ElTable>
      <div class="flex justify-end" v-if="tbConfig.Pagination !== false">
        <ElPagination :teleported="false" v-model:current-page="paramsPlus.page" v-model:page-size="paramsPlus.pageSize"
          v-bind="mergeWith(tabSetting.Pagination, tbConfig.Pagination, customizer)" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" :total="tableData.length">
        </ElPagination>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref, unref, useSlots } from 'vue'
import { omit, mergeWith } from 'lodash-es'
import { ElTable, ElPagination, ElTooltip, ElDropdown, ElDropdownMenu, ElDropdownItem } from 'element-plus'
import { tabSetting } from '@/setting/baseComponents.js'
import tableItem from './components/tableItem.vue'
import { baseForm, useForm } from '@/components/form'
import columnSetting from './components/columnSetting.vue'

import { Icon } from '@iconify/vue';
import { useFullscreen } from '@vueuse/core'
const formRef = ref(null)
const tableRef = ref(null)
const columnRef = ref(null)
const baseTableRef = ref(null)
const TooltipRef = ref(null)
const [register, { validate, setProps }] = useForm({
  schema: []
})
const customizer = (objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return srcValue; // 如果是数组，直接使用新数组，不进行逐项合并
  }
}

const rowHeight = ['large', 'default', 'small']
const tableSize = ref('default')
const tableData = ref([])
const slots = useSlots()
const columns = ref([])
const TableColumn = ref([])
const tbConfig = ref({})
const props = defineProps(['register'])
const paramsPlus = ref({
  page: 1,
  pageSize: 10
})

const { isFullscreen, enter, exit, toggle } = useFullscreen(baseTableRef)
const closeFullscreen = () => {
  exit()
  TooltipRef.value.hide()
}
const enterFullscreen = () => {
  enter()
  TooltipRef.value.hide()
}
const setRowHeight = (height) => {
  tableSize.value = height
}
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
  tbConfig.value = omit(tableConfig, ['column'])
  columnRef.value.SetColumn(tableConfig.column)
  getData()
})
</script>
<style scoped>
:deep(.el-tooltip__trigger:focus-visible) {
  outline: none !important;
}

:deep(.el-tabs__item:focus.is-active.is-focus) {
  box-shadow: none !important;
}
</style>