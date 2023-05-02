<template>
  <div class="">
    <div>
      <div>
        <VideoItemCard v-for="item in data" :key="item.vid" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getVideoAllByUser } from "@/api/video";
import { useUserStore } from "@/stores/user";
import VideoItemCard from "@/components/UserManage/VideoItemCard.vue";
const store = useUserStore();
const data = ref([]);
onMounted(async () => {
  const res = await getVideoAllByUser(store.id);
  data.value = res.data;
  console.log(data.value);
});
</script>

<style lang="scss" scoped></style>
