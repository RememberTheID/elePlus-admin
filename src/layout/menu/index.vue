<template>
  <el-menu :default-active="route.path" router class="w-40" :collapse="menuStore.isCollapse">
    <menuItem :menu="base">
    </menuItem>
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'
import menuItem from './menuItem.vue'
import { base } from '@/router/modules/base.js'
import { useMenuStore } from '@/stores/modules/menu.js'
const route = useRoute()
const menuStore = useMenuStore()
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>