<template>
  <div class="search-con">
    <div class="left">
      <SideBar />
    </div>
    <div class="right">
      <div class="header">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
        >
          <el-menu-item index="1">视频</el-menu-item>
          <el-menu-item index="2">用户</el-menu-item>
        </el-menu>
      </div>
      <RouterView :data="data"></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getSearch } from "@/api/search";
import SideBar from "@/components/mainPage/SideBar.vue";
import VideoCard from "@/components/mainPage/VideoCard.vue";
const activeIndex = ref("1");
const route = useRoute();
const router = useRouter();
const data = ref(null);
const handleSelect = (key: string, keyPath: string[]) => {
  if (key == 1) {
    router.push({
      name: "searchVideo",
    });
  }
  if (key == 2) {
    router.push({
      name: "searchUser",
    });
  }
};
onMounted(async () => {
  data.value = await getSearch(route.params.keyword);
});
</script>

<style lang="scss" scoped>
.search-con {
  width: 100%;
  height: 100%;
  .left {
  }
  .right {
    margin-left: 264px;
    .header {
      margin-bottom: 20px;
    }
  }
}
</style>
