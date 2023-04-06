<template>
  <div class="video-container">
    <div class="video-left-container">
      <VideoTitle></VideoTitle>
      <VideoPlayer></VideoPlayer>
      <VideoReact></VideoReact>
      <VideoDesc></VideoDesc>
      <VideoComment></VideoComment>
      <Transition name="fade">
        <div class="fixed-input" v-if="show">
          <VideoCommentInput></VideoCommentInput>
        </div>
      </Transition>
    </div>
    <div class="video-right-container">
      <VideoRight></VideoRight>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from "@/components/videoPage/VideoLeft/VideoPlayer/VideoPlayer.vue";
import VideoComment from "@/components/videoPage/VideoLeft/VideoComment/VideoComment.vue";
import VideoRight from "@/components/videoPage/VideoRight/VideoRight.vue";
import VideoReact from "@/components/videoPage/VideoLeft/VideoReact.vue";
import VideoTitle from "@/components/videoPage/VideoLeft/VideoTitle.vue";
import VideoDesc from "@/components/videoPage/VideoLeft/VideoDesc.vue";
import VideoCommentInput from "@/components/videoPage/VideoLeft/VideoComment/VideoCommentInput.vue";
import { useVideoStore } from "@/stores/VideoStore";
import { computed } from "vue";

const videoStore = useVideoStore();
const show = computed(() => videoStore.isFixed);
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  padding: 0 0.585823vw;
  display: flex;
  justify-content: center;
  background-color: black;
  .video-left-container {
    position: relative;
    width: 1063px;
    height: 100%;
    background-color: rgba(255, 0, 0, 0);
    .fixed-input {
      position: fixed;
      padding: 10px 0;
      bottom: 0;
      width: 1063px;
    }
  }
  .video-right-container {
    width: 24.077329vw;
    height: 100%;
    background-color: rgba(0, 0, 255, 0);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
// .fade-enter,
// .fade-leave-to {
//   opacity: 0;
// }
.fade-enter-from {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave-from {
  opacity: 1;
}
.fade-leave-to {
  opacity: 0;
}
</style>
