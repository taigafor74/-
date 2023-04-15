<template>
  <div class="main-con-like">
    <div class="main-content">
      <div class="left">
        <SideBar></SideBar>
        <LeftBar></LeftBar>
      </div>
      <div class="right">
        <VideoItem v-for="item in 30"></VideoItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import SideBar from "@/components/mainPage/SideBar.vue";
import LeftBar from "@/components/VideoList/LeftBar.vue";
import VideoItem from "@/components/VideoList/VideoItem.vue";
</script>

<style lang="scss" scoped>
.main-con-like {
  width: 100%;
  background-color: black;
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
