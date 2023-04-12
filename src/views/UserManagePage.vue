<template>
  <div class="upload-con">
    <SideBar></SideBar>
    <div class="right">
      <UploadVideo></UploadVideo>
      <UploadForm></UploadForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
import SideBar from "@/components/UserManage/SideBar.vue";
import UploadVideo from "@/components/UserManage/UploadVideo.vue";
import UploadForm from "@/components/UserManage/UploadForm.vue";
</script>

<style lang="scss" scoped>
.upload-con {
  padding-top: 20px;
  width: 100%;
  display: flex;
  .right {
    height: 100vh;
    display: flex;
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
}
</style>
