<template>
  <BaseModel v-bind="bindAttrs" @confirm="onConfirm">
    <div class="p-4">
      <baseForm :register="register"></baseForm>
    </div>
  </BaseModel>
</template>
<script setup>
import { baseForm, useForm } from '@/components/form'
const [register, { setFieldsValue }] = useForm({
  schema: [{
    label: '类型',
    field: 'type',
    component: 'Select',
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
    ifShow: (form) => form.type === 1,
    componentProps: {
      placeholder: '请输入名称'
    },
    colLayout: {
      span: 24
    }
  }, {
    label: '语文成绩',
    field: 'chinese',
    component: 'InputNumber',
    colLayout: {
      span: 24
    }
  }],
  config: {
    showBtns: false,
    labelWidth: 100
  }
})
import { BaseModel, useModalInner } from '@/components/baseModel/index.js'
const [bindAttrs, { setModalProps, closeModal }] = useModalInner(async (detail) => {
  const { data } = detail
  setFieldsValue(data)
  // setModalProps({ loading: true })
});
const onConfirm = async () => {

}

</script>