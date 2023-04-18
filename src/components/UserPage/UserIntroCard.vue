<template>
  <el-card class="box-card">
    <div class="card-con">
      <span>
        <img src="@/assets/test_avatar.jpg" />
      </span>
      <div class="right">
        <div class="name">一只生煎馒头</div>
        <div class="data">
          <span>关注 2341</span>
          <span>粉丝 1231</span>
        </div>
        <div class="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </div>
        <div class="btn">
          <el-button size="small">发消息</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import {} from "vue";
</script>

<style lang="scss" scoped>
.card-con {
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    cursor: pointer;
  }
  .right {
    margin-left: 20px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;
    .name {
      &:hover {
        color: rgb(165, 13, 196);
      }
      cursor: pointer;
      font-size: 16px;
      line-height: 19px;
      height: 20px;
      margin-bottom: 5px;
      display: inline-block;
      max-width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .data {
      display: flex;
      margin-bottom: 5px;
      span {
        margin-right: 10px;
      }
    }
    .desc {
      line-height: 14px;
      font-size: 12px;
      color: #6d757a;
      max-width: 240px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 10px;
    }
  }
}
.box-card {
  width: 400px;
  font-family: "zpix";
}
</style>
