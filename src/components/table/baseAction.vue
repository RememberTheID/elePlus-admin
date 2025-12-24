<template>
  <render />
</template>
<script setup lang="jsx">
import { isFunction } from 'lodash-es';
import { ElDivider, ElLink, ElPopconfirm } from 'element-plus';
const props = defineProps({
  actions: {
    type: Array,
    default: () => []
  }
})
const izShow = (item) => {
  if (isFunction(item)) {
    return item()
  } else {
    return [true, void (0)].includes(item)
  }
}
const actionsArr = props.actions.filter((item) => izShow(item.ifShow))

const popConfirmRender = (item) => {
  return (
    <span>
      {
        item.disabled ? <ElLink type="primary" {...item}>
          {item.label}
        </ElLink> : <ElPopconfirm  {...item.popConfirm}>
          {{
            reference: () => (
              <ElLink type="primary" {...item}>
                {item.label}
              </ElLink>
            )
          }}
        </ElPopconfirm>
      }
    </span>
  )
}
const linkRender = (item) => {
  return (
    <ElLink type="primary" {...item} >
      {item.label}
    </ElLink>
  )
}

const render = () => (
  <div>
    {
      actionsArr.map((item, index) => (
        <span>
          {
            item.popConfirm
              ? popConfirmRender(item)
              : linkRender(item)
          }
          {index !== actionsArr.length - 1 && <ElDivider direction="vertical" />}
        </span>
      ))
    }
  </div>
);
</script>