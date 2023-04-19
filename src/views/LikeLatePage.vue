<template>
  <div class="main-con-like">
    <div class="main-content">
      <div class="left">
        <SideBar></SideBar>
        <LeftBar :item="data"></LeftBar>
      </div>
      <div class="right">
        <VideoItem v-for="item in data" :item="item"></VideoItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideBar from "@/components/mainPage/SideBar.vue";
import LeftBar from "@/components/VideoList/LeftBar.vue";
import VideoItem from "@/components/VideoList/VideoItem.vue";
import { getVideos } from "@/api/mainPage";
const data = ref([]);
async function loadVideos() {
  const videos = await getVideos();
  data.value = videos.data;
}
loadVideos();
</script>

<style lang="scss" scoped>
.main-con-like {
  width: 100%;
  background-color: #0f0f0f;
  .main-content {
    width: 100%;
    display: flex;
    .left {
      width: 630px;
      height: 100%;
    }
    .right {
      padding: 20px;
      flex: 1;
    }
  }
}
</style>
