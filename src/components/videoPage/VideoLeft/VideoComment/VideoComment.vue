<template>
  <div class="video-comment-con">
    <VideoCommentHeader></VideoCommentHeader>
    <div class="comment">
      <VideoCommentInput ref="videoCommentInputRef"></VideoCommentInput>
      <div style="margin-top: 20px"></div>
      <VideoCommentItem v-for="item in 10"></VideoCommentItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoCommentHeader from "./VideoCommentHeader.vue";
import VideoCommentInput from "./VideoCommentInput.vue";
import VideoCommentItem from "./VideoCommentItem.vue";
import { useVideoStore } from "@/stores/VideoStore";
import { ref, onMounted, onUnmounted } from "vue";
const videoStore = useVideoStore();
const videoCommentInputRef: any = ref(null);
const handleScroll = () => {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const commentInputOffsetTop = videoCommentInputRef.value.$el.offsetTop;
  const commentInputHeight = videoCommentInputRef.value.$el.offsetHeight;
  if (scrollTop > commentInputOffsetTop + commentInputHeight) {
    videoStore.setIsFixed(true);
  } else {
    videoStore.setIsFixed(false);
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped>
.video-comment-con {
  margin-top: 24px;
}
</style>
