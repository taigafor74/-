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
    <div class="video-part">
      <VideoCard v-for="item in data" :key="item.id" :item="item"></VideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, reactive } from "vue";
import { getVideoList } from "@/api/mainPage";
import { useRouter, useRoute } from "vue-router";
import SideBar from "@/components/mainPage/SideBar.vue";
import VideoCard from "@/components/mainPage/VideoCard.vue";
const router = useRouter();
const route = useRoute();
const data = ref([]);
onMounted(async () => {
  data.value = await getVideoList();
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
.mainpage-container {
  margin-left: 14.059754vw;
  .top-select-card {
    display: flex;
    width: 100%;
    padding: 0.820152vw 0.76397vw;
    font-size: 0.820152vw;
    position: fixed;
    background: black;
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
        background: black;
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
  .video-part {
    margin-top: 3.686585vw;
    overflow-y: auto;
    padding: 0.292912vw;
    padding-bottom: 1vw;
    display: grid;
    grid-column-gap: 50px;
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
