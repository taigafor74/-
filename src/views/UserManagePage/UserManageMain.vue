<template>
  <div class="">
    <DataView></DataView>
    <CommentPreview :data="data"></CommentPreview>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import DataView from "@/components/UserManage/DataView.vue";
import { getUserVideoComment } from "@/api/comment";
import CommentPreview from "@/components/UserManage/CommentPreview.vue";
const data = ref([]);
const store = useUserStore();
onMounted(async () => {
  data.value = await getUserVideoComment(store.id);
});
</script>

<style lang="scss" scoped></style>
