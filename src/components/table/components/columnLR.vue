<template>
  <div class="flex items-center" v-if="!disabled">
    <Icon icon="line-md:arrow-close-left" :class="modelValue === 'left' ? 'text-blue-500' : ''"
      @click="handlerCheck('left')"></Icon>
    <ElDivider direction="vertical"></ElDivider>
    <Icon icon="line-md:arrow-close-right" :class="modelValue === 'right' ? 'text-blue-500' : ''"
      @click="handlerCheck('right')"></Icon>
  </div>
</template>
<script setup>
import { ElDivider } from 'element-plus';
import { Icon } from '@iconify/vue';
const modelValue = defineModel()
const emit = defineEmits(['update:modelValue', 'change'])
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
})
const handlerCheck = (val) => {
  const value = modelValue.value === val ? false : val
  emit('update:modelValue', value)
  emit('change', value)
}
</script>