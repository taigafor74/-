<template>
  <div class="like-con">
    <div class="header">
      <div class="title">系统通知</div>
    </div>
    <div class="main">
      <SystemCard v-for="item in data" :item="item"></SystemCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import LikeCard from "@/components/ReplyPage/LikeCard.vue";
import { getNotice } from "@/api/notifications";
import { useUserStore } from "@/stores/user";
import { getUserExamines } from "@/api/examine";
import SystemCard from "@/components/ReplyPage/SystemCard.vue";
const data = ref([]);
const store = useUserStore();
onMounted(async () => {
  if (store.isLoggedIn) {
    data.value = await getUserExamines(store.id);
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
