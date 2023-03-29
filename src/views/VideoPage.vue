<template>
  <div class="video-container">
    <div class="video-left-container"></div>
    <div class="video-right-container"></div>
  </div>
</template>

<script setup lang="ts">
import SideBar from "@/components/mainPage/SideBar.vue";
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  height: 100vh;
  padding: 0 0.585823vw;
  display: flex;
  justify-content: center;
  background-color: black;
  .video-left-container {
    width: 62.272994vw;
    height: 100%;
    background-color: red;
  }
  .video-right-container {
    width: 24.077329vw;
    height: 100%;
    background-color: blue;
  }
}
</style>
