<template>
  <div class="user-page-container">
    <UserHeader :userInfo="userInfo" />
    <UserMenu :userInfo="userInfo" />
    <div class="user-page-mt"><RouterView></RouterView></div>
  </div>
</template>

<script setup lang="ts">
import UserHeader from "@/components/UserPage/UserHeader.vue";
import UserMenu from "@/components/UserPage/UserMenu.vue";
import { getUserInfo } from "@/api/user";
import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const userInfo = ref({});

onMounted(async () => {
  const data = await getUserInfo(route.params.id);
  userInfo.value = data;
  console.log(data);
});
</script>

<style lang="scss" scoped>
.user-page-container {
  margin: 0 auto;
  width: 75.161101vw;
  background-color: rgb(18, 18, 18);
  .user-page-mt {
    margin-top: 1vw;
  }
}
</style>
