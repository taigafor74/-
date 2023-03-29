<template>
  <div class="user-menu-container">
    <div class="user-menu-left">
      <div
        class="user-menu-left-item"
        @mouseenter="test($event, item.index)"
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
      <div class="user-menu-data">
        <span>关注数</span>
        <span>369</span>
      </div>
      <div class="user-menu-data">
        <span>粉丝数</span>
        <span>8889</span>
      </div>
      <div class="user-menu-data">
        <span>获赞数</span>
        <span>11119</span>
      </div>
      <div class="user-menu-data">
        <span>播放数</span>
        <span>6379</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
type userMenu = {
  title: string;
  iconSrc: any;
  index: number;
};
const cursor = ref<HTMLElement | any>(null);
let currentIndex: number = 0;
let userMenuLeftItem = ref<HTMLElement | any>(null);
let ItemWidth: number = 0;
let marginRight: number = 0;
onMounted(() => {
  ItemWidth = userMenuLeftItem.value[0].offsetWidth;
  marginRight = +getComputedStyle(
    userMenuLeftItem.value[0] as HTMLElement
  ).marginRight.replace("px", " ");
  cursorGoto(currentIndex);
  userMenuLeftItem.value[currentIndex].classList.add("cursor-active");
});
const userMenuArr: userMenu[] = reactive([
  {
    title: "主页",
    iconSrc: "../../assets/icon/home_fill.png",
    index: 0,
  },
  {
    title: "动态",
    iconSrc: "../../assets/icon/铃铛.png",
    index: 1,
  },
  {
    title: "投稿",
    iconSrc: "../../assets/icon/投稿.png",
    index: 2,
  },
  {
    title: "收藏",
    iconSrc: "../../assets/icon/收藏.png",
    index: 3,
  },
  {
    title: "设置",
    iconSrc: "../../assets/icon/设置.png",
    index: 4,
  },
]);
function getAssetsImages(url: string) {
  return new URL(url, import.meta.url).href;
}
function cursorGoto(index: number) {
  cursor.value.style.left = index * 20 + "%";
}
function test(e: MouseEvent, index: number) {
  userMenuLeftItem.value.forEach((item: HTMLElement) => {
    item.classList.remove("cursor-active");
  });
  userMenuLeftItem.value[index].classList.add("cursor-active");
  cursorGoto(index);
}
</script>

<style lang="scss" scoped>
.user-menu-container {
  width: 100%;
  height: 3.866432vw;
  padding: 0 1.171646vw;
  background-color: rgb(0, 0, 0);
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
      align-items: center;
      margin-right: 1.816052vw;
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
</style>
