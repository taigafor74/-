<template>
  <div class="con">
    <div class="main">
      是否展示我的投稿<el-switch v-model="value1" size="large" />
      是否展示我的收藏<el-switch v-model="value2" size="large" />
      是否展示我的动态<el-switch v-model="value3" size="large" />
      是否展示我的点赞<el-switch v-model="value4" size="large" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import { useRouter, useRoute } from "vue-router";
import { ref, onBeforeUnmount, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { edit } from "@/api/user";
const store = useUserStore();
const router = useRouter();
const route = useRoute();
const value1 = ref(true);
const value2 = ref(true);
const value3 = ref(true);
const value4 = ref(true);
const status = ref(false);
onMounted(() => {
  if (store.isLoggedIn) {
    if (store.id == route.params.id) {
      ElMessage.success("欢迎");
      status.value = true;
    } else {
      router.push(`/user/${store.id}/main`);
    }
  } else {
    router.push(`/main`);
  }
});
onBeforeUnmount(() => {
  const numValue1 = value1.value ? 1 : 0;
  const numValue2 = value2.value ? 1 : 0;
  const numValue3 = value3.value ? 1 : 0;
  const numValue4 = value4.value ? 1 : 0;
  const stringValue = `${numValue1}${numValue2}${numValue3}${numValue4}`;
  if (status.value) {
    edit(store.id, stringValue);
  }
});
</script>

<style lang="scss" scoped>
.con {
  width: 100%;
  height: 100%;
  .main {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .el-switch {
      margin-top: 20px;
    }
  }
}
</style>
