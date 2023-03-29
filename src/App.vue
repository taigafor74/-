<template>
  <div class="app-container"><HomeView></HomeView></div>
</template>

<script setup lang="ts">
import HomeView from "./views/HomeView.vue";
</script>

<style lang="scss" scoped>
.app-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
