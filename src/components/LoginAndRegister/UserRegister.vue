<template>
  <div class="login-box">
    <form class="login-form">
      <div class="input-box">
        <div class="box">
          <label>设置账号</label>
          <div class="inner">
            <div class="input">
              <input
                type="text"
                placeholder="请输入账号"
                v-model="registerForm.username"
                @focus="handleFocus($event)"
                @blur="handleBlur($event)"
              />
            </div>
          </div>
          <div class="verify">&nbsp;{{ usernameError }}</div>
        </div>
        <div class="box">
          <label>设置密码</label>
          <div class="inner">
            <div class="input">
              <input
                type="password"
                placeholder="请输入密码"
                v-model="registerForm.password"
                @focus="handleFocus($event)"
                @blur="handleBlur($event)"
              />
            </div>
          </div>
          <div class="verify">&nbsp;{{ passwordError }}</div>
        </div>
        <div class="box">
          <label>确认密码</label>
          <div class="inner">
            <div class="input">
              <input
                type="password"
                placeholder="请输入密码"
                v-model="confirm"
                @focus="handleFocus($event)"
                @blur="handleBlur($event)"
              />
            </div>
          </div>
          <div class="verify">&nbsp;{{ cofirmPassword }}</div>
        </div>
        <div class="box">
          <label>邮箱地址</label>
          <div class="inner">
            <div class="input">
              <input
                type="text"
                placeholder="请输入邮箱"
                v-model="registerForm.mail"
                @focus="handleFocus($event)"
                @blur="handleBlur($event)"
              />
              <button class="num" @click="getVerify" :disabled="isSend">
                {{ count }}
              </button>
            </div>
          </div>
          <div class="verify">&nbsp;{{ EmailError }}</div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">验证码</div>
        <div class="button-box">
          <div>
            <input
              @focus="handleFocus($event)"
              @blur="handleBlur($event)"
              placeholder="请输入验证码"
              v-model="registerForm.verify"
            />
          </div>
          <button @click="registerSubmit">&nbsp;注册</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { showLogin } from "@/stores/counter";
const showLoginState = showLogin();
import { ElMessage } from "element-plus";
let count: any = ref("获取验证码");
const router = useRouter();
let timer = null;
const confirm = ref("");
type registerType = {
  username: string;
  password: string;
  mail: string;
  verify: string;
};
const isSend = ref(false);
const registerForm: registerType = reactive({
  username: "",
  password: "",
  mail: "",
  verify: "",
});
const usernameError = computed(() => {
  if (registerForm.username === "") return "";
  const usernameRegex = /^[\w- \u4e00-\u9fa5]*$/;
  const isValid = usernameRegex.test(registerForm.username);
  if (!isValid) {
    return "账号含有非法字符";
  }
  if (registerForm.username.length < 4 || registerForm.username.length > 12) {
    return "账号长度不足4位或大于12位";
  }
  return "";
});
const passwordError = computed(() => {
  if (registerForm.password === "") return "";
  const passwordRegex = /^\S*(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])\S*$/;
  const isValid = passwordRegex.test(registerForm.password);
  const regex = /[^a-zA-Z0-9]/;
  const isSpecial = regex.test(registerForm.password);
  if (isSpecial) {
    return "密码含有非法字符";
  }
  if (!isValid) {
    return "密码必须包含大小写字母、数字";
  }
  if (registerForm.password.length < 6 || registerForm.password.length > 16) {
    return "密码长度不足6位或大于16位";
  }
  return "";
});
const cofirmPassword = computed(() => {
  if (confirm.value === registerForm.password) return "";
  return registerForm.password != confirm.value ? "密码不一致" : "";
});
const EmailError = computed(() => {
  if (registerForm.mail === "") return "";
  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const isValid = emailRegex.test(registerForm.mail);
  if (!isValid) {
    return "邮箱格式不正确";
  }
  return "";
});
const isFormValid = computed(() => {
  return (
    usernameError.value === "" &&
    passwordError.value === "" &&
    cofirmPassword.value === "" &&
    EmailError.value === "" &&
    registerForm.username !== "" &&
    registerForm.password !== "" &&
    registerForm.mail !== "" &&
    confirm.value !== "" &&
    registerForm.verify.value !== ""
  );
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
function getVerify(e) {
  e.preventDefault();
  if (registerForm.mail === "" || EmailError.value !== "") {
    ElMessage({
      message: "邮箱地址错误",
      type: "warning",
    });
    return;
  }
  if (count.value === "获取验证码") {
    count.value = 60;
    isSend.value = true;
    timer = setInterval(() => {
      if (count.value === 0) {
        clearInterval(timer);
        count.value = "获取验证码";
        isSend.value = false;
      } else {
        count.value--;
      }
    }, 1000);
  }
  axios
    .post("http://localhost:3000/api/user/verifymail", {
      email: registerForm.mail,
    })
    .then((res) => {
      if (!res.data.code) {
        ElMessage({
          message: "邮箱已被注册",
          type: "warning",
        });
        isSend.value = false;
        clearInterval(timer);
        count.value = "获取验证码";
      } else {
        ElMessage({
          message: "验证码已发送",
          type: "success",
        });
      }
    });
}
function registerSubmit(e) {
  e.preventDefault();
  if (isFormValid.value) {
    axios
      .post("http://localhost:3000/api/user/register", registerForm)
      .then((res) => {
        if (res.data.error) {
          ElMessage({
            message: res.data.message,
            type: "warning",
          });
          return;
        } else {
          ElMessage({
            message: "注册成功",
            type: "success",
          });
          showLoginState.isLogin = false;
          router.push("/main");
        }
      });
  } else {
    ElMessage({
      message: "请检查表单是否填写正确",
      type: "warning",
    });
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  width: 600px;
  background-color: rgb(0, 0, 0);
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
      .box {
        width: 100%;
        display: flex;
        flex-direction: column;
        label {
          margin-bottom: 10px;
        }
        .inner {
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .input {
            width: 100%;
            padding-left: 10px;
            margin-right: 0;
            background: rgb(43, 42, 42);
            display: flex;
            border-radius: 10px;
            border: 1px solid transparent;
            .num {
              height: 28px;
              white-space: nowrap;
              background: transparent;
              border: 0;
              display: flex;
              align-items: center;
              cursor: pointer;
              color: white;
            }
            input {
              background: transparent;
              width: 85%;
              outline: none;
              border: 0;
              height: 28px;
              color: white;
            }
          }
        }
        .verify {
          color: red;
          text-align: right;
          margin-top: 5px;
        }
      }
    }
    .bottom {
      width: 60%;
      .button-box {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 30px;
        align-items: center;
        div {
          width: 100%;
          border-radius: 10px;
          overflow: hidden;
          background: rgb(43, 42, 42);
          border: 1px solid transparent;
          input {
            width: 85%;
            overflow: hidden;
            padding-left: 10px;
            background: rgb(43, 42, 42);
            outline: none;
            color: white;
            border: 0;
            border-radius: 10px;
            height: 32px;
            font-family: "zpix";
            border: 1px solid transparent;
          }
        }
        button {
          margin-left: 10px;
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
}
</style>
