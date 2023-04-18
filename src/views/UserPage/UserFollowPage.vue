<template>
  <div class="">
    <el-container>
      <el-aside width="200px" height="auto">
        <el-menu :default-active="activeIndex" class="el-menu-vertical-demo">
          <el-menu-item index="1" @click="gotoFollow">
            <span>全部关注</span>
          </el-menu-item>
          <el-menu-item index="2" @click="gotoFans">
            <span>全部粉丝</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <p>{{ activeName }}</p>
        <RouterView></RouterView>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const activeIndex = ref("1");
const activeName = ref("全部关注");
watchEffect(() => {
  if (route.path.includes("fans")) {
    activeIndex.value = "2";
    activeName.value = "全部粉丝";
  } else {
    activeIndex.value = "1";
    activeName.value = "全部关注";
  }
});
const setActive = () => {
  if (route.path.includes("fans")) {
    activeIndex.value = "2";
    activeName.value = "全部粉丝";
  } else {
    activeIndex.value = "1";
    activeName.value = "全部关注";
  }
};
onMounted(() => {
  setActive();
});
const gotoFollow = () => {
  router.push({
    path: `/user/${route.params.id}/follow/follow`,
  });
};
const gotoFans = () => {
  router.push({
    path: `/user/${route.params.id}/follow/fans`,
  });
};
</script>

<style lang="scss" scoped></style>
