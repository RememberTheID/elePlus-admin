<template>
  <template v-for="item in props.menu" :key="item.path">
    <el-menu-item v-if="!item.children && !item.meta.hidMenu" :index="item.name">
      <div class="w-6 flex items-center">
        <Icon :icon="item.meta.icon" class="text-xl" />
      </div>
      <template #title>
        <span class="flex-1 truncate" :title="item.meta.title">{{ item.meta.title }}</span>
      </template>
    </el-menu-item>
    <el-sub-menu v-else-if="item.children && item.children.length" :index="item.name">
      <template #title>
        <div class="w-6 flex items-center">
          <Icon :icon="item.meta.icon" class="text-xl" />
        </div>
        <span class="flex-1 truncate" :title="item.meta.title"> {{ item.meta.title }}</span>
      </template>
      <!-- 递归：将当前拼接好的路径传给下一层 -->
      <menuItem :menu="item.children">
      </menuItem>
    </el-sub-menu>
  </template>
</template>

<script setup name="menuItem">
import { Icon } from "@iconify/vue";
// 接收父级传来的路径 basePath
const props = defineProps({
  menu: Array,
  basePath: {
    type: String,
    default: ''
  }
})
// 路径拼接工具函数
const resolvePath = (routePath) => {
  // 如果是外部链接直接返回 (可选)
  if (routePath.startsWith('http')) return routePath;

  // 将父级路径和当前路径拼接，并处理好斜杠
  const base = props.basePath.endsWith('/') ? props.basePath : props.basePath + '/';
  let path = routePath.startsWith('/') ? routePath.substring(1) : routePath;

  // 拼接并确保开头有 /
  let fullPath = base + path;
  return fullPath.startsWith('/') ? fullPath : '/' + fullPath;
}
</script>
