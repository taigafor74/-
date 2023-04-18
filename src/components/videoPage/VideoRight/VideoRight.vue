<template>
  <div class="video-right-con">
    <div class="video-item-container">
      <VideoAuthor :data="props.data"></VideoAuthor>
      <VideoDanmaku></VideoDanmaku>
      <VideoItem v-for="item in 30"></VideoItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoItem from "./VideoItem.vue";
import VideoDanmaku from "./VideoDanmaku.vue";
import VideoAuthor from "./VideoAuthor.vue";
import { defineProps, watchEffect, onMounted, ref } from "vue";
const data = ref([]);
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
onMounted(() => {
  watchEffect(() => {
    if (props.data) {
      return;
    }
  });
});
</script>

<style lang="scss" scoped>
.video-right-con {
  padding-top: 15px;
  margin-left: 30px;
}
</style>
