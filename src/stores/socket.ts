import { defineStore } from "pinia";
import { io, Socket } from "socket.io-client";
export const useSocketStore = defineStore({
  id: "socket",

  state: () => ({
    socket: null,
    data: null,
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
