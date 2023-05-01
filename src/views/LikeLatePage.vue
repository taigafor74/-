<template>
  <div class="main-con-like">
    <div class="main-content">
      <div class="left">
        <SideBar></SideBar>
        <LeftBar :item="data" v-show="isShow"></LeftBar>
        <div class="no" v-show="!isShow">暂无内容</div>
      </div>
      <div class="right" v-show="isShow">
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
import { useUserStore } from "@/stores/user";
import { getWatch } from "@/api/watch";
import { useRoute } from "vue-router";
import { userLike } from "@/api/like";
import { getCollectionVideo } from "@/api/collect";
const route = useRoute();
const isShow = ref(false);
const store = useUserStore();
const data = ref([]);
async function loadVideos() {
  if (store.isLoggedIn) {
    if (route.query.query == "watch") {
      const watch = await getWatch(store.id);
      console.log(watch);

      if (watch.data.length !== 0) {
        isShow.value = true;
      }
      data.value = watch.data;
    }
    if (route.query.query == "like") {
      const like = await userLike(store.id);
      if (like.length !== 0) {
        isShow.value = true;
      }

      data.value = like;
    }
    if (route.query.query == "collect") {
      const collect = await getCollectionVideo(store.id);
      console.log(collect);

      if (collect.length !== 0) {
        isShow.value = true;
      }

      data.value = collect;
    }
  }
}
loadVideos();
</script>

<style lang="scss" scoped>
.no {
  margin-left: 264px;
  width: calc(100vw - 280px);
  color: purple;
  height: calc(100vh - 64px);
  font-size: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
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
