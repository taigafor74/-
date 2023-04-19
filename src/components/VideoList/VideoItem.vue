<template>
  <div class="video-item-con" @click="gotoVideo">
    <div class="left">
      <img :src="imgPath" />
    </div>
    <div class="right">
      <div class="info">
        <h3>{{ title }}</h3>
      </div>
      <div class="bottom">
        <div class="item">{{ uname }}</div>
        <div class="dot">·</div>
        <div class="item">观看次数:{{ playCount }}</div>
        <div class="dot">·</div>
        <div class="item">{{ time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { defineProps, onMounted, ref, watchEffect, computed } from "vue";
import { useMainStore } from "@/stores/main";
import { timeAgo } from "@/utils/getTime";
const mainStore = useMainStore();
const imgPath = ref("");
const title = ref("");
const time = ref("");
const author = ref("");
const playCount = ref("0");
const uname = ref("??？");
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
onMounted(() => {
  watchEffect(() => {
    if (props.item.title && props.item.img) {
      title.value = props.item.title;
      imgPath.value = `http://localhost:3000/videoImg/${props.item.img}`;
      time.value = timeAgo(props.item.upload_date);
      playCount.value = formatPlayCount(props.item.playcount);
      uname.value = props.item.uname;
    }
  });
});
function formatPlayCount(playCount) {
  if (playCount < 10000) {
    return `${playCount}次`;
  } else if (playCount >= 10000 && playCount < 1000000) {
    return `${(playCount / 10000).toFixed(1)}万次`;
  }
}

const router = useRouter();
function gotoVideo() {
  router.push({
    name: "video",
    path: "/video",
    query: {
      vid: props.item.vid,
    },
  });
}
</script>

<style lang="scss" scoped>
.video-item-con {
  &:hover {
    background: rgb(61, 61, 61);
  }
  padding: 8px;
  display: flex;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  .left {
    width: 160px;
    height: 90px;
    margin-right: 8px;
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }
  .right {
    .info {
      h3 {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        margin-bottom: 8px;
      }
    }
    .bottom {
      margin-top: 15px;
      display: flex;
      width: 100%;
      .item {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        font-weight: 500;
        color: #cecccc;
      }
      .dot {
        display: inline-block;
        margin: 0 4px;
      }
    }
  }
}
</style>
