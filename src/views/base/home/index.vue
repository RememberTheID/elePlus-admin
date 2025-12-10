<template>
  <div class="p-4">
    <baseForm :register="register"></baseForm>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { ElSelect } from 'element-plus'
import { baseForm, useForm } from '@/components/form'
const [register] = useForm({
  schema: [{
    label: '类型',
    field: 'type',
    component: ElSelect,
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
  }, {
    label: '年龄',
    field: 'age',
    component: 'InputNumber',
    defaultValue: 18,
    show: (form) => form.type === 2,
    componentProps: {
      placeholder: '请输入年龄'
    }
  }],
  formConfig: {
    labelWidth: 100,
  }
})

</script>