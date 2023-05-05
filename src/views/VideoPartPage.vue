<template>
  <div class="hotbar"></div>
  <div class="main-con">
    <div class="top-select-card">
      <div class="top-select-card-middle"></div>
      <div class="top-select-card-right">
        <button v-for="item in btnArr" @click="goto(item.query)">
          {{ item.name }}
        </button>
      </div>
    </div>
    <div class="swiper">
      <h1>{{ name }}</h1>
      <el-carousel :interval="4000" type="card" height="270px">
        <el-carousel-item
          v-for="item in hotSwiper"
          :key="item.vid"
          @click="gotoVideo(item.vid)"
        >
          <img :src="baseUrl + item.img" />
          <span class="swiper-title">{{ item.title }}</span>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="video-part">
      <VideoCard v-for="item in data" :key="item.vid" :item="item"></VideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watchEffect } from "vue";
import { useRouter, useRoute } from "vue-router";
import VideoCard from "@/components/mainPage/VideoCard.vue";
const router = useRouter();
const route = useRoute();
const name = ref("");
name.value = btnName[route.query.query];
import { getVideoList } from "@/api/mainPage";
import { getVideoByArea, getHot } from "@/api/video";
const hotSwiper = ref([]);
const baseUrl = "http://localhost:3000/videoImg/";
enum btnName {
  game = "游戏",
  music = "音乐",
  tech = "科技",
  life = "生活",
  animation = "番剧",
  fashion = "时尚",
  entertainment = "娱乐",
  paint = "绘画",
}
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
const data = ref([]);
onMounted(async () => {
  const result = btnArr.find((item) => item.query == route.query.query);
  const hot = await getHot(result.name);
  hotSwiper.value = hot;
  console.log(hotSwiper.value);

  data.value = await getVideoByArea(result.name);
});
watchEffect(async () => {
  if (route.query.query) {
    const result = btnArr.find((item) => item.query == route.query.query);
    name.value = btnName[route.query.query];
    data.value = await getVideoByArea(result.name);
    const hot = await getHot(result.name);
    hotSwiper.value = hot;
  }
});
const gotoVideo = (vid) => {
  router.push({
    path: `/video`,
    query: {
      vid,
    },
  });
};
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
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.hotbar {
  width: 240px;
  position: fixed;
  height: 100vh;
  border-right: 1px solid white;
}
.main-con {
  margin-left: 240px;
  .top-select-card {
    display: flex;
    z-index: 9;
    width: 100%;
    padding: 14px 13px;
    font-size: 0.820152vw;
    position: fixed;
    background: #0f0f0f;
    .top-select-card-left {
      cursor: pointer;
      display: flex;
      width: 80px;
      height: 28px;
      margin-bottom: 3.6px;
      letter-spacing: 0.117165vw;
      align-items: center;
      img {
        width: 22px;
        height: 22px;
        margin-right: 0.292912vw;
      }
    }
    .top-select-card-middle {
      width: 1px;
      height: 0.820152vw;
      margin-right: 0.585823vw;
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
  .swiper {
    padding: 0 15px;
    h1 {
      font-size: 32px;
      margin-bottom: 10px;
      color: blueviolet;
    }
    margin-top: 64px;
    position: relative;
    grid-column: 1 / span 2;
    grid-row: 1 / span 2;
    cursor: pointer;
    padding: 0 15px;
    margin-top: 64px;
    .swiper-title {
      position: absolute;
      font-size: 30px;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      color: rgb(255, 0, 0);
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .video-part {
    margin-top: 20px;
    overflow-y: auto;
    padding: 5px;
    padding-bottom: 17px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
