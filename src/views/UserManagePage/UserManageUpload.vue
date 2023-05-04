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
import { useManageStore } from "@/stores/manage";
const manageStore = useManageStore();
const router = useRouter();
const route = useRoute();
const store = useUserStore();
onMounted(() => {
  manageStore.index = "3";
});
</script>

<style lang="scss" scoped></style>
