<template>
  <div class="sidebar-container">
    <div class="sidebar-list-card" v-for="item in 8">
      <div class="sidebar-list-item">
        <div class="sidebar-list-item-img-box">
          <img src="@/assets/icon/融合频道.png" />
        </div>
        <div class="sidebar-list-item-intro">首页</div>
      </div>
      <div class="sidebar-list-item">
        <div class="sidebar-list-item-img-box">
          <img src="@/assets/icon/融合频道.png" />
        </div>
        <div class="sidebar-list-item-intro">首页</div>
      </div>
      <div class="sidebar-list-item">
        <div class="sidebar-list-item-img-box">
          <img src="@/assets/icon/融合频道.png" />
        </div>
        <div class="sidebar-list-item-intro">首页</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.sidebar-container {
  position: fixed;
  width: 14.059754vw;
  height: calc(100vh - 3.280609vw);
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0;
  }
  &:hover::-webkit-scrollbar {
    width: 0.585823vw;
  }

  .sidebar-list-card {
    border-bottom: 0.058582vw solid rgb(75, 75, 75);
    padding: 0.702988vw;
    width: calc((14.059754vw) - 0.585823vw);
    background-color: #000000;
    margin-bottom: 1.171646vw;
    .sidebar-list-item {
      display: flex;
      align-items: center;
      width: 100%;
      height: 2.443292vw;
      background-color: #000000;
      margin-bottom: 0.585823vw;
      padding: 0.702988vw;
      border-radius: 0.615823vw;
      cursor: pointer;
      &:hover {
        background-color: #363636;
      }
      .sidebar-list-item-img-box {
        width: 1.405975vw;
        height: 1.405975vw;
        margin-right: 1.405975vw;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sidebar-list-item-intro {
        font-size: 0.877914vw;
      }
    }
  }
}
</style>
