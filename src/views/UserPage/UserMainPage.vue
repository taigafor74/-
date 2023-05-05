<template>
  <div class="user-main-page-container">
    <div class="test-main">
      <UserMainLeft v-if="isMe || componentVisible[0]" :data="data" />
      <UserLike v-if="isMe || componentVisible[1]" />
      <UserCollect v-if="isMe || componentVisible[3]" />
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
import { getInfo } from "@/api/user";
const store = useUserStore();
const route = useRoute();
const data = ref([]);
const isShowSideBar = ref(false);
const componentVisible = ref([false, false, false, false]);
const isMe = ref(false);

const getVideo = async () => {
  const res = await getVideoByUser(route.params.id);
  data.value = res.data;
};
const checkSideBar = () => {
  if (store.isLoggedIn) {
    if (store.id == route.params.id) {
      isMe.value = true;
      isShowSideBar.value = true;
    }
  } else {
    return;
  }
};
const setComponentVisibility = (edit) => {
  if (!isMe.value) {
    for (let i = 0; i < edit.length; i++) {
      componentVisible.value[i] = edit[i] === "1";
    }
  }
};
onMounted(async () => {
  getVideo();
  checkSideBar();
  const res = await getInfo(route.params.id);
  setComponentVisibility(res.data.edit);
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
