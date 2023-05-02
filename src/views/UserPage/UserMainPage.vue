<template>
  <div class="user-main-page-container">
    <div class="test-main">
      <UserMainLeft :data="data" />
      <UserLike />
      <UserCollect />
    </div>
    <div class="sidebar" v-if="isShowSideBar">
      <UserSideBar />
    </div>
  </div>
</template>

<script setup lang="ts">
import UserSideBar from "@/components/UserPage/UserSideBar.vue";
import UserMainLeft from "@/components/UserPage/UserMainLeft.vue";
import UserLike from "@/components/UserPage/UserLike.vue";
import UserCollect from "@/components/UserPage/UserCollect.vue";
import { getVideoByUser } from "@/api/video";
import { useRoute } from "vue-router";
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
const store = useUserStore();
const route = useRoute();
const data = ref([]);
const isShowSideBar = ref(false);
const getVideo = async () => {
  const res = await getVideoByUser(route.params.id);
  data.value = res.data;
};
const checkSideBar = () => {
  if (store.isLoggedIn) {
    if (store.id == route.params.id) {
      isShowSideBar.value = true;
    }
  } else {
    return;
  }
};
onMounted(() => {
  getVideo();
  checkSideBar();
});
</script>

<style lang="scss" scoped>
.user-main-page-container {
  width: 100%;
  display: flex;
  //以下的为测试代码
  .test-main {
    flex: 1;
    background-color: rgb(18, 18, 18);
  }
  .sidebar {
    padding-left: 20px;
  }
}
</style>
