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
        <div class="left" @click="gotoSpace">
          <div class="avatar-box">
            <img :src="avatar" />
          </div>
          <div class="info">
            <div class="name">{{ uname }}</div>
            <div class="desc">{{ desc }}</div>
          </div>
        </div>
      </template>
      <UserIntroCard :data="data" />
    </el-popover>
    <div class="btn">
      <el-button>已关注</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, watchEffect, reactive } from "vue";
import UserIntroCard from "./UserIntroCard.vue";
import { getFans, getFollows } from "@/api/follow";
import { useRouter } from "vue-router";
const router = useRouter();
const visible = ref(false);
const uname = ref("test-00");
const desc = ref("暂无简介");
const avatar = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const data = reactive({
  uname: "test-00",
  desc: "暂无简介",
  avatar: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  follows: 0,
  fans: 0,
  id: 0,
});
watchEffect(async () => {
  if (props.item.uname) {
    uname.value = props.item.uname;
    desc.value = props.item.desc;
    avatar.value = `http://localhost:3000/avatar/${props.item.avatar}`;
    data.uname = props.item.uname;
    data.desc = props.item.desc;
    data.id = props.item.id;
    data.avatar = `http://localhost:3000/avatar/${props.item.avatar}`;
    await getData(props.item.id);
  }
});
async function getData(uid) {
  const fansRes = await getFans(uid);
  const followRes = await getFollows(uid);
  data.follows = followRes.length;
  data.fans = fansRes.length;
}
async function gotoSpace() {
  if (data.id) {
    await router.push(`/user/${data.id}/main`);
  }
}
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
