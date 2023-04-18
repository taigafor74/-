<template>
  <div class="video-container">
    <div class="video-left-container">
      <VideoTitle :data="data"></VideoTitle>
      <VideoPlayer :data="data"></VideoPlayer>
      <VideoReact></VideoReact>
      <VideoDesc :data="data"></VideoDesc>
      <VideoComment></VideoComment>
      <Transition name="fade">
        <div class="fixed-input" v-if="show">
          <VideoCommentInput></VideoCommentInput>
        </div>
      </Transition>
    </div>
    <div class="video-right-container">
      <VideoRight :data="data"></VideoRight>
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
import { computed, onMounted, ref } from "vue";
import { getVideo } from "@/api/mainPage";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const data = ref([]);
const videoStore = useVideoStore();
const show = computed(() => videoStore.isFixed);
const getData = async () => {
  data.value = await getVideo(route.query.vid);
  data.value = data.value[0];
};
getData();
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  padding: 0 0.585823vw;
  display: flex;
  justify-content: center;
  background-color: #0f0f0f;
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
