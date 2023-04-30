<template>
  <!-- <SideBar></SideBar> -->
  <div class="mainpage-container">
    <div class="top-select-card">
      <div class="top-select-card-left message">
        <img src="@/assets/icon/动态.png" />动态
      </div>
      <div class="top-select-card-left hot">
        <img src="@/assets/icon/热门.png" />热门
      </div>
      <!-- <div class="top-select-card-left channel">
        <img src="@/assets/icon/融合频道.png" />频道
      </div> -->
      <div class="top-select-card-middle"></div>
      <div class="top-select-card-right">
        <button v-for="item in btnArr" @click="goto(item.query)">
          {{ item.name }}
        </button>
      </div>
    </div>
    <div class="video-part">
      <div class="swiper">
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in swiper" :key="item">
            <img :src="item.img" />
            <div class="swiper-title">{{ item.title }}</div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <VideoCard v-for="item in data" :key="item.id" :item="item"></VideoCard>
      <div
        class="skeleton-video-card"
        v-if="!dataLoaded && !noMoreData"
        v-for="item in skeletonCount"
      >
        <el-skeleton animated>
          <template #template>
            <div class="img-box">
              <el-skeleton-item
                element="img"
                variant="rect"
                style="width: 100%; height: 190px"
              ></el-skeleton-item>
            </div>
            <div class="video-intro">
              <div class="video-intro-avatar">
                <el-skeleton-item
                  element="img"
                  variant="circle"
                  style="width: 34px; height: 34px"
                ></el-skeleton-item>
              </div>
              <div class="video-intro-text">
                <div class="video-intro-text-title">
                  <el-skeleton-item
                    element="h3"
                    variant="text"
                    style="
                      width: 100%;
                      height: 16px;
                      margin-bottom: 8px;
                      margin-top: 16px;
                    "
                  ></el-skeleton-item>
                  <el-skeleton-item
                    element="h3"
                    variant="text"
                    style="width: 100%; height: 16px"
                  ></el-skeleton-item>
                </div>
                <div class="video-intro-text-info">
                  <el-skeleton-item
                    element="div"
                    variant="text"
                    style="width: 60%; height: 12px; margin-bottom: 4px"
                  ></el-skeleton-item>
                </div>
              </div>
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
import SideBar from "@/components/mainPage/SideBar.vue";
import VideoCard from "@/components/mainPage/VideoCard.vue";
import { getVideoList } from "@/api/mainPage";
import { useMainStore } from "@/stores/main";
import {
  ref,
  watch,
  onMounted,
  reactive,
  watchEffect,
  onUnmounted,
  computed,
} from "vue";
const store = useMainStore();
const router = useRouter();
const route = useRoute();
const data = ref([]);
const swiper = ref([]);
const noMoreData = ref(false);
const dataLoaded = computed(() => {
  return store.dataLoaded;
});
const displayedVideos = ref([]);
let currentPage = 1;
const loadCount = 20;
const skeletonCount = ref(loadCount);

async function loadVideos() {
  const videos = await getVideoList(currentPage, loadCount);
  store.hideSkeleton();
  data.value.push(...videos);
  // swiper.value.push(...videos.splice(10, 5));
  // swiper.value.forEach((item) => {
  //   item.img = `http://localhost:3000/videoImg/${item.img}`;
  // });

  currentPage++;
  if (videos.length < loadCount) {
    noMoreData.value = true;
  }
}
function handleScroll() {
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight || document.body.scrollHeight;
  const clientHeight =
    document.documentElement.clientHeight || document.body.clientHeight;

  if (scrollTop + clientHeight >= scrollHeight) {
    store.showSkeleton();
    loadVideos();
  }
}
onMounted(() => {
  loadVideos();
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
const btnArr = [
  { name: "游戏", query: "game" },
  { name: "音乐", query: "music" },
  { name: "科技", query: "tech" },
  { name: "生活", query: "life" },
  { name: "番剧", query: "animation" },
  { name: "时尚", query: "fashion" },
  { name: "娱乐", query: "entertainment" },
  { name: "绘画", query: "paint" },
];
const goto = (query) => {
  router.push({
    path: `/v/${query}`,
    query: {
      query,
    },
  });
};
</script>

<style lang="scss" scoped>
.skeleton-video-card {
  width: 340px;
  height: 290px;
  margin: 0 8px 10px 8px;

  .img-box {
    width: 100%;
    display: flex;
    height: 190px;
    border-radius: 15px;
    overflow: hidden;
  }

  .video-intro {
    width: 100%;
    height: auto;
    display: flex;

    .video-intro-avatar {
      width: 2.108963vw;
      margin-top: 0.702988vw;
      margin-right: 0.702988vw;
    }

    .video-intro-text {
      width: 100%;
      h3 {
        margin: 0.702988vw 0 0.234329vw 0;
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

.mainpage-container {
  margin-left: 14.059754vw;
  .top-select-card {
    display: flex;
    width: 100%;
    padding: 14px 13px;
    font-size: 14px;
    position: fixed;
    background: #0f0f0f;
    .top-select-card-left {
      cursor: pointer;
      display: flex;
      width: 80px;
      height: 28px;
      margin-bottom: 3.75[x];
      letter-spacing: 2px;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        margin-right: 5px;
      }
    }
    .top-select-card-middle {
      width: 1px;
      height: 14px;
      margin-right: 10px;
    }
    .top-select-card-right {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      button {
        color: white;
        background: #0f0f0f;
        width: 72px;
        text-align: center;
        border: 0.058582vw solid white;
        font-size: 1.037317vw;
        border-radius: 0.275747vw;
        text-align: center;
        margin-right: 0.492912vw;
        cursor: pointer;
        transition: 0.3s background-color;
        &:hover {
          background-color: rgb(56, 56, 56);
        }
      }
    }
  }
  .video-part {
    margin-top: 62px;
    overflow-y: auto;
    padding: 0.292912vw;
    padding-bottom: 1vw;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    .swiper {
      position: relative;
      grid-column: 1 / span 2;
      .swiper-title {
        position: absolute;
        bottom: 0;
        color: purple;
      }
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }
}
</style>
