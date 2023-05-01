<template>
  <div class="video-con">
    <div style="margin-bottom: 20px">
      <el-button @click="sortPlay">最多点击</el-button>
      <el-button @click="sortTime">最新发布</el-button>
    </div>
    <div class="video">
      <VideoCard v-for="item in pagedVideos" :key="item.vid" :item="item" />
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[4, 8, 16, 32]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="videos.length"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, watchEffect } from "vue";
import VideoCard from "@/components/mainPage/VideoCard.vue";
const data = ref(null);
const videos = ref([]);
const currentPage = ref(1);
const pageSize = ref(16);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});
watchEffect(() => {
  if (props.data) {
    videos.value = props.data.videos;
  }
});
const pagedVideos = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return videos.value.slice(startIndex, endIndex);
});
const sortPlay = () => {
  videos.value.sort((a, b) => b.playcount - a.playcount);
};
const sortTime = () => {
  videos.value.sort(
    (a, b) =>
      new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime()
  );
};
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
</style>
