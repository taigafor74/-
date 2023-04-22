<template>
  <div class="user-like-con">
    <div class="header">
      <p>最近点赞的视频</p>
    </div>
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
const route = useRoute();
const data = ref([]);
onMounted(async () => {
  data.value = await userLike(route.params.id);
});
</script>

<style lang="scss" scoped>
.user-like-con {
  padding: 20px;
  background: black;
  border: 1px solid rgb(61, 2, 199);
  border-radius: 8.5px;
  margin-bottom: 17px;
  width: 100%;
  .header {
    padding-left: 10px;
    margin-bottom: 8px;
    p {
      color: #ffffff;
      font-size: 20px;
    }
  }
  .video-part {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
  }
}
</style>
