<template>
  <div class="video-item-con">
    <div class="left">
      <img src="@/assets/123.jpg" />
    </div>
    <div class="right">
      <div class="info">
        <h3>椎名林檎 Sheena Ringo - Behind the Scenes 90's</h3>
      </div>
      <div class="bottom">
        <div class="item">Bookko Expo'20</div>
        <div class="dot">·</div>
        <div class="item">观看次数:43万次</div>
        <div class="dot">·</div>
        <div class="item">6年前</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
</script>

<style lang="scss" scoped>
.video-item-con {
  &:hover {
    background: rgb(61, 61, 61);
  }
  padding: 8px;
  display: flex;
  border-radius: 12px;
  cursor: pointer;
  width: 100%;
  .left {
    width: 160px;
    height: 90px;
    margin-right: 8px;
    img {
      border-radius: 8px;
      width: 100%;
      height: 100%;
    }
  }
  .right {
    .info {
      h3 {
        font-size: 16px;
        font-weight: 500;
        color: #fff;
        margin-bottom: 8px;
      }
    }
    .bottom {
      margin-top: 15px;
      display: flex;
      width: 100%;
      .item {
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 12px;
        font-weight: 500;
        color: #cecccc;
      }
      .dot {
        display: inline-block;
        margin: 0 4px;
      }
    }
  }
}
</style>
