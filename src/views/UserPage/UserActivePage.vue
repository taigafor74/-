<template>
  <div class="useractive-con">
    <div style="flex: 1">
      <ActiveCard v-for="item in activeList" :item="item"></ActiveCard>
    </div>
    <div style="width: 350px; padding-left: 20px"><UserInfo /></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getActiveByUserId } from "@/api/active";
import ActiveCard from "@/components/ActivePage/ActiveCard.vue";
import { useRoute } from "vue-router";
import UserInfo from "@/components/UserPage/UserInfo.vue";
const activeList = ref([]);
const route = useRoute();
onMounted(async () => {
  const res = await getActiveByUserId(route.params.id);
  activeList.value = res;
  console.log(res);
});
</script>

<style lang="scss" scoped>
.useractive-con {
  display: flex;
}
</style>
