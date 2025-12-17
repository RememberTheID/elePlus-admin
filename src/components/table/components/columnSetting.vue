<template>
  <div>
    <ElPopover placement="right" v-model:visible="visible" :width="300" trigger="click">
      <template #reference>
        <span>
          <Icon icon="line-md:cog-loop" class="text-xl"></Icon>
        </span>
      </template>
      <div>
        <ElTree :data="columns" draggable node-key="prop" :props="{ label: 'label', children: 'children' }" />
        <div class="btns flex justify-end">
          <ElButton size="small" @click="resetColumn">重置</ElButton>
          <ElButton size="small" type="primary" @click="emitSuccess">确定</ElButton>
        </div>
      </div>
    </ElPopover>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { cloneDeep } from 'lodash-es';
import { Icon } from '@iconify/vue';
import { ElTree, ElPopover, ElButton } from 'element-plus';
const emit = defineEmits(['success'])
let columnBak = []
const columns = ref([])
const visible = ref(false)
const emitSuccess = () => {
  emit('success', cloneDeep(columns.value))
  visible.value = false
}
const SetColumn = (arr) => {
  columns.value = cloneDeep(arr)
  columnBak = cloneDeep(arr)
}
const resetColumn = () => {
  columns.value = cloneDeep(columnBak)
}
defineExpose({ SetColumn })
</script>