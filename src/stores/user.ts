import { defineStore } from "pinia";

export const useUserStore = defineStore({
  id: "user",

  state: () => ({
    avatar: "",
    id: 0,
    uname: "",
  }),

  actions: {
    setUser(avatar, id, uname) {
      this.avatar = avatar;
      this.id = id;
      this.uname = uname;
    },
  },
});
