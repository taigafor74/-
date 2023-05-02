import { defineStore } from "pinia";
export const useManageStore = defineStore({
  id: "manage",

  state: () => ({
    index: "1",
  }),

  actions: {
    buildSocket(id) {
      this.socket = io("http://localhost:3000", {
        // autoConnect: false,
        query: { userId: id },
      });
    },
  },
});
