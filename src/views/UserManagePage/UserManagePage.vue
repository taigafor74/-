<template>
  <div class="upload-con">
    <div class="header">
      <el-menu
        :default-active="store.index"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">首页</el-menu-item>
        <el-menu-item index="2">视频管理</el-menu-item>
        <el-menu-item index="3">视频上传</el-menu-item>
        <el-menu-item index="4">评论管理</el-menu-item>
      </el-menu>
    </div>
    <div><RouterView :commentData="commentData"></RouterView></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useManageStore } from "@/stores/manage";
import SideBar from "@/components/UserManage/SideBar.vue";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";
import { getUserVideoComment } from "@/api/comment";
const userStore = useUserStore();
const store = useManageStore();
const router = useRouter();
const route = useRoute();
const commentData = ref(null);

onMounted(async () => {
  if (userStore.isLoggedIn && userStore.id == route.params.id) {
    commentData.value = await getUserVideoComment(userStore.id);
  } else {
    router.push({
      path: "/main",
    });
  }
});
const handleSelect = (key: string, keyPath: string[]) => {
  if (key == 1) {
    router.push({
      name: "manageMain",
    });
    store.index = "1";
  }
  if (key == 2) {
    router.push({
      name: "manageVideo",
    });
    store.index = "2";
  }
  if (key == 3) {
    router.push({
      name: "manageUpload",
    });
    store.index = "3";
  }
  if (key == 4) {
    router.push({
      name: "manageComment",
    });
    store.index = "4";
  }
};
</script>

<style lang="scss" scoped>
.upload-con {
  padding: 0 264px;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
