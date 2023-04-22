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
      <UserVideoCard v-for="item in data" :item="item"></UserVideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import UserVideoCard from "@/components/UserPage/UserVideoCard.vue";
import { useRouter } from "vue-router";
import UserLike from "./UserLike.vue";
import { onMounted, ref, defineProps, watchEffect } from "vue";
const data = ref([]);
const props = defineProps({
  data: Array,
});
watchEffect(() => {
  data.value = props.data;
});
</script>

<style lang="scss" scoped>
.user-main-left-container {
  width: 100%;
  padding: 20px;
  background-color: #000000;
  border: 1px solid rgb(61, 2, 199);
  border-radius: 8.5px;
  margin-bottom: 17px;
  .head {
    width: 100%;
    height: 28px;
    padding: 0 10px;
    background-color: #000000;
    display: flex;
    align-items: center;
    p {
      color: #ffffff;
      font-size: 20px;
    }
    .head-tab {
      display: flex;
      align-items: center;

      div {
        margin-left: 22px;
        color: #dad6d6;
        font-size: 12px;
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
        border-radius: 3.7px;
        width: 60px;
        height: 30px;
        background: black;
        border: 1px solid rgb(61, 2, 199);
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
    padding-top: 30px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
