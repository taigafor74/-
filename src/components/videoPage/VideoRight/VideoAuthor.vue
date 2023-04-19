<template>
  <div class="Author-con">
    <div class="info">
      <div class="avatar" @click="gotoSpace">
        <img :src="img" alt="" />
      </div>
      <div class="right">
        <div class="name">
          <span class="r-name">{{ uname }}</span>
          <span class="r-mail">发消息</span>
        </div>
        <div class="intro">
          {{ desc }}
        </div>
        <div class="btn" @click="submitFollow">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.25098 8.75V13.25C7.25098 13.6642 7.58676 14 8.00098 14C8.41519 14 8.75098 13.6642 8.75098 13.25V8.75H13.251C13.6652 8.75 14.001 8.41421 14.001 8C14.001 7.58579 13.6652 7.25 13.251 7.25H8.75098V2.75C8.75098 2.33579 8.41519 2 8.00098 2C7.58676 2 7.25098 2.33579 7.25098 2.75V7.25H2.75098C2.33676 7.25 2.00098 7.58579 2.00098 8C2.00098 8.41421 2.33676 8.75 2.75098 8.75H7.25098Z"
                fill="white"
              ></path>
            </svg>
            {{ is_follow }} {{ subscribe }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watchEffect, onMounted, ref, computed } from "vue";
import { getFans, follow, updateFollow, unfollow } from "@/api/follow";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
const store = useUserStore();
const router = useRouter();
const data = ref([]);
const isFollow = ref(false);
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
const subscribe = ref(0);
const is_follow = computed(() => {
  if (isFollow.value) {
    return "已关注";
  } else {
    return "关注";
  }
});
const img = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
const uname = ref("暂无昵称");
const desc = ref("暂无简介");

async function setFollow() {
  if (store.isLoggedIn) {
    if (props.data.id) {
      store.followArr.forEach((item) => {
        if (item == props.data.id) {
          isFollow.value = true;
        }
      });
    }
  }
  return;
}
watchEffect(async () => {
  if (props.data) {
    uname.value = props.data.uname;
    const res = await getFans(props.data.id);
    subscribe.value = res.length;
    await setFollow();
    if (props.data.desc) {
      desc.value = props.data.desc;
    }
    if (props.data.avatar) {
      img.value = `http://localhost:3000/avatar/${props.data.avatar}`;
    }
  }
});
const gotoSpace = () => {
  router.push(`/user/${props.data.id}/main`);
};
const submitFollow = async () => {
  if (store.isLoggedIn) {
    if (store.id == props.data.id) {
      ElMessage.error("不能关注自己");
      return;
    } else {
      if (isFollow.value) {
        const message = await unfollow(store.id, props.data.id);
        updateFollow(store, props.data.id, false);
        ElMessage.success(message);
        subscribe.value--;
        isFollow.value = false;
      } else {
        const message = await follow(store.id, props.data.id);
        updateFollow(store, props.data.id, true);
        ElMessage.success(message);
        subscribe.value++;
        isFollow.value = true;
      }
    }
  } else {
    ElMessage.error("请先登录");
  }
};
</script>

<style lang="scss" scoped>
.Author-con {
  .info {
    min-height: 58px;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    .avatar {
      cursor: pointer;
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 12px;
      flex: 1;
      overflow: auto;
      .name {
        font-size: 16px;
        height: 22px;
        line-height: 22px;
        display: flex;
        align-items: center;
        font-weight: 500;
        .r-name {
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-right: 12px;
        }
        .r-mail {
          cursor: pointer;
          font-size: 14px;
          color: #61666d;
          flex-shrink: 0;
        }
      }
      .intro {
        font-size: 14px;
        margin: 2px 0 10px 0;
        line-height: 16px;
        height: 16px;
        color: #9499a0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        cursor: pointer;
        background: #fe03e5;
        max-width: 230px;
        padding: 0;
        line-height: 30px;
        height: 30px;
        border-radius: 6px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 5px;
        white-space: nowrap;
        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
      }
    }
  }
}
</style>
