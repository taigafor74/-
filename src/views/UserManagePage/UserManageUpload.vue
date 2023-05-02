<template>
  <div class="">
    <UploadForm></UploadForm>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import UploadForm from "@/components/UserManage/UploadForm.vue";
import { useUserStore } from "@/stores/user";
import { useRoute, useRouter } from "vue-router";
const router = useRouter();
const route = useRoute();
const store = useUserStore();
onMounted(() => {
  if (store.isLoggedIn && store.id == route.params.id) {
    store.index = "3";
  } else {
  }
});
</script>

<style lang="scss" scoped></style>
