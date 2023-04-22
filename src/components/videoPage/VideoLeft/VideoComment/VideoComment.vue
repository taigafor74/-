<template>
  <div class="video-comment-con">
    <VideoCommentHeader></VideoCommentHeader>
    <div class="comment">
      <VideoCommentInput
        ref="videoCommentInputRef"
        :type="type"
      ></VideoCommentInput>
      <div style="margin-top: 20px"></div>
      <VideoCommentItem
        v-for="item in commentStore.comments"
        :item="item"
        :currentActiveComment="currentActiveComment"
        @setActiveComment="setActiveComment"
      ></VideoCommentItem>
    </div>
  </div>
</template>

<script setup lang="ts">
import VideoCommentHeader from "./VideoCommentHeader.vue";
import VideoCommentInput from "./VideoCommentInput.vue";
import VideoCommentItem from "./VideoCommentItem.vue";
import { useVideoStore } from "@/stores/VideoStore";
import { ref, onMounted, onUnmounted } from "vue";
import { getComment } from "@/api/comment";
import { useRoute } from "vue-router";
import { useCommentStore } from "@/stores/comment";
const commentStore = useCommentStore();
const currentActiveComment = ref(null);
function setActiveComment(comment_id) {
  currentActiveComment.value = comment_id;
}
const route = useRoute();
const type = ref("main");
const videoStore = useVideoStore();
const videoCommentInputRef: any = ref(null);
const commentData = ref([]);
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

onMounted(async () => {
  commentStore.comments = await getComment(route.query.vid);
  console.log(commentStore.comments);

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
