import { defineStore } from "pinia";

export const useMainStore = defineStore({
  id: "main",

  state: () => ({
    isSideBar: false,
    dataLoaded: false,
  }),

  actions: {
    isShowSideBar(boolean) {
      this.isSideBar = boolean;
    },
    showSkeleton() {
      this.dataLoaded = false;
    },
    hideSkeleton() {
      this.dataLoaded = true;
    },
  },
});
