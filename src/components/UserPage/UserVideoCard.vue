<template>
  <div class="user-video-card-container">
    <div class="img-box">
      <img src="@/assets/test.jpg" alt="video-img" />
    </div>
    <div class="user-video-card-title" ref="title">
      マイクを食べる！マウスサウンドオンリー音圧強め【音フェチ】
    </div>
    <div class="user-video-card-info" ref="info">
      <div>觀看次數：43萬次</div>
      <div>11 個月前</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const title = ref(null);
const info = ref(null);
onMounted(() => {
  if (title.value && info.value) {
    if (route.path == "/user/main") {
      let titleValue = title.value as HTMLElement;
      let infoValue = info.value as HTMLElement;
      titleValue.style.fontSize = "0.5vw";
      infoValue.style.fontSize = "0.5vw";
    }
  }
});
</script>

<style lang="scss" scoped>
.user-video-card-container {
  cursor: pointer;
  width: 20%;
  padding: 0.585823vw;
  margin-right: 0 0 0.175747vw;
  .img-box {
    width: 100%;
    img {
      border-radius: 0.292912vw;
      width: 100%;
    }
  }
  .user-video-card-title {
    margin-top: 0.351494vw;
    font-size: 0.782988vw;
  }
  .user-video-card-info {
    font-size: 0.828735vw;
    margin-top: 0.702988vw;
    display: flex;
    justify-content: space-between;
  }
}
</style>
