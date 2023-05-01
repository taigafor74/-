<template>
  <div class="user-con">
    <div class="user">
      <UserListCard v-for="item in pagedVideos" :key="item.id" :item="item" />
    </div>
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[4, 8, 16, 32]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="users.length"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps, watchEffect } from "vue";
import UserListCard from "@/components/UserPage/UserListCard.vue";
const data = ref(null);
const users = ref([]);
const currentPage = ref(1);
const pageSize = ref(16);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const props = defineProps({
  data: {
    type: Object,
    default: () => {},
  },
});

watchEffect(() => {
  if (props.data) {
    users.value = props.data.users;
    console.log(users.value);
  }
});
const pagedVideos = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return users.value.slice(startIndex, endIndex);
});
</script>

<style lang="scss" scoped>
.user {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 10px;
}
</style>
