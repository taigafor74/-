<template>
  <div class="video-right-con">
    <div class="video-item-container">
      <VideoItem v-for="item in 30"></VideoItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoItem from "./VideoItem.vue";
</script>

<style lang="scss" scoped>
.video-right-con {
  margin-left: 30px;
}
</style>
