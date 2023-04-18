<template>
  <div class="login-box">
    <form class="login-form">
      <div class="input-box">
        <div class="account-box">
          <div>账号</div>
          <div class="account-input">
            <input
              type="text"
              placeholder="请输入账号"
              v-model="loginForm.username"
              @focus="handleFocus($event)"
              @blur="handleBlur($event)"
            />
          </div>
        </div>
        <div class="password-box">
          <div>密码</div>
          <div class="password-input">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="loginForm.password"
              @focus="handleFocus($event)"
              @blur="handleBlur($event)"
            />
          </div>
        </div>
      </div>
      <div class="button-box">
        <button @click="loginSubmit">登录</button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import axios from "axios";
import { useUserStore } from "@/stores/user";
import { showLogin } from "@/stores/counter";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import request from "@/axios/index";
import { login } from "@/api/loginAndR";
const userStore = useUserStore();
const router = useRouter();
const showLoginState = showLogin();
type loginType = {
  username: string;
  password: string;
};
const loginForm: loginType = reactive({
  username: "",
  password: "",
});

function handleFocus(e: Event) {
  const inputParent = (e.currentTarget as HTMLElement).parentElement;
  if (inputParent) {
    inputParent.style.border = "1px solid rgb(165, 13, 196)";
    inputParent.style.boxShadow = "0 0 20px rgba(165, 13, 196, 0.6)";
  }
}

function handleBlur(e: Event) {
  const inputParent = (e.currentTarget as HTMLElement).parentElement;
  if (inputParent) {
    inputParent.style.border = "1px solid transparent";
    inputParent.style.boxShadow = "0 0 0 transparent";
  }
}

async function loginSubmit(e: Event) {
  e.preventDefault();
  const res = await login(loginForm);
  console.log(res);

  if (res.success) {
    ElMessage.success("登录成功");
    userStore.setUser(res.avatar, res.id, res.uname, true);
    // 将用户名和头像等信息存储到 localStorage 中
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: res.id,
        uname: res.uname,
        avatar: res.avatar,
      })
    );
    showLoginState.isLogin = false;
    router.push("/main");
  } else {
    ElMessage.error("登录失败");
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 600px;
  height: 240px;
  background-color: #0f0f0f;
  color: white;
  .login-form {
    width: 100%;
    height: 80%;
    padding-top: 25px;
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
        margin-bottom: 40px;
        div {
          white-space: nowrap;
          margin-right: 10px;
        }
        .account-input {
          width: 100%;
          padding: 0 10px;
          background: rgb(43, 42, 42);
          border-radius: 10px;
          border: 1px solid transparent;
          &:hover {
            border: 1px solid rgb(165, 13, 196);
          }
          input {
            background: transparent;
            width: 85%;
            outline: none;
            border: 0;
            color: white;
            height: 28px;
          }
        }
      }
      .password-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 40px;

        div {
          margin-right: 10px;
          white-space: nowrap;
        }
        .password-input {
          border: 1px solid transparent;
          &:hover {
            border: 1px solid rgb(165, 13, 196);
          }
          width: 100%;
          padding: 0 10px;
          background: rgb(43, 42, 42);
          border-radius: 10px;
          input {
            background: transparent;
            width: 85%;
            outline: none;
            color: white;
            border: 0;
            height: 28px;
          }
        }
      }
    }
    .button-box {
      width: 60%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        &:hover {
          background-color: rgb(165, 13, 196);
        }
        transition: all 0.3s;
        border: 0;
        border-radius: 10px;
        width: 100%;
        height: 32px;
        cursor: pointer;
        font-family: "zpix";
      }
    }
  }
}
</style>
