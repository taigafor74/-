<template>
  <div class="main-container">
    <div v-if="showLoginState.isLogin" class="mask"></div>
    <Teleport to="body">
      <LoginComponent v-if="showLoginState.isLogin"></LoginComponent>
    </Teleport>
    <MainHeader></MainHeader>
    <div class="bottom">
      <Transition name="show">
        <SideBar v-show="store.isSideBar"></SideBar>
      </Transition>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from "@/stores/main";
const store = useMainStore();
import MainHeader from "@/components/mainPage/MainHeader.vue";
import LoginComponent from "@/components/LoginAndRegister/LoginComponent.vue";
import { showLogin } from "@/stores/counter";
import SideBar from "@/components/mainPage/SideBar.vue";
const showLoginState = showLogin();
</script>

<style lang="scss" scoped>
// $dark-color: rgb(18, 18, 18);

.main-container {
  display: flex;
  font-family: "zpix";
  flex-direction: column;
  color: white;
  width: 100%;
  background-color: #0f0f0f;
  overflow-y: hidden;
  .mask {
    position: fixed;
    z-index: 99;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
  }
  .bottom {
    margin-top: 3.280609vw;
    display: flex;
  }
  .show-enter-active,
  .show-leave-active {
    transition: width 0.3s ease-in-out;
  }
  .show-enter-from {
    width: 0px;
  }
  .show-enter-to {
    width: 240px;
  }
  .show-leave-from {
    width: 240px;
  }
  .show-leave-to {
    width: 0px;
  }
}
</style>
