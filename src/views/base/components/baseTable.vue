<template>
  <Watermark>
    <baseTable :register="register">
      <template #action="{ row }">
        <baseAction :actions="getActions(row)" />
      </template>
    </baseTable>
  </Watermark>
</template>

<script setup lang="jsx" name="demo-table">
import { ElTag } from 'element-plus'
import { baseTable, useTable, baseAction } from '@/components/table'
import Watermark from '@/components/watermark/index.vue'
// import { getList } from './api'
const getList = async (params) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [{ name: '张三', id: 123123, age: 18, chinese: 100 }]
      })
    }, 1000);
  })
}
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
const getActions = (row) => {
  return [
    {
      label: '编辑',
      type: 'primary',
      onClick: () => {
        console.log(row)
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