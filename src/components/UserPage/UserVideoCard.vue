<template>
  <div class="user-video-card-container" @click="goto(props.item?.vid)">
    <div class="img-box">
      <img :src="img" alt="video-img" />
    </div>
    <div class="user-video-card-title" ref="title">
      {{ props.item?.title }}
    </div>
    <div class="user-video-card-info" ref="info">
      <div>觀看次數：{{ formatPlayCount(props.item?.playcount) }}</div>
      <div>{{ timeAgo(props.item?.upload_date) }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { timeAgo } from "@/utils/getTime";
const route = useRoute();
const title = ref(null);
const info = ref(null);
const props = defineProps({
  item: Object, // 修改这里，定义item为Object类型
});
// const uTitle = ref("");
// const uTime = ref("");
// const uCount = ref("");
const router = useRouter();
function goto(vid) {
  router.push({
    name: "video",
    path: "/video",
    query: {
      vid: vid,
    },
  });
}
const img = ref("");
watchEffect(() => {
  if (props.item) {
    // uTitle.value = props.item.title;
    // uCount.value = formatPlayCount(props.item.playcount);
    // uTime.value = timeAgo(props.item.upload_date);
    img.value = `http://localhost:3000/videoImg/${props.item.img}`;
  }
});
function formatPlayCount(playCount) {
  if (playCount < 10000) {
    return `${playCount}次`;
  } else if (playCount >= 10000 && playCount < 1000000) {
    return `${(playCount / 10000).toFixed(1)}万次`;
  }
}
onMounted(() => {
  if (title.value && info.value) {
    if (route.path == "/user/main") {
      let titleValue = title.value as HTMLElement;
      let infoValue = info.value as HTMLElement;
      titleValue.style.fontSize = "0.5vw";
      infoValue.style.fontSize = "0.5vw";
    }
  }
});
</script>

<style lang="scss" scoped>
.user-video-card-container {
  cursor: pointer;
  width: 100%;
  padding: 10px;
  margin-right: 0 0 3px;
  .img-box {
    width: 100%;
    img {
      border-radius: 5px;
      width: 100%;
      height: 100px;
      object-fit: cover;
    }
  }
  .user-video-card-title {
    margin-top: 6px;
    font-size: 13.5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .user-video-card-info {
    font-size: 12px;
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }
}
</style>
