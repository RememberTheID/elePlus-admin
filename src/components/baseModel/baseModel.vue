<template>
  <ElDialog v-bind="$attrs">
    <slot></slot>
    <template #footer v-if="$slots.footer">
      <slot name="footer"></slot>
    </template>
  </ElDialog>
</template>

<script setup>
import { ElDialog } from 'element-plus';
</script>
