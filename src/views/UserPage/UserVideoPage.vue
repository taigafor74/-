<template>
  <div class="user-video-container">
    <div class="user-video-head">
      <p>我的视频</p>
      <div class="user-video-head-tab">
        <div>最新发布</div>
        <div>最多播放</div>
        <div>最多收藏</div>
      </div>
    </div>
    <div class="stuff" v-if="isEmpty">暂无视频</div>
    <div class="user-video-main">
      <UserVideoCard v-for="item in data" :item="item"></UserVideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserVideoCard from "@/components/UserPage/UserVideoCard.vue";
import { useRouter } from "vue-router";
import { getVideoAllByUser } from "@/api/video";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
const isEmpty = ref(false);
const route = useRoute();
const data = ref([]);
const getVideo = async () => {
  const res = await getVideoAllByUser(route.params.id);
  data.value = res.data;
  if (data.value.length == 0) {
    isEmpty.value = true;
  }
};
onMounted(() => {
  getVideo();
});
</script>

<style lang="scss" scoped>
.user-video-container {
  width: 100%;
  padding: 1.171646vw;
  background-color: #0f0f0f;
  border: 0.058582vw solid rgb(61, 2, 199);
  border-radius: 0.492912vw;
  .stuff {
    color: rgb(61, 2, 199);
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    width: 100%;
    align-items: center;
  }
  .user-video-head {
    width: 100%;
    height: 1.640305vw;
    padding-left: 0.585823vw;
    background-color: #0f0f0f;
    display: flex;
    align-items: center;
    p {
      color: #ffffff;
      font-size: 1.171646vw;
    }
    .user-video-head-tab {
      display: flex;
      align-items: center;
      div {
        margin-left: 1.31646vw;
        color: #dad6d6;
        font-size: 0.702988vw;
        cursor: pointer;
        &:hover {
          color: #ffffff;
        }
      }
    }
  }
  .user-video-main {
    width: 100%;
    padding-top: 1.757469vw;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
