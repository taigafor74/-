<template>
  <div class="video-card-container">
    <div class="video-card" @click="gotoVideo(item.vid)">
      <div class="img-box">
        <img :src="imgPath" alt="video-img" />
      </div>
      <div class="video-intro">
        <div class="video-intro-avatar">
          <img :src="avatar" alt="" />
        </div>
        <div class="video-intro-text">
          <div class="video-intro-text-title">
            <h3>{{ title }}</h3>
          </div>
          <div class="video-intro-text-info">
            <div>{{ uname }}</div>
            <div>觀看次數：{{ playCount }} {{ time }}</div>
          </div>
        </div>
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
const uname = ref("???");
const avatar = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
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
      avatar.value = `http://localhost:3000/avatar/${props.item.avatar}`;
      uname.value = props.item.uname;
      time.value = timeAgo(props.item.upload_date);
      playCount.value = formatPlayCount(props.item.playcount);
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
function gotoVideo(path) {
  router.push({
    name: "video",
    path: "/video",
    query: {
      vid: path,
    },
  });
}
</script>

<style lang="scss" scoped>
.video-card-container {
  width: 340px;
  height: 290px;
  margin: 0 0.468658vw 10px 0.468658vw;
  .video-card {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    .img-box {
      width: 100%;
      display: flex;
      height: 190px;
      border-radius: 0.871646vw;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .video-intro {
      width: 100%;
      height: auto;
      // height: 5.75823vw;
      display: flex;
      .video-intro-avatar {
        width: 36px;
        height: 36px;
        margin-top: 0.702988vw;
        margin-right: 0.702988vw;

        img {
          width: 36px;
          height: 36px;
          object-fit: cover;
          // height: 100%;
          border-radius: 50%;
        }
      }
      .video-intro-text {
        h3 {
          margin: 0.702988vw 0 0.234329vw 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.99054482vw;
        }
        .video-intro-text-info {
          color: #aaaaaa;
          display: flex;
          line-height: 1.185823vw;
          font-size: 0.820152vw;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
