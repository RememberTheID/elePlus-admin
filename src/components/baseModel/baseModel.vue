<template>
  <ElDialog v-bind="$attrs" draggable>
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <div class="footer-btns">
          <ElButton :loading="$attrs.loading" @click="onCancel()">取消</ElButton>
          <ElButton type="primary" :loading="$attrs.loading" @click="onConfirm()">确定</ElButton>
        </div>
      </slot>
    </template>
  </ElDialog>
</template>

<script setup>
import { useAttrs } from 'vue'
import { ElDialog, ElButton } from 'element-plus';
const attrs = useAttrs();
const onCancel = async () => {
  const { close, onCancel } = attrs;
  onCancel && await onCancel();
  close && close();
}
const onConfirm = async () => {
  const { onConfirm, confirm } = attrs;
  confirm && confirm(async () => {
    onConfirm && await onConfirm();
  });
}
</script>
