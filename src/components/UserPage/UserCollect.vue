<template>
  <div class="user-collect-con">
    <div class="header">
      <p>收藏的视频</p>
    </div>
    <div class="stuff" v-if="isEmpty">暂无视频</div>
    <div class="video-part">
      <UserVideoCard v-for="item in data" :item="item"></UserVideoCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import UserVideoCard from "./UserVideoCard.vue";
import { userLike } from "@/api/like";
import { useRoute } from "vue-router";
import { getCollectionVideo } from "@/api/collect";
const route = useRoute();
const data = ref([]);
const isEmpty = ref(false);
onMounted(async () => {
  const allData = await getCollectionVideo(route.params.id);
  data.value = allData.slice(0, 10);
  if (data.value.length == 0) {
    isEmpty.value = true;
  }
});
</script>

<style lang="scss" scoped>
.user-collect-con {
  padding: 20px;
  background: black;
  border: 1px solid rgb(61, 2, 199);
  border-radius: 8.5px;
  margin-bottom: 17px;
  width: 100%;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    margin-bottom: 8px;
    p {
      color: #ffffff;
      font-size: 20px;
    }
  }
  .stuff {
    color: rgb(61, 2, 199);
    font-size: 20px;
    text-align: center;
    margin-top: 20px;
    width: 100%;
    align-items: center;
  }
  .video-part {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
