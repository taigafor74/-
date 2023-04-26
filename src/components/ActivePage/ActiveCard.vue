<template>
  <div class="acc-con">
    <div class="item">
      <div class="item-main">
        <div class="avatar">
          <div class="img">
            <img :src="avatar" />
          </div>
        </div>
        <div class="header">
          <div class="name">{{ props.item?.uname }}</div>
          <div class="time">{{ timeAgo(props.item?.active_create_time) }}</div>
        </div>
        <div class="body">
          <div class="content">
            <div class="desc">
              {{ props.item?.active_content }}
              <RepostItem
                v-for="(repost, index) in repostItems"
                :key="index"
                :item="props.item"
                :uname="repost.uname"
                :repostContent="repost.content"
                :id="repost.id"
              />
            </div>
            <div class="stuff" v-if="showStuff">
              <div class="grid">
                <div class="img-box" v-for="item in imgList">
                  <div class="demo-image__preview">
                    <el-image
                      style="width: 100%; height: auto"
                      :src="item"
                      :zoom-rate="1.2"
                      :preview-src-list="imgList"
                      :initial-index="4"
                      fit="cover"
                    />
                  </div>
                </div>
              </div>
            </div>
            <VideoCard v-if="showVideoCard"></VideoCard>
            <RepostCard v-if="showRepostCard" :item="props.item" />
            <div class="icon-bottom">
              <div @click="share">
                <el-icon><Share /></el-icon> <span>转发</span>
              </div>
              <div>
                <svg
                  t="1636093575017"
                  class="icon"
                  viewBox="0 0 1024 1024"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  p-id="3323"
                  width="18"
                  height="18"
                  fill="white"
                  ref="likeSvg"
                  @click="submitLike"
                >
                  <path
                    d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z"
                    p-id="3324"
                  ></path>
                </svg>
                <span>{{ likeCount }}</span>
              </div>
            </div>
            <ShareInput v-if="isShare" :item="props.item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, watchEffect } from "vue";
import { ChatSquare, Share } from "@element-plus/icons-vue";
import { timeAgo } from "@/utils/getTime";
import VideoCard from "./VideoCard.vue";
import ShareInput from "./ShareInput.vue";
import RepostCard from "./RepostCard.vue";
import RepostItem from "./RepostItem.vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { getActive } from "@/api/active";
import { getActiveLike, deleteLike, setLike } from "@/api/like";
const store = useUserStore();
const showStuff = ref(false);
const showVideoCard = ref(false);
const showRepostCard = ref(false);
const imgList = ref([]);
const isShare = ref(false);
const avatar = ref("");
const repostItems = ref([]);
const likeCount = ref(0);
const props = defineProps({
  item: Object,
});
onMounted(async () => {
  if (props.item) {
    likeCount.value = props.item.active_like_count;
    avatar.value = `http://localhost:3000/avatar/${props.item.avatar}`;
    // if (props.item.avtive_id) {
    //   showRepostCard.value = true;
    // }
    if (props.item.imgList) {
      showStuff.value = true;
      imgList.value = props.item.imgList.split(",");
      imgList.value = imgList.value.map((item) => {
        return `http://localhost:3000/activeImg/${item}`;
      });
    }
    if (props.item.active_target_id) {
      showRepostCard.value = true;
      await fetchRepostData(props.item.active_target_id, repostItems.value);
      console.log(repostItems.value);
    }
  }
});
const color = ref("rgb(150, 11, 201)");
const likeSvg = ref(null);
const bLike = ref(false);
//点赞逻辑
//***************************** */
watchEffect(async () => {
  if (store.isLoggedIn) {
    const res = await getActiveLike(store.id);
    res.forEach((item) => {
      if (item.like_target_id == props.item.active_id) {
        toggle(likeSvg, bLike);
      }
    });
  }
});
function submitLike() {
  const status = toggle(likeSvg, bLike);
  if (status === 1) {
    setLike(props.item.active_id, store.id, "active").then((res) => {
      ElMessage.success("点赞成功");
      likeCount.value++;
    });
  } else if (status === 2) {
    deleteLike(props.item.active_id, store.id, "active").then((res) => {
      ElMessage.success("取消点赞");
      likeCount.value--;
    });
  } else if (status === 0) {
    ElMessage.error("请先登录");
  }
}
function toggle(e, t) {
  if (!store.isLoggedIn) {
    return 0;
  }
  if (t.value == false) {
    e.value.style.fill = color.value;
    t.value = true;
    return 1;
  } else {
    e.value.style.fill = "#d8d8d8";
    t.value = false;
    return 2;
  }
}
//***************************** */
const share = () => {
  if (store.isLoggedIn) {
    isShare.value = !isShare.value;
    if (store.id == props.item.active_sender_id) {
      // ElMessage.error("不能转发自己的动态!");
    }
  } else {
    ElMessage.error("请先登录!");
  }
};
async function fetchRepostData(id, repostItems = []) {
  const res = await getActive(id);
  if (res && res.length > 0) {
    let repost = {};
    if (res[0].active_target_id) {
      repost = {
        uname: res[0].uname,
        content: res[0].active_content,
        id: res[0].active_sender_id,
      };
      await fetchRepostData(res[0].active_target_id, repostItems);
    }
    if (repost.uname && repost.content) {
      repostItems.unshift(repost);
    }
  }
  return repostItems;
}
</script>

<style lang="scss" scoped>
.acc-con {
  margin-bottom: 8px;
  background: black;
  padding-bottom: 24px;
  border-radius: 8px;
  .item {
    border-radius: 4px;
    min-width: 632px;
    position: relative;
    letter-spacing: 0;
    .item-main {
      padding: 0 12px 0 88px;
      position: relative;
      .avatar {
        height: 48px;
        left: 24px;
        position: absolute;
        top: 24px;
        width: 48px;
        .img {
          width: 48px;
          height: 48px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      .header {
        height: 73px;
        padding-top: 27px;
        .name {
          height: 24px;
          display: flex;
          align-items: center;
          cursor: pointer;
          font-size: 16px;
        }
        .time {
          display: flex;
          align-items: center;
          padding-top: 4px;
          color: #99a2aa;
          cursor: pointer;
          font-size: 12px;
          height: 22px;
          line-height: 22px;
        }
      }
      .body {
        margin-top: 10px;
        .content {
          width: 532px;
          .desc {
            padding-right: 10px;
            font-size: 14px;
            letter-spacing: 0.5px;
            line-height: 22px;
            white-space: pre-wrap;
            word-break: break-word;
            margin-bottom: 10px;
            display: flex;
            flex-wrap: wrap;
          }
          .stuff {
            margin-top: 10px;
            padding-right: 30px;
            margin-bottom: 10px;
            .grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 10px;
              .img-box {
                img {
                  width: 100%;
                  height: auto;
                  object-fit: cover;
                  border-radius: 4px;
                }
              }
            }
          }
          .icon-bottom {
            display: flex;
            align-items: center;
            div {
              cursor: pointer;
              display: flex;
              align-items: center;
              margin-right: 30px;
              span {
                font-size: 13px;
                margin-left: 5px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
