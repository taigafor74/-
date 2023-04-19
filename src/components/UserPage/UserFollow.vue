<template>
  <div class="">
    <UserListCard v-for="item in follows" :item="item"></UserListCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserListCard from "./UserListCard.vue";
import { getFollows } from "@/api/follow";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const route = useRoute();
const follows = ref([]);
async function getData() {
  const res = await getFollows(route.params.id);
  follows.value = res;
}
getData();
</script>

<style lang="scss" scoped></style>
