<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-demo"
        default-active="1"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
      >
        <el-menu-item index="1" @click="goLike">
          <el-icon><icon-menu /></el-icon>
          <span>收到的赞</span>
        </el-menu-item>
        <el-menu-item index="2" @click="goComment">
          <el-icon><document /></el-icon>
          <span>回复我的</span>
        </el-menu-item>
        <el-menu-item index="3">
          <el-icon><setting /></el-icon>
          <span>Navigator 3</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useRouter } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
const router = useRouter();
const handleOpen = (key: string, keyPath: string[]) => {};
const handleClose = (key: string, keyPath: string[]) => {};
function goLike() {
  router.push({
    name: "replyLike",
  });
}
function goComment() {
  router.push({
    name: "replyComment",
  });
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  width: 200px;
  height: calc(100vh - 56px);
}
</style>
