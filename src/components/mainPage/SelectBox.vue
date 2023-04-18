<template>
  <div class="select-con" @mouseleave="disBox">
    <div class="name">{{ store.uname }}</div>
    <div class="account-data">
      <div class="item" @click="goFollow">
        <span>199</span>
        <span>关注</span>
      </div>
      <div class="item">
        <span>3000</span>
        <span>粉丝</span>
      </div>
    </div>
    <div class="movement">
      <div class="movement-item" @click="gotoMain">
        <span><img src="@/assets/icon/未登录.png" /></span>
        <span>个人中心</span>
        <span>
          <img src="@/assets/icon/右箭头.png" />
        </span>
      </div>
      <div class="movement-item">
        <span> <img src="@/assets/icon/内容管理.png" /></span>
        <span>投稿管理</span>
        <span>
          <img src="@/assets/icon/右箭头.png" />
        </span>
      </div>
      <div class="movement-item" @click="logOut">
        <span> <img src="@/assets/icon/退出登录.png" /></span>
        <span>退出登录</span>
        <span>
          <img src="@/assets/icon/右箭头.png" />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { showLogin } from "@/stores/counter";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const store = useUserStore();
const showLoginState = showLogin();
const goFollow = () => {
  router.push({
    path: `/user/${store.id}/follow/follow`,
  });
};
const disBox = () => {
  showLoginState.showSelectBox = false;
};
function logOut() {
  store.logout();
}
function gotoMain() {
  router.push({
    path: `/user/${store.id}/main`,
  });
}
</script>

<style lang="scss" scoped>
.select-con {
  width: 300px;
  background-color: black;
  border: 1px solid rgb(165, 13, 196);
  border-radius: 10px;
  padding: 20px;
  left: 50%;
  transform: translateX(-50%) translateY(-32%) scale(0.5);
  position: absolute;
  .name {
    margin-top: 20px;
    display: flex;
    font-size: 24px;
    color: rgb(165, 13, 196);
    justify-content: center;
  }
  .account-data {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      span {
        &:nth-child(1) {
          font-size: 24px;
          margin-bottom: 5px;
          &:hover {
            color: rgb(165, 13, 196);
          }
        }
        &:nth-child(2) {
          font-size: 12px;
        }
      }
    }
  }
  .movement {
    width: 100%;
    display: flex;
    padding: 0 20px;
    margin-top: 20px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .movement-item {
      padding: 10px;
      &:hover {
        background: #2f2f2f;
      }
      display: flex;
      width: 100%;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      border-radius: 5px;
      cursor: pointer;
      span {
        &:nth-child(1) {
          width: 16px;
          height: 16;
          display: flex;
          align-items: center;
          margin-right: 5px;
          img {
            width: 16px;
            height: 16px;
          }
        }
        &:nth-child(2) {
          flex: 1;
          box-sizing: border-box;
          font-size: 14px;
        }
        &:nth-child(3) {
          width: 20px;
          height: 20px;
          img {
            width: 20px;
            height: 20px;
          }
        }
      }
    }
  }
}
</style>
