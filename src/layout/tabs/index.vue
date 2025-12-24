<template>
  <div class="w-full">
    <ElTabs v-if="sysSetting.TABS_TYPE === 'card'" :closable="tabsStore.tabTarget.length > 1" :model-value="route.path"
      type="card" @tab-click="handleClick" @tab-remove="removeTab">
      <template>
        <template v-for="item in tabsStore.tabTarget" :key="item.path">
          <ElTabPane :label="item.title" v-if="item" :name="item.path">
          </ElTabPane>
        </template>
      </template>
    </ElTabs>
    <Tag v-if="sysSetting.TABS_TYPE === 'tag'" :model-value="route.path" @tab-click="handleClick"
      @tab-remove="removeTab" :options="tabsStore.tabTarget"></Tag>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs.js'
import { ElTabs, ElTabPane } from 'element-plus';
import { sysSetting } from '@/setting/sysSetting.js'
import Tag from './tag.vue'
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