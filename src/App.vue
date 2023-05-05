<template>
  <div class="app-container"><HomeView></HomeView></div>
</template>

<script setup lang="ts">
import HomeView from "./views/HomeView.vue";
// App.vue
import { onMounted, watchEffect, ref, getCurrentInstance } from "vue";
import { useUserStore } from "@/stores/user";
import { checkToken } from "@/api/checkToken";
import { io, Socket } from "socket.io-client";
import { useSocketStore } from "@/stores/socket";
import { getAllSenser } from "@/api/senser";
import VueSocketIO from "vue-socket.io";
import { useSenserStore } from "@/stores/senser";
const senserStore = useSenserStore();
const useSocket = useSocketStore();
const userStore = useUserStore();
onMounted(async () => {
  // proxy.$addSockets(sockets, proxy);
  // 从 localStorage 获取用户信息
  const senser = await getAllSenser();
  senserStore.data = senser.data;

  const userInfo = JSON.parse(localStorage.getItem("user") || "null");
  if (userInfo) {
    userStore.setUser(
      userInfo.avatar,
      userInfo.id,
      userInfo.uname,
      true,
      userInfo.followArr
    );
    userStore.avatar = userInfo.avatar;
    useSocket.buildSocket(userInfo.id);
    if (useSocket.socket) {
      console.log("socket", useSocket.socket);
      useSocket.socket.on("notification", (data) => {
        useSocket.data = data;
      });
    }
    if (userInfo) {
      const tokenValid = await checkToken();
      if (tokenValid) {
        userStore.setUser(
          userInfo.avatar,
          userInfo.id,
          userInfo.uname,
          true,
          userInfo.followArr
        );
        // useSocket.buildSocket(userInfo.id);
        userStore.avatar = userInfo.avatar;
      } else {
        // 更新登录状态
        userStore.logout();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
