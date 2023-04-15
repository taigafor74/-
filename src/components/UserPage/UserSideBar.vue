<template>
  <div class="user-side-bar-container">
    <UserVideoManage />
    <UserAnnounce />
    <UserInfo />
  </div>
</template>

<script setup lang="ts">
import UserVideoManage from "@/components/UserPage/UserVideoManage.vue";
import UserAnnounce from "./UserAnnounce.vue";
import UserInfo from "./UserInfo.vue";
</script>

<style lang="scss" scoped>
.user-side-bar-container {
  width: 20.503808vw;
  height: 100vh;
  background-color: rgb(18, 18, 18);
}
</style>
