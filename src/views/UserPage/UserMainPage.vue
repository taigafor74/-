<template>
  <div class="user-main-page-container">
    <div class="test-main"><UserMainLeft /></div>
    <UserSideBar />
  </div>
</template>

<script setup lang="ts">
import UserSideBar from "@/components/UserPage/UserSideBar.vue";
import UserMainLeft from "@/components/UserPage/UserMainLeft.vue";
</script>

<style lang="scss" scoped>
.user-main-page-container {
  width: 100%;
  height: 100vh;
  background: orangered;
  display: flex;
  //以下的为测试代码
  .test-main {
    flex: 1;
    padding-right: 1.171646vw;
    background-color: rgb(18, 18, 18);
  }
}
</style>
