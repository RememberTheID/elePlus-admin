<template>
  <el-menu :default-active="route.path" router class="w-40" @select="onSelect" :collapse="menuStore.isCollapse">
    <menuItem :menu="base">
    </menuItem>
  </el-menu>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import menuItem from './menuItem.vue'
import { base } from '@/router/modules/base.js'
import { useMenuStore } from '@/stores/modules/menu.js'
import { useTabsStore } from '@/stores/modules/tabs.js'
const route = useRoute()
const router = useRouter()
const menuStore = useMenuStore()
const tabsStore = useTabsStore()
const routers = router.getRoutes().map(item => ({
  path: item.path,
  title: item?.meta?.title || ''
}))
const FindTabs = (path) => {
  return routers.find(item => item.path === path) || null
}
const onSelect = (index) => {
  const item = FindTabs(index)
  tabsStore.addTabs(item)
}
onSelect(route.path)
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>