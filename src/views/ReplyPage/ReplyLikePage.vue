<template>
  <div class="like-con">
    <div class="header">
      <div class="title">收到的赞</div>
    </div>
    <div class="main">
      <LikeCard v-for="item in data" :item="item"></LikeCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LikeCard from "@/components/ReplyPage/LikeCard.vue";
import { getNotice } from "@/api/notifications";
import { useUserStore } from "@/stores/user";
const data = ref([]);
const store = useUserStore();
onMounted(async () => {
  if (store.isLoggedIn) {
    data.value = await getNotice(store.id, "like");
  }
});
</script>

<style lang="scss" scoped>
.like-con {
  width: 100%;
  height: calc(100vh - 56px);
  padding: 20px;
  .header {
    .title {
      height: 42px;
      box-shadow: 0 2px 4px 0 rgba(38, 45, 56, 0.5);
      display: flex;
      align-items: center;
      padding-left: 5px;
    }
  }
}
</style>
