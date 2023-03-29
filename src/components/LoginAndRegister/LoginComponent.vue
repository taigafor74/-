<template>
  <div class="login-container">
    <button class="X" @click="showLoginState.isLogin = false">x</button>
    <div class="login-box">
      <div class="login-box-title">
        <span>密码登录</span>
        <span>手机登录</span>
      </div>
      <form class="login-form">
        <div class="input-box">
          <div class="account-box">
            <span>账号</span
            ><input
              type="text"
              placeholder="请输入账号"
              v-model="loginForm.username"
            />
          </div>
          <div class="password-box">
            <span>密码</span
            ><input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
            />
          </div>
        </div>
        <div class="button-box">
          <button @click="loginSubmit">注册</button>
          <button @click="loginSubmit">登录</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { showLogin } from "@/stores/counter";
import { reactive } from "vue";
import axios from "axios";
type loginType = {
  username: string;
  password: string;
};
const loginForm: loginType = reactive({
  username: "",
  password: "",
});
const showLoginState = showLogin();
function loginSubmit(e: Event) {
  e.preventDefault();
  axios
    .post("http://localhost:3000/test", loginForm, {
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
    });
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 46.865847vw;
  height: 23.432923vw;
  background-color: rgb(0, 0, 0);
  border-radius: 1.171646vw;
  position: fixed;
  z-index: 999;
  top: 50%;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  .X {
    position: absolute;
    right: 0.585823vw;
    top: 0.585823vw;
  }
  .login-box {
    width: 80%;
    height: 80%;
    background-color: rgb(0, 0, 0);
    .login-form {
      width: 100%;
      height: 80%;
      padding-top: 2.929115vw;
      display: flex;
      flex-direction: column;
      align-items: center;
      .input-box {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        .account-box {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.171646vw;
        }
        .password-box {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        span {
          margin-right: 0.585823vw;
        }
        input {
          width: 85%;
          border-radius: 0.585823vw;
          outline: none;
          border: 0;
          height: 1.59115vw;
        }
      }
      .button-box {
        width: 60%;
        margin-top: 1.171646vw;
        display: flex;
        justify-content: space-between;
        button {
          border: 0;
          border-radius: 0.585823vw;
          width: 10.858231vw;
          height: 1.929115vw;
          cursor: pointer;
        }
      }
    }
    .login-box-title {
      width: 100%;
      height: 2.543292vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        &:nth-child(1) {
          border-bottom: 0.108582vw solid white;
        }
        &:nth-child(2) {
          border-bottom: 0.108582vw solid rgb(35, 34, 34);
        }
      }
    }
  }
}
</style>
