<template>
  <div class="w-full flex gap-2 mb-3">
    <div class="left select-none" v-show="showMove">
      <Icon icon="line-md:chevron-small-left" class="text-2xl cursor-pointer" @click="leftMove" />
    </div>
    <div class="content flex-1 overflow-auto hidden-scroll whitespace-nowrap" ref="scrollRef">
      <template v-for="(item, index) in props.options">
        <span class="mx-1 cursor-pointer" @click="(e) => clickItem(item, e, index)">
          <ElTag :type="modelValue === item.path ? 'primary' : 'info'" :closable="props.options.length > 1"
            class="flex items-center" @close="close(item)">
            {{ item.title }}
          </ElTag>
        </span>
      </template>
    </div>
    <div class="right select-none" v-show="showMove">
      <Icon icon="line-md:chevron-small-right" class="text-2xl cursor-pointer" @click="rightMove" />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useScroll } from '@vueuse/core';
import { ElTag } from "element-plus";
import { Icon } from "@iconify/vue";
import { floor } from 'lodash-es';
const scrollRef = ref(null)
const showMove = ref(false)
const { x } = useScroll(scrollRef, { behavior: 'smooth' })
const emit = defineEmits(['tab-click', 'tab-remove'])
const clickItem = (item, e, index) => {
  value.value = item;
  const target = e.currentTarget;
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',   // 平滑滚动
      block: 'nearest',     // 垂直方向不移动
      inline: 'center'     // 水平方向移动到最近的可见边缘（如果已经可见则不动）
    });
  }
  emit('tab-click', {
    props: {
      name: item.path
    }
  }, index)
};
const close = (item) => {
  emit('tab-remove', item.path)
}
let moveRange = scrollRef?.value?.offsetWidth || 200
onMounted(() => {
  moveRange = floor(scrollRef?.value?.offsetWidth, -2)
  showMove.value = scrollRef?.value?.scrollWidth > scrollRef?.value?.offsetWidth
})
const leftMove = () => {
  const left = x.value - moveRange
  x.value = left
}
const rightMove = () => {
  const left = x.value + moveRange
  x.value = left
}
const value = ref(1)
const props = defineProps({
  options: {
    type: Array,
    default: () => []
  }
})
const modelValue = defineModel()
</script>
<style scoped>
.hidden-scroll {
  &::-webkit-scrollbar {
    display: none;
  }

  scrollbar-width: none;
  -ms-overflow-style: none;
  overflow: auto;
}

:deep(.el-tag .el-tag__close) {
  width: 0;
  transition: width 0.3s ease-in-out;
}

:deep(.el-tag:hover .el-tag__close) {
  width: 14px;
}
</style>