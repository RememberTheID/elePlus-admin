<template>
  <div>
    <ElPopover :teleported="false" placement="bottom-end" v-model:visible="visible" :width="300" trigger="click">
      <template #reference>
        <div>
          <ElTooltip :teleported="false" placement="top" trigger="hover">
            <span>
              <Icon icon="line-md:cog-loop" class="text-xl cursor-pointer text-[#606266]"></Icon>
            </span>
            <template #content>
              <span>列设置</span>
            </template>
          </ElTooltip>
        </div>
      </template>
      <div>
        <ElTree :data="columns" default-expand-all :render-content="renderContent" draggable ref="elTreeRef"
          node-key="prop" :expand-on-click-node="false" :props="{ label: 'label', children: 'children' }"
          @node-drop="emitSuccess" />
        <div class="btns flex justify-end mt-2">
          <ElButton size="small" @click="resetColumn">重置</ElButton>
          <ElButton size="small" type="primary" @click="saveColumn">保存</ElButton>
        </div>
      </div>
    </ElPopover>
  </div>
</template>
<script setup lang="jsx">
import { ref, onMounted } from 'vue'
import { cloneDeep } from 'lodash-es';
import { Icon } from '@iconify/vue';
import { ElTree, ElPopover, ElButton, ElCheckbox, ElTooltip } from 'element-plus';
import columnLR from './columnLR.vue'
import { useStoragePublic } from '@/utils/storage.js'
import { useRoute } from 'vue-router'
const route = useRoute()
const { setItem, getItem } = useStoragePublic()
const STORAGE_KEY = `column-${route.fullPath}`

const elTreeRef = ref(null)
const emit = defineEmits(['success'])
let columnBak = []
const columns = ref([])
const visible = ref(false)

const setCheckArr = (arr) => {
  return arr.filter(item => {
    if (item.children && item.children.length > 0) {
      item.children = setCheckArr(item.children)
    }
    return item.checked
  })
}

const emitSuccess = () => {
  const arr = setCheckArr(cloneDeep(columns.value))
  emit('success', arr)
}
const saveColumn = () => {
  setItem(STORAGE_KEY, cloneDeep(columns.value))
  visible.value = false
}
const FormatFun = (arr) => {
  return arr.map(item => {
    if (item.children && item.children.length > 0) {
      item.children = FormatFun(item.children)
    }
    return {
      ...item,
      checked: true,
      fixed: item.fixed || false
    }
  })
}

const renderContent = (h, { node, data }) => {
  return (
    <div class="w-full flex justify-between items-center gap-2 my-2 pr-2">
      <div className="flex items-center gap-2">
        <ElCheckbox v-model={data.checked} onChange={emitSuccess}></ElCheckbox>
        <span>{data.label}</span>
      </div>
      <columnLR v-model={data.fixed} onChange={emitSuccess}></columnLR>
    </div>
  )
}
let backBase = []
const SetColumn = (arr) => {
  backBase = arr
  const formatarr = getItem(STORAGE_KEY) || FormatFun(backBase)
  columns.value = cloneDeep(formatarr)
  columnBak = cloneDeep(formatarr)
  emitSuccess()
}
const resetColumn = () => {
  columns.value = cloneDeep(FormatFun(backBase))
  emitSuccess()
}
defineExpose({ SetColumn })
</script>