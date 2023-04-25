<template>
  <div class="reply-con">
    <div class="main-con">
      <div class="side-bar">
        <SideBar />
      </div>
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import SideBar from "@/components/ReplyPage/SideBar.vue";
</script>

<style lang="scss" scoped>
.reply-con {
  width: 100%;
  display: flex;
  .main-con {
    width: 100%;
    display: flex;
    .side-bar {
      margin-left: 240px;
    }
  }
}
</style>
