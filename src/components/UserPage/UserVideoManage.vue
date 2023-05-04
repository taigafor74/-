<template>
  <div class="user-video-manage-container">
    <div class="manage-card-box">
      <div class="manage-card-box-item" @click="goUpload">
        <div class="img-box">
          <img src="@/assets/icon/视频上传.png" />
        </div>
        <div class="item-font">视频投稿</div>
      </div>
      <div class="manage-card-box-item" @click="goMain">
        <div class="img-box">
          <img src="@/assets/icon/内容管理.png" />
        </div>
        <div class="item-font">内容管理</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
const store = useUserStore();
const router = useRouter();
function goUpload() {
  if (store.isLoggedIn) {
    router.push(`/manage/${store.id}/upload`);
  } else {
    ElMessage({
      message: "请先登录",
      type: "error",
    });
  }
}
function goMain() {
  if (store.isLoggedIn) {
    router.push(`/manage/${store.id}/main`);
  } else {
    ElMessage({
      message: "请先登录",
      type: "error",
    });
  }
}
</script>

<style lang="scss" scoped>
.user-video-manage-container {
  width: 100%;
  margin-bottom: 0.585823vw;
  border: 0.05852vw solid rgb(61, 2, 199);
  border-radius: 0.492912vw;
  background: #0f0f0f;
  .manage-card-box {
    width: 100%;
    display: flex;
    padding: 1.05823vw 0.585823vw;
    align-items: center;
    .manage-card-box-item {
      flex: 1;
      background-color: #0f0f0f;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #b4b3b3;
      &:first-child {
        border-right: 0.058582vw solid rgb(61, 2, 199);
      }
      &:hover {
        color: rgb(61, 2, 199);
      }
      .img-box {
        width: 1.405975vw;
        height: 1.405975vw;
        margin-right: 0.292912vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .item-font {
        font-size: 0.820152vw;
      }
    }
  }
}
</style>
