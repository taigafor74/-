<template>
  <div class="video-title-con">
    <h1 class="title">
      {{ props.data.title }}
    </h1>
    <div class="data-list">
      <span class="item">
        <img src="@/assets/icon/view.svg" alt="" />
        {{ formatPlayCount(props.data.playcount) }}
      </span>
      <span class="item">
        <img src="@/assets/icon/dm.svg" alt="" />
        {{ props.data.danmacount }}
      </span>
      <span class="item">
        <img src="@/assets/icon/下载.svg" alt="" />
        {{ props.data.upload_date }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watchEffect, onMounted, ref } from "vue";
const data = ref([]);
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
onMounted(() => {
  watchEffect(() => {
    data.value = props.data;
  });
});
function formatPlayCount(playCount) {
  if (playCount < 10000) {
    return `${playCount}次`;
  } else if (playCount >= 10000 && playCount < 1000000) {
    return `${(playCount / 10000).toFixed(1)}万次`;
  }
}
</script>

<style lang="scss" scoped>
.video-title-con {
  height: 108px;
  padding-top: 22px;
  .title {
    font-size: 22px;
    line-height: 34px;
    font-weight: 500;
    margin-bottom: 6px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .data-list {
    color: rgb(190, 187, 187);
    font-size: 14px;
    line-height: 20px;
    display: flex;
    align-items: center;
    height: 24px;
    span {
      display: inline-flex;
      align-items: center;
      overflow: hidden;
      flex-shrink: 0;
      margin-right: 12px;
      img {
        margin-right: 4px;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
