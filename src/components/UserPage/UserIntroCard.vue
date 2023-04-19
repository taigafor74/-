<template>
  <el-card class="box-card">
    <div class="card-con">
      <span>
        <img :src="avatar" @click="gotoSpace" />
      </span>
      <div class="right">
        <div class="name" @click="gotoSpace">{{ uname }}</div>
        <div class="data">
          <span>关注 {{ follows }}</span>
          <span>粉丝 {{ fans }}</span>
        </div>
        <div class="desc">
          {{ desc }}
        </div>
        <div class="btn">
          <el-button size="small">发消息</el-button>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { defineProps, ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const avatar = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const uname = ref("test-00");
const desc = ref("暂无简介");
const follows = ref(0);
const fans = ref(0);
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});
watchEffect(() => {
  if (props.data.id !== 0) {
    avatar.value = props.data.avatar;
    uname.value = props.data.uname;
    desc.value = props.data.desc;
    follows.value = props.data.follows;
    fans.value = props.data.fans;
  }
});
const gotoSpace = () => {
  router.push({
    path: "/user/" + props.data.id + "/main",
  });
  router.go(0);
};
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
