<template>
  <div>
    <baseForm :register="register" />
  </div>
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
    }
  },
  {
    label: '名称',
    field: 'name',
    component: 'Input',
    defaultValue: '张三',
    ifShow: (form) => form.type === 1,
    componentProps: {
      placeholder: '请输入名称'
    }
  }],
  formConfig: {

  }
})
</script>