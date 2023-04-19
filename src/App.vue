<template>
  <div class="app-container"><HomeView></HomeView></div>
</template>

<script setup lang="ts">
import HomeView from "./views/HomeView.vue";
// App.vue
import { onMounted, watchEffect } from "vue";
import { useUserStore } from "@/stores/user";
import { checkToken } from "@/api/checkToken";
const userStore = useUserStore();

onMounted(async () => {
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
