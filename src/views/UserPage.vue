<template>
  <div class="user-page-container">
    <UserHeader />
    <UserMenu />
  </div>
</template>

<script setup lang="ts">
import UserHeader from "@/components/UserPage/UserHeader.vue";
import UserMenu from "@/components/UserPage/UserMenu.vue";
</script>

<style lang="scss" scoped>
.user-page-container {
  margin: 0 auto;
  width: 75.161101vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
}
</style>
