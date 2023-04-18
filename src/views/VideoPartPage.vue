<template>
  <div class="hotbar"></div>
  <div class="main-con">
    <div class="top-select-card">
      <div class="top-select-card-left message">
        <img src="@/assets/icon/动态.png" />动态
      </div>
      <div class="top-select-card-left hot">
        <img src="@/assets/icon/热门.png" />热门
      </div>
      <div class="top-select-card-left channel">
        <img src="@/assets/icon/融合频道.png" />频道
      </div>
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
        <el-carousel-item v-for="item in 6" :key="item">
          <h3 text="2xl" justify="center">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="video-part">
      <VideoCard v-for="item in data" :key="item.id" :item="item"></VideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import VideoCard from "@/components/mainPage/VideoCard.vue";
const router = useRouter();
const route = useRoute();
const name = ref("");
name.value = btnName[route.query.query];
import { getVideoList } from "@/api/mainPage";
const data = ref([]);
onMounted(async () => {
  data.value = await getVideoList();
});
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
const goto = (query) => {
  router.push({
    path: `/v/${query}`,
    query: {
      query,
    },
  });
  updateName(query);
};
const updateName = (query) => {
  name.value = btnName[query];
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
    z-index: 99;
    width: 100%;
    padding: 0.820152vw 0.76397vw;
    font-size: 0.820152vw;
    position: fixed;
    background: #0f0f0f;
    .top-select-card-left {
      cursor: pointer;
      display: flex;
      width: 4.686585vw;
      height: 1.640305vw;
      margin-bottom: 0.220152vw;
      letter-spacing: 0.117165vw;
      align-items: center;
      img {
        width: 1.288811vw;
        height: 1.288811vw;
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
        width: 4.171646vw;
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
  }
  .video-part {
    margin-top: 20px;
    overflow-y: auto;
    padding: 5px;
    padding-bottom: 17px;
    flex-wrap: wrap;
    display: flex;
    justify-content: space-around;
  }
}
</style>
