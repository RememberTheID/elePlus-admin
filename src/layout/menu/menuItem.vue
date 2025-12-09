<template>

  <template v-for="item in props.menu" :key="item.path" :index="item.path">
    <el-menu-item v-if="!item.children" :index="item.path">
      <Icon :icon="item.meta.icon" class="text-xl" :class="menuStore.isCollapse ? '' : 'pr-2'" />
      <template #title>
        <span>{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <Icon :icon="item.meta.icon" class="text-xl" :class="menuStore.isCollapse ? '' : 'pr-2'" />
        <span> {{ item.meta.title }}</span>
      </template>
      <menuItem :menu="item.children">
      </menuItem>
    </el-sub-menu>
  </template>

</template>
<script setup name="menuItem">
import { useMenuStore } from '@/stores/modules/menu.js'
const menuStore = useMenuStore()
const props = defineProps(['menu'])
import { Icon } from "@iconify/vue";

</script>