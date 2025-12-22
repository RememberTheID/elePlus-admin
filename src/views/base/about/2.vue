<template>
  <!-- <Watermark> -->
  <baseTable :register="register">
  </baseTable>
  <!-- </Watermark> -->
</template>

<script setup lang="jsx" name="demo-table">
import { ElTag } from 'element-plus'
import { baseTable, useTable } from '@/components/table'
import Watermark from '@/components/watermark/index.vue'
import { getList } from './api'
const [register] = useTable({
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
</script>