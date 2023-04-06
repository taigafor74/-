<template>
  <div class="video-title-con">
    <h1 class="title">
      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
    </h1>
    <div class="data-list">
      <span class="item">
        <img src="@/assets/icon/view.svg" alt="" />
        11.6万
      </span>
      <span class="item">
        <img src="@/assets/icon/dm.svg" alt="" />
        45
      </span>
      <span class="item">
        <img src="@/assets/icon/下载.svg" alt="" />
        2023-04-02 13:40:35
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
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
