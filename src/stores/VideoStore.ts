import { defineStore } from "pinia";

export const useVideoStore = defineStore({
  id: "video",

  state: () => ({
    isFixed: false,
  }),

  actions: {
    setIsFixed(value: boolean) {
      this.isFixed = value;
    },
  },
});
