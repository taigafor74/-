<template>
  <el-row class="tac">
    <el-col :span="12">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#e5e5e5"
        class="el-menu-vertical-demo"
        :default-active="activeIndex"
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
        <el-menu-item index="3" @click="goSystem">
          <el-icon><setting /></el-icon>
          <span>系统通知</span>
        </el-menu-item>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from "vue-router";
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from "@element-plus/icons-vue";
import { onMounted, defineProps, reactive, ref } from "vue";
const router = useRouter();
const route = useRoute();
const activeIndex = ref("1");
onMounted(() => {
  if (route.path == "/reply/comment") {
    activeIndex.value = "2";
  } else if (route.path == "/reply/like") {
    activeIndex.value = "1";
  } else {
    activeIndex.value = "3";
  }
});
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
function goSystem() {
  router.push({
    name: "replySystem",
  });
}
</script>
<style lang="scss" scoped>
.el-menu-vertical-demo {
  width: 200px;
  background: #2d2b2b08;
  height: calc(100vh - 56px);
}
</style>
