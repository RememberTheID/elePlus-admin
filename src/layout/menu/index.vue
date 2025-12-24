<template>
  <el-menu :default-active="route.name" class="w-40" @select="onSelect" :collapse="menuStore.isCollapse">
    <menuItem :menu="base">
    </menuItem>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import menuItem from './menuItem.vue'
import { ElMessage } from 'element-plus'
import { base } from '@/router/modules/base.js'
import { useMenuStore } from '@/stores/modules/menu.js'
import { useTabsStore } from '@/stores/modules/tabs.js'
const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const tabsStore = useTabsStore()
const routers = router.getRoutes().map(item => ({
  path: item.path,
  title: item?.meta?.title || '',
  meta: item?.meta,
  name: item?.name
}))
const FindTabs = (name) => {
  return routers.find(item => item.name === name) || {}
}
const onSelect = (index) => {
  const item = FindTabs(index)
  try {
    router.push({ name: index })
    tabsStore.addTabs(item)
  } catch (error) {
    ElMessage.error({
      message: error
    })
  }
}
onSelect(route.name)
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>