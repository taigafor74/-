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
import VueSocketIO from "vue-socket.io";
const useSocket = useSocketStore();
// if (useSocket.socket) {
//   console.log("Setting notification listener");
//   useSocket.socket.on("notification", (data) => {
//     console.log("收到通知：", data);
//     // 在这里处理通知，例如更新 UI 或显示通知消息
//   });
// }
/* SocketIOClient.Socket, */
// const socket = new VueSocketIO({
//   debug: false, // debug调试，生产建议关闭
//   connection: "http://localhost:3000",
// });

// const { proxy } = getCurrentInstance();
// proxy.$socket.io.emit("send", "client send some data to node Serve.");
// // 定义监听node事件
// const sockets = {
//   welcome(data) {
//     console.log(data);
//   },
// };

const userStore = useUserStore();
onMounted(async () => {
  // proxy.$addSockets(sockets, proxy);
  // 从 localStorage 获取用户信息
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
