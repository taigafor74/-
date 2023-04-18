<template>
  <div class="user-list-card-con">
    <el-popover
      ref="popover"
      placement="right"
      :width="400"
      trigger="hover"
      popper-style="background:transparent;padding:0"
    >
      <template #reference>
        <div class="left">
          <div class="avatar-box">
            <img src="@/assets/test_avatar.jpg" />
          </div>
          <div class="info">
            <div class="name">电锯锯木头</div>
            <div class="desc">hahahah</div>
          </div>
        </div>
      </template>
      <UserIntroCard />
    </el-popover>
    <div class="btn">
      <el-button>已关注</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import UserIntroCard from "./UserIntroCard.vue";
const visible = ref(false);
</script>

<style lang="scss" scoped>
.user-list-card-con {
  border-bottom: 1px solid #444444;
  display: block;
  padding: 20px 0;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    cursor: pointer;
    display: flex;
    align-items: center;
    .avatar-box {
      width: 60px;
      height: 60px;
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .info {
      margin-left: 28px;
      .name {
        font-size: 16px;
        line-height: 19px;
        height: 20px;
        margin-bottom: 10px;
        display: inline-block;
        max-width: 680px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .desc {
        line-height: 14px;
        font-size: 12px;
        color: #6d757a;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
