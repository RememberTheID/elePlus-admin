<template>
  <BaseModel v-bind="bindAttrs">
    <div class="p-4">
      <baseForm :register="register"></baseForm>
    </div>
  </BaseModel>
</template>
<script setup>
import { baseForm, useForm } from '@/components/form'
const [register] = useForm({
  schema: [{
    label: '类型',
    field: 'type',
    component: 'Select',
    defaultValue: 1,
    componentProps: {
      placeholder: '请选择类型',
      options: [
        {
          label: '姓名',
          value: 1
        },
        {
          label: '年龄',
          value: 2
        }
      ]
    },
    colLayout: {
      span: 24
    }
  },
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    defaultValue: '张三',
    componentProps: {
      placeholder: '请输入名称'
    },
    colLayout: {
      span: 24
    }
  }],
  config: {
    showBtns: false
  }
})
import { BaseModel, useModalInner } from '@/components/baseModel/index.js'
const [bindAttrs, { setModalProps, closeModal }] = useModalInner(async (data) => {
  console.log(data, 'useModalInner')
});

</script>