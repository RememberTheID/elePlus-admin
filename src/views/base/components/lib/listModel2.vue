<template>
  <BaseModel v-bind="bindAttrs">
    {{ bindAttrs }}
  </BaseModel>
</template>
<script setup>
import { BaseModel, useModalInner } from '@/components/baseModel/index.js'
const [bindAttrs, { setModalProps, closeModal }] = useModalInner(async (data) => {
  console.log(data, 'useModalInner2')
});

</script>