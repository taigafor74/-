<template>
  <div class="video-card-con">
    <div class="left">
      <div class="cover">
        <img src="@/assets/11123.jpg" />
      </div>
    </div>
    <div class="right">
      <div class="title">这是一个视频</div>
      <div class="desc">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad aliquid,
        minus suscipit quibusdam beatae recusandae sapiente dolorem voluptates
        nemo repellendus autem id reiciendis repellat consequatur nulla
        doloremque saepe necessitatibus sunt.
      </div>
      <div class="info">
        <div class="item">2340</div>
        <div class="item">6</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
</script>

<style lang="scss" scoped>
.video-card-con {
  width: 100%;
  border: 1px solid #2d2d2d;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  height: 129px;
  overflow: hidden;
  .left {
    width: 203px;
    height: 100%;
    flex-shrink: 0;
    .cover {
      height: 100%;
      width: 100%;
      img {
        height: 100%;
        width: 100%;
        object-fit: cover;
      }
    }
  }
  .right {
    background-color: #242323;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;
    padding: 9px 12px 6px 16px;
    .title {
      -webkit-line-clamp: 2;
      color: #cecdcd;
      font-size: 14px;
    }
    .desc {
      -webkit-line-clamp: 2;
      color: #666;
      font-size: 12px;
      height: 38px;
      line-height: 19px;
      -webkit-box-orient: vertical;
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
    }
    .info {
      align-items: center;
      color: #999;
      display: flex;
      font-size: 12px;
      height: 18px;
      line-height: 18px;
      .item {
        align-items: center;
        display: flex;
        width: 72px;
        font-size: 12px;
      }
    }
  }
}
</style>
