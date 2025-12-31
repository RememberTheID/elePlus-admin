<template>
  <Watermark>
    <baseTable :register="register">
      <template #action="{ row }">
        <baseAction :actions="getActions(row)" />
      </template>
    </baseTable>
    <listModel :register="registerModel"></listModel>
    <listModel2 :register="registerModel2"></listModel2>
  </Watermark>
</template>

<script setup lang="jsx" name="demo-table">
import { onMounted, ref } from 'vue'
import { ElTag } from 'element-plus'
import { baseTable, useTable, baseAction } from '@/components/table'
import Watermark from '@/components/watermark/index.vue'
import listModel from '@/views/base/components/lib/listModel.vue'
import listModel2 from './lib/listModel2.vue'
import { useModel } from '@/components/baseModel/index.js'
const getList = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [{ name: '张三', id: 123123, age: 18, chinese: 100 }]
      })
    }, 1000);
  })
}
const [register, { reload }] = useTable({
  formConfig: {
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
      componentProps: (el) => {
        return {
          placeholder: '请输入名称'
        }
      }
    }],
  },
  tableConfig: {
    api: getList,
    column: [{
      label: '名称',
      prop: 'name',
      align: 'center',
      slotRender: (scope) => {
        const { row } = scope
        return (
          <ElTag>{row.name}</ElTag>
        )
      }
    }, {
      label: '年龄',
      align: 'center',
      slot: 'age',
      prop: 'age',
    }, {
      label: '成绩',
      align: 'center',
      prop: 'score',
      children: [{
        label: '语文',
        align: 'center',
        prop: 'chinese',
      }, {
        label: '数学',
        align: 'center',
        prop: 'math'
      }, {
        label: '英语',
        align: 'center',
        prop: 'english'
      }]
    }],
  }
})
const [registerModel, { openModel }] = useModel()
const [registerModel2, { openModel: openModel2 }] = useModel()
const getActions = (row) => {
  return [
    {
      label: '编辑',
      type: 'primary',
      onClick: () => {
        openModel({
          data: row,
          title: '编辑'
        })
      }
    },
    {
      label: '编辑2',
      type: 'primary',
      onClick: () => {
        openModel2({
          data: row,
          title: '编辑2'
        })
      }
    },
    {
      label: '删除',
      type: 'danger',
      popConfirm: {
        title: '确定删除?',
        placement: 'top',
        onConfirm: () => {
          console.log(row)
        }
      }
    }
  ]
}
</script>