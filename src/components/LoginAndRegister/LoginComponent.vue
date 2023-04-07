<template>
  <div class="login-container">
    <button class="X" @click="showLoginState.isLogin = false">x</button>
    <div class="login-box-title">
      <span class="first" ref="first" @click="changeAct">登录</span>
      <span class="second" ref="second" @click="changeAct">注册</span>
    </div>
    <UserLogin v-if="isLogin" />
    <UserRegister v-if="!isLogin" />
  </div>
</template>

<script setup lang="ts">
import { showLogin } from "@/stores/counter";
import UserLogin from "./UserLogin.vue";
import UserRegister from "./UserRegister.vue";
import { ref } from "vue";
const isLogin = ref(true);
const first: any = ref(null);
const second: any = ref(null);
const showLoginState = showLogin();
function changeAct(e) {
  if (e.target.className === "first") {
    isLogin.value = true;
  } else {
    isLogin.value = false;
  }
  first.value.style.borderBottom = "1.85px solid rgb(35, 35, 35)";
  first.value.style.color = "white";
  second.value.style.color = "white";
  second.value.style.borderBottom = "1.85px solid rgb(35, 35, 35)";
  e.target.style.borderBottom = "1.85px solid rgb(165, 13, 196)";
  e.target.style.color = "rgb(165, 13, 196)";
}
</script>

<style lang="scss" scoped>
.login-container {
  font-family: "zpix";
  overflow: hidden;
  background-color: rgb(0, 0, 0);
  border-radius: 20px;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  .X {
    background: transparent;
    border: 0;
    color: white;
    position: absolute;
    right: 0.585823vw;
    top: 0.585823vw;
  }
  .login-box-title {
    width: 100%;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      width: 50%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      border-bottom: 1.85px solid rgb(35, 35, 35);
      &:hover {
        color: rgb(165, 13, 196);
      }
      cursor: pointer;
    }
    .first {
      color: rgb(165, 13, 196);
      border-bottom: 1.85px solid rgb(165, 13, 196);
    }
  }
}
</style>
