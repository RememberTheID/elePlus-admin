import { defineStore } from 'pinia';
export const useTabsStore = defineStore('tabs', {
  state: () => ({
    Tabs: new Set(),
  }),
  actions: {
    addTabs (item) {
      this.Tabs.add(item)
    },
    removeTab (item) {
      this.Tabs.delete(item)
    }
  },
  getters: {
    tabTarget: (state) => Array.from(state.Tabs),
  },
});
