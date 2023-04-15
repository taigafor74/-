import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",

  state: () => ({
    isSideBar: false,
  }),

  actions: {
    isShowSideBar(boolean) {
      this.isSideBar = boolean;
    },
  },
});
