<template>
  <div class="video-card-con" @click="goto">
    <div class="left">
      <div class="cover">
        <img :src="baseUrl + data.img" />
      </div>
    </div>
    <div class="right">
      <div class="title">{{ data.title }}</div>
      <div class="desc">
        {{ data.description }}
      </div>
      <div class="info">
        <span class="item">
          <img src="@/assets/icon/view.svg" alt="" />
          <span style="margin-left: 5px">{{ data.playcount }}</span>
        </span>
        <span class="item">
          <img src="@/assets/icon/dm.svg" alt="" />
          <span style="margin-left: 5px">{{ data.danma }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watchEffect, reactive } from "vue";
import { getVideoByVid } from "@/api/video";
import { useRouter } from "vue-router";
const router = useRouter();
const data = reactive({
  title: 0,
  description: "123",
  img: "三个版本出不来一个活着的L_1681559418017_thumbnail.png",
  playcount: 0,
  danma: 0,
});
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const baseUrl = "http://localhost:3000/videoImg/";
watchEffect(async () => {
  if (props.item.repost_video_id) {
    data.value = props.item;
    const res = await getVideoByVid(props.item.repost_video_id);
    data.title = res[0].title;
    data.description = res[0].description;
    data.img = res[0].img;
    data.playcount = res[0].playcount;
    data.danma = res[0].danmacount;
  }
});
const goto = () => {
  router.push({
    path: "/video",
    query: {
      vid: props.item.repost_video_id,
    },
  });
};
</script>

<style lang="scss" scoped>
.video-card-con {
  width: 100%;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 10px;
  cursor: pointer;
  display: flex;
  height: 129px;
  overflow: hidden;
  .left {
    width: 203px;
    height: 100%;
    flex-shrink: 0;
    .cover {
      height: 100%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .right {
    background-color: #242323;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding: 9px 12px 6px 16px;
    .title {
      -webkit-line-clamp: 2;
      color: #cecdcd;
      font-size: 14px;
    }
    .desc {
      -webkit-line-clamp: 2;
      color: #666;
      font-size: 12px;
      height: 38px;
      line-height: 19px;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .info {
      align-items: center;
      color: #999;
      display: flex;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      .item {
        align-items: center;
        display: flex;
        width: 72px;
        font-size: 12px;
      }
    }
  }
}
</style>
