<template>
  <div>
    <ElTabs :closable="tabsStore.tabTarget.length > 1" :model-value="route.path" type="card" @tab-click="handleClick"
      @tab-remove="removeTab">
      <ElTabPane class="mx-2" :label="item.title" :name="item.path" v-for="item in tabsStore.tabTarget"
        :key="item.path"></ElTabPane>
    </ElTabs>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs.js'
import { ElTabs, ElTabPane } from 'element-plus';
const tabsStore = useTabsStore()
const route = useRoute()
const router = useRouter()
const handleClick = ({ props }) => {
  if (route.path === props.name) return
  router.push(props.name)
}
const removeTab = async (path) => {
  const item = tabsStore.tabTarget.find(item => item.path === path)
  await tabsStore.removeTab(item)
  const isCurrRouter = route.path === path
  isCurrRouter && router.back()
}
</script>
<style scoped>
:deep(.el-tabs) {
  margin-bottom: -1px;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}
</style>