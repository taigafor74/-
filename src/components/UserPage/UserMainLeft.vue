<template>
  <div class="user-main-left-container">
    <div class="head">
      <p>我的视频</p>
      <div class="head-tab">
        <div>最新发布</div>
        <div>最多播放</div>
        <div>最多收藏</div>
      </div>
      <div class="btn">
        <button>更多></button>
      </div>
    </div>
    <div class="main">
      <UserVideoCard v-for="item in 5"></UserVideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserVideoCard from "@/components/UserPage/UserVideoCard.vue";
</script>

<style lang="scss" scoped>
.user-main-left-container {
  width: 100%;
  padding: 1.171646vw;
  background-color: #000000;
  border: 0.058582vw solid rgb(61, 2, 199);
  border-radius: 0.492912vw;
  .head {
    width: 100%;
    height: 1.640305vw;
    padding: 0 0.585823vw;
    background-color: #000000;
    display: flex;
    align-items: center;
    p {
      color: #ffffff;
      font-size: 1.171646vw;
    }
    .head-tab {
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
    .btn {
      flex: 1;
      display: flex;
      justify-content: end;
      button {
        border-radius: 0.217165vw;
        width: 3.514938vw;
        height: 1.757469vw;
        background: black;
        border: 0.058582vw solid rgb(61, 2, 199);
        color: #dad6d6;
        cursor: pointer;
        &:hover {
          background: #282828;
        }
      }
    }
  }
  .main {
    width: 100%;
    padding-top: 1.757469vw;
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
  }
}
</style>
