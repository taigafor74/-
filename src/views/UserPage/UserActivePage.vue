<template>
  <div class="useractive-con">
    <div style="flex: 1">
      <ActiveCard v-for="item in activeList" :item="item"></ActiveCard>
      <div class="no" v-if="isEmpty">
        <div class="left">
          <div>暂无动态</div>
          <div>发个动态吧</div>
        </div>
        <div class="right">
          <img src="@/assets/icon/紫箭头.png" />
        </div>
      </div>
    </div>
    <div style="padding-left: 20px"><UserSideBar /></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getActiveByUserId } from "@/api/active";
import ActiveCard from "@/components/ActivePage/ActiveCard.vue";
import { useRoute } from "vue-router";
import UserSideBar from "@/components/UserPage/UserSideBar.vue";
const activeList = ref([]);
const route = useRoute();
const isEmpty = ref(false);
onMounted(async () => {
  const res = await getActiveByUserId(route.params.id);
  activeList.value = res;
  if (res.length == 0) {
    isEmpty.value = true;
  }
});
</script>

<style lang="scss" scoped>
.useractive-con {
  display: flex;
  width: 100%;
}
.no {
  width: 100%;
  height: 512px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  color: #3d02c7;
  .left {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
