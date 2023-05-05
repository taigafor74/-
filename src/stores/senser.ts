import { defineStore } from "pinia";
export const useSenserStore = defineStore({
  id: "senser",

  state: () => ({
    data: [],
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
