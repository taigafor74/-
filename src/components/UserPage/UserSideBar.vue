<template>
  <div class="user-side-bar-container">
    <UserVideoManage />
    <UserInfo />
    <div class="btn" @click="dialogTableVisible = true">
      <button>发布动态</button>
    </div>
    <UserAnnounce />
  </div>
  <el-dialog v-model="dialogTableVisible" :draggable="true">
    <div><ActiveInput /></div>
  </el-dialog>
</template>

<script setup lang="ts">
import UserVideoManage from "@/components/UserPage/UserVideoManage.vue";
import UserAnnounce from "./UserAnnounce.vue";
import UserInfo from "./UserInfo.vue";
import ActiveInput from "../ActivePage/ActiveInput.vue";
import { ref } from "vue";
const dialogTableVisible = ref(false);
</script>

<style lang="scss" scoped>
.user-side-bar-container {
  width: 320px;
  background-color: rgb(18, 18, 18);
  .btn {
    margin-bottom: 10px;
    padding: 15px 19px 18px;
    background: rgb(0, 0, 0);
    border: 1px solid rgb(61, 2, 199);
    border-radius: 8.5px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85px;
    cursor: pointer;
    &:hover {
      background: rgb(61, 2, 199);
      button {
        color: #ffffff;
      }
    }
    button {
      cursor: pointer;
      color: rgb(61, 2, 199);
      font-family: "Zpix";
      background: transparent;
      font-size: 32px;
      border: 0;
    }
  }
}
</style>
