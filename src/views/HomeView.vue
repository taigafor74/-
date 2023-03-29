<template>
  <div class="main-container">
    <div v-if="showLoginState.isLogin" class="mask"></div>
    <Teleport to="body">
      <LoginComponent v-if="showLoginState.isLogin"></LoginComponent>
    </Teleport>
    <MainHeader></MainHeader>
    <div class="bottom">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from "@/components/mainPage/MainHeader.vue";
import LoginComponent from "@/components/LoginAndRegister/LoginComponent.vue";
import { showLogin } from "@/stores/counter";
const showLoginState = showLogin();
</script>

<style lang="scss" scoped>
$dark-color: #000000;

.main-container {
  display: flex;
  flex-direction: column;
  color: white;
  width: 100%;
  background-color: $dark-color;
  overflow-y: hidden;
  .mask {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: $dark-color;
    opacity: 0.5;
  }
  .bottom {
    margin-top: 3.280609vw;
    display: flex;
  }
}
</style>
