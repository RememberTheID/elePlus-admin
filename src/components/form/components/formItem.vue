<template>
  <component :is="renderItem()" v-bind="{ ...attrs, ...item.componentProps }"></component>
</template>

<script setup lang="jsx">
import { useAttrs, onMounted } from 'vue'
import { findComponent } from './componentMap'
const props = defineProps(['item'])
const renderItem = () => {
  const { component } = props.item
  if (component) {
    return findComponent(component)
  }
  return ''
}
const attrs = useAttrs()
</script>