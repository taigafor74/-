<template>
  <div class="">
    <UserListCard v-for="item in fans" :item="item"></UserListCard>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserListCard from "./UserListCard.vue";
import { getFans } from "@/api/follow";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const route = useRoute();
const fans = ref([]);
async function getData() {
  const res = await getFans(route.params.id);
  fans.value = res;
}
getData();
</script>

<style lang="scss" scoped></style>
