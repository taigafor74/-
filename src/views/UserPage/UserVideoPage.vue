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
    <div class="user-video-main">
      <UserVideoCard v-for="item in 20"></UserVideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserVideoCard from "@/components/UserPage/UserVideoCard.vue";
</script>

<style lang="scss" scoped>
.user-video-container {
  width: 100%;
  padding: 1.171646vw;
  background-color: #000000;
  border: 0.058582vw solid rgb(61, 2, 199);
  border-radius: 0.492912vw;
  .user-video-head {
    width: 100%;
    height: 1.640305vw;
    padding-left: 0.585823vw;
    background-color: #000000;
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
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
}
</style>
