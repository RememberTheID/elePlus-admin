import { defineStore } from 'pinia';
export const useMenuStore = defineStore('menu', {
  state: () => ({
    isCollapse: false,
  }),
  actions: {
    switchCollapse () {
      this.isCollapse = !this.isCollapse
    },
  },
  getters: {
    collapse: (state) => state.isCollapse,
  },
});
