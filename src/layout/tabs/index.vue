<template>
  <div class="w-full flex">
    <ElTabs v-if="sysSetting.TABS_TYPE === 'card'" :closable="tabsStore.tabTarget.length > 1" :model-value="route.path"
      type="card" @tab-click="handleClick" @tab-remove="removeTab">
      <template>
        <template v-for="item in tabsStore.tabTarget" :key="item.path">
          <ElTabPane :label="item.title" class="select-none" v-if="item" :name="item.path">
            <template #label>
              <div class="select-none" @contextmenu="e => rightEvent(e, item)" :title="item.title">{{ item.title
                }}
              </div>
            </template>
          </ElTabPane>
        </template>
      </template>
    </ElTabs>
    <Tag v-if="sysSetting.TABS_TYPE === 'tag'" :model-value="route.path" @tab-click="handleClick"
      @tab-remove="removeTab" :options="tabsStore.tabTarget" @right-event="rightEvent"></Tag>
    <ElDropdown ref="dropdownRef" :virtual-ref="triggerRef" :show-arrow="false" virtual-triggering trigger="contextmenu"
      placement="bottom-start">
      <template #dropdown>
        <ElDropdownMenu>
          <ElDropdownItem :disabled="isCurrent">刷新</ElDropdownItem>
          <ElDropdownItem :disabled="tabsStore.tabTarget.length <= 1">关闭</ElDropdownItem>
          <ElDivider border-style="dashed" class="!my-0" />
          <ElDropdownItem>关闭所有</ElDropdownItem>
          <ElDropdownItem>关闭其他</ElDropdownItem>
        </ElDropdownMenu>
      </template>
    </ElDropdown>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/modules/tabs.js'
import { ElTabs, ElTabPane, ElDropdown, ElDropdownMenu, ElDropdownItem, ElDivider } from 'element-plus';
import { sysSetting } from '@/setting/sysSetting.js'
import Tag from './components/tag.vue'
const tabsStore = useTabsStore()
const route = useRoute()
const router = useRouter()
const dropdownRef = ref(null)
const position = ref({ left: 0, top: 10 })

const isCurrent = ref(true)

const triggerRef = ref({
  getBoundingClientRect: () => position.value,
})
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

const rightEvent = (e, item) => {
  e.preventDefault()
  const { clientX, clientY } = e
  position.value = DOMRect.fromRect({ x: clientX, y: clientY })
  dropdownRef.value?.handleOpen()
}
</script>
<style scoped>
:deep(.el-tabs) {
  margin-bottom: -1px;
}

:deep(.el-tabs__header) {
  margin-bottom: 0;
}

:deep(.el-tabs__item) {
  user-select: none;
}
</style>