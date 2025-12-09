<template>
  <div class="flex h-full">
    <Menu />
    <div class="flex-1 flex flex-col box-border">
      <div class="top_header border-b-solid border-b-1 border-gray-200 pb-4 px-2">
        <div class="flex flex-col">
          <div class="mr-2 flex items-center justify-between">
            <div class="flex">
              <Icon icon="material-symbols:keyboard-double-arrow-left-rounded" v-if="!menuStore.isCollapse"
                class="text-2xl cursor-pointer" @click="switchCollapse()" />
              <Icon icon="material-symbols:keyboard-double-arrow-right-rounded" v-else class="text-2xl cursor-pointer"
                @click="switchCollapse()" />
              <div class="ml-2 text-gray-400">欢迎进入 {{ sysTitle }}</div>
            </div>
            <div class="top_right">
              <div>
                <el-switch v-model="dark" class="mt-2" style="margin-left: 24px" inline-prompt @change="changeTheme">
                  <template #active-action>
                    <Icon icon="majesticons:moon-line"></Icon>
                  </template>
                  <template #inactive-action>
                    <Icon icon="majesticons:sun-line"></Icon>
                  </template>
                </el-switch>
              </div>
            </div>
          </div>
          <el-breadcrumb separator="/">
            <template v-for="item in routePages" :key="item.path">
              <el-breadcrumb-item :to="{ path: item.path }">{{ item.meta.title }}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </div>
      </div>
      <div class="content flex-1">
        <RouterView />
      </div>
      <div class="bottom"></div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import { useMenuStore } from '@/stores/modules/menu.js'
const menuStore = useMenuStore()
const route = useRoute()
const routePages = computed(() => route.matched.slice(1))
import { Icon } from "@iconify/vue";
import Menu from './menu/index.vue'
const sysTitle = import.meta.env.VITE_GLOB_APP_TITLE
const switchCollapse = () => {
  menuStore.switchCollapse()
}
const dark = ref(false)

const changeTheme = () => {
  if (dark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>