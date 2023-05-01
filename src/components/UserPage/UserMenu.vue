<template>
  <div class="user-menu-container">
    <div class="user-menu-left">
      <div
        class="user-menu-left-item"
        @mouseenter="test($event, item.index)"
        @click="routerto(item.index, item.routerPath, userId)"
        @mouseleave="resetCurosor"
        v-for="item in userMenuArr"
        :key="item.index"
        ref="userMenuLeftItem"
      >
        <img :src="getAssetsImages(item.iconSrc)" alt="" />
        <span>{{ item.title }}</span>
      </div>
      <div ref="cursor" class="user-menu-cursor"></div>
    </div>
    <div class="user-menu-center">
      <input placeholder="搜索视频、动态" />
      <img src="@/assets/icon/搜索.png" alt="" />
    </div>
    <div class="user-menu-right">
      <div class="user-menu-data spc" @click="goFollow">
        <span>关注数</span>
        <span>{{ follow }}</span>
      </div>
      <div class="user-menu-data spc" @click="goFans">
        <span>粉丝数</span>
        <span>{{ fans }}</span>
      </div>
      <div class="user-menu-data">
        <span>获赞数</span>
        <span>{{ likecount }}</span>
      </div>
      <div class="user-menu-data">
        <span>播放数</span>
        <span>{{ watchcount }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import { getFans, getFollows } from "@/api/follow";
import { getTotalLikes } from "@/api/like";
import { getTotalWatch } from "@/api/watch";
const likecount = ref(0);
const watchcount = ref(0);
type userMenu = {
  title: string;
  iconSrc: any;
  index: number;
  routerPath: string;
};
enum enumIndex {
  "/user/main" = 0,
  dynamic = 1,
  "/user/video" = 2,
  collect = 3,
  setting = 4,
}
const follow = ref(0);
const fans = ref(0);
const router = useRouter();
const route = useRoute();
const userId = route.params.id;
const cursor = ref<HTMLElement | any>(null);
let currentIndex: any = enumIndex[route.path as any];
let userMenuLeftItem = ref<HTMLElement | any>(null);
async function getData() {
  likecount.value = await getTotalLikes(route.params.id);
  watchcount.value = await getTotalWatch(route.params.id);
  const fansRes = await getFans(route.params.id);
  const followRes = await getFollows(route.params.id);
  follow.value = followRes.length;
  fans.value = fansRes.length;
}
getData();

watch(
  () => route.params.id,
  async () => {
    await getData();
  }
);
const goFollow = () => {
  router.push({
    path: `/user/${route.params.id}/follow/follow`,
  });
};
const goFans = () => {
  router.push({
    path: `/user/${route.params.id}/follow/fans`,
  });
};
onMounted(() => {
  cursorGoto(currentIndex);
  if (userMenuLeftItem.value && userMenuLeftItem.value[currentIndex]) {
    userMenuLeftItem.value[currentIndex].classList.add("cursor-active");
  }
});
const userMenuArr: userMenu[] = reactive([
  {
    title: "主页",
    iconSrc: "../../assets/icon/home_fill.png",
    index: 0,
    routerPath: "userMain",
  },
  {
    title: "动态",
    iconSrc: "../../assets/icon/铃铛.png",
    index: 1,
    routerPath: "userActive",
  },
  {
    title: "投稿",
    iconSrc: "../../assets/icon/投稿.png",
    index: 2,
    routerPath: "userVideo",
  },
  {
    title: "收藏",
    iconSrc: "../../assets/icon/收藏.png",
    index: 3,
    routerPath: "userMain",
  },
  {
    title: "设置",
    iconSrc: "../../assets/icon/设置.png",
    index: 4,
    routerPath: "userVideo",
  },
]);

function routerto(index: number, routerPath: string, id: string) {
  currentIndex = index;
  router.push({
    name: routerPath,
    params: { id },
    query: {},
  });
}
function getAssetsImages(url: string) {
  return new URL(url, import.meta.url).href;
}
function cursorGoto(index: any) {
  cursor.value.style.left = index * 20 + "%";
}
function test(e: MouseEvent, index: number) {
  userMenuLeftItem.value.forEach((item: HTMLElement) => {
    item.classList.remove("cursor-active");
  });
  userMenuLeftItem.value[index].classList.add("cursor-active");
  cursorGoto(index);
}
function resetCurosor() {
  userMenuLeftItem.value.forEach((item: HTMLElement) => {
    item.classList.remove("cursor-active");
  });

  if (userMenuLeftItem.value && userMenuLeftItem.value[currentIndex]) {
    userMenuLeftItem.value[currentIndex].classList.add("cursor-active");
  }
  cursorGoto(currentIndex);
}
</script>

<style lang="scss" scoped>
.user-menu-container {
  width: 100%;
  height: 3.866432vw;
  padding: 0 1.171646vw;
  background-color: #0f0f0f;
  border: 0.058582vw solid rgb(61, 2, 199);
  border-top: 0;
  border-bottom-left-radius: 0.492912vw;
  border-bottom-right-radius: 0.492912vw;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .user-menu-left {
    position: relative;
    height: 100%;
    display: flex;
    .user-menu-left-item {
      height: 100%;
      display: flex;
      cursor: pointer;
      align-items: center;
      padding-right: 1.816052vw;
      img {
        margin-right: 0.234329vw;
        width: 1.171646vw;
        height: 1.171646vw;
      }
    }
    .user-menu-cursor {
      position: absolute;
      bottom: -1px;
      width: 3.280609219vw;
      height: 0.175747vw;
      background-color: rgb(77, 0, 255);
      transition: all 0.2s ease;
      left: 0;
    }
  }
  .user-menu-center {
    width: 9.550029vw;
    height: 1.757469vw;
    display: flex;
    align-items: center;
    border-radius: 0.878735vw;
    border: 0.058582vw solid rgb(89, 88, 88);
    input {
      width: 7.350029vw;
      height: 1.757469vw;
      border: none;
      outline: none;
      line-height: 1.757469vw;
      font-size: 0.702988vw;
      background: rgba(0, 0, 0, 0);
      padding: 0 0 0 0.585823vw;
      color: rgb(255, 255, 255);
    }
    img {
      width: 1.054482vw;
      height: 1.054482vw;
    }
  }
  .user-menu-right {
    height: 100%;
    display: flex;
    .user-menu-data {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 3.397774vw;
      height: 3.866432vw;
      span {
        &:first-child {
          font-size: 0.902988vw;
          color: rgb(197, 195, 195);
          margin-bottom: 0.292912vw;
        }
        &:last-child {
          font-size: 0.702988vw;
          color: rgb(255, 255, 255);
        }
      }
    }
  }
  .cursor-active {
    color: rgb(61, 2, 199);
  }
}
.spc {
  cursor: pointer;
  &:hover {
    span {
      color: rgb(61, 2, 199) !important;
    }
  }
}
</style>
