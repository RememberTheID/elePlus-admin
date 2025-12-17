<template>
  <div>
    <Icon icon="line-md:cog-loop"></Icon>
  </div>
</template>
<script setup>
import { Icon } from '@iconify/vue';
import { ElTree, ElPopover } from 'element-plus';
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})
console.log(props, 'props')
</script>