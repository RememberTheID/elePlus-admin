<template>
  <div>
    <ElPopover :teleported="false" placement="bottom-end" v-model:visible="visible" :width="300" trigger="click">
      <template #reference>
        <div>
          <ElTooltip :show-after="300" :teleported="false" placement="top" trigger="hover">
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
        <ElTree ref="elTreeRef" :data="columns" default-expand-all :render-content="renderContent" draggable
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
import { ref, watchEffect } from 'vue'
import { cloneDeep, flatMap, omit } from 'lodash-es';
import { Icon } from '@iconify/vue';
import { ElTree, ElPopover, ElButton, ElCheckbox, ElTooltip } from 'element-plus';
import columnLR from './columnLR.vue'
import { useStoragePublic } from '@/utils/storage.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const { setItem, getItem } = useStoragePublic()
const props = defineProps({
  catchKey: {
    type: String,
    default: ''
  }
})

// 响应式存储 Key
let STORAGE_KEY = `column-${route.fullPath}-${props.catchKey || 'default'}`
watchEffect(() => {
  STORAGE_KEY = `column-${route.fullPath}-${props.catchKey || 'default'}`
})

const elTreeRef = ref(null)
const emit = defineEmits(['success'])
const columns = ref([])
const visible = ref(false)

// 基础数据备份
let backBase = []

/**
 * 递归过滤未选中的列
 */
const setCheckArr = (arr) => {
  return arr.filter(item => {
    if (item.children?.length) {
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

/**
 * 初始化格式化：添加 checked 和 fixed 默认属性
 */
const FormatFun = (arr) => {
  return arr.map(item => {
    const newItem = {
      ...item,
      checked: item.checked ?? true,
      fixed: item.fixed ?? false
    }
    if (newItem.children?.length) {
      newItem.children = FormatFun(newItem.children)
    }
    return newItem
  })
}

/**
 * 深度平铺树形结构为一维数组
 */
function flattenDeep (data) {
  return flatMap(data, item => {
    const children = item.children?.length ? flattenDeep(item.children) : []
    return [omit(item, 'children'), ...children]
  })
}

/**
 * 递归合并配置：将缓存状态合并到最新的列配置中
 */
const margedFun = (formatarr, baseMap) => {
  return formatarr.map(item => {
    const findItem = baseMap.get(item.prop)
    if (findItem) {
      // 合并属性，保持最新配置的 label 等信息，保留缓存的 checked/fixed
      item = { ...findItem, ...item }
    }
    if (item.children?.length) {
      item.children = margedFun(item.children, baseMap)
    }
    return item
  })
}

/**
 * 外部调用：设置列数据
 */
const SetColumn = (arr) => {
  backBase = arr
  const formatarr = getItem(STORAGE_KEY) || FormatFun(backBase)

  const flatBaseArray = flattenDeep(backBase)
  const baseMap = new Map(flatBaseArray.map(i => [i.prop, i]))

  const marged = margedFun(formatarr, baseMap)

  columns.value = cloneDeep(marged)
  emitSuccess()
}

/**
 * 重置配置
 */
const resetColumn = () => {
  columns.value = cloneDeep(FormatFun(backBase))
  emitSuccess()
}

/**
 * Tree 渲染函数
 */
const renderContent = (h, { node, data }) => {
  return (
    <div class="w-full flex justify-between items-center gap-2 my-2 pr-2">
      <div className="flex items-center gap-2">
        <ElCheckbox v-model={data.checked} onChange={emitSuccess}></ElCheckbox>
        <span>{data.label}</span>
      </div>
      <columnLR
        v-model={data.fixed}
        disabled={node.level !== 1}
        onChange={emitSuccess}
      ></columnLR>
    </div>
  )
}

defineExpose({ SetColumn })
</script>

<style scoped>
.btns :deep(.el-button) {
  margin-left: 8px;
}
</style>
