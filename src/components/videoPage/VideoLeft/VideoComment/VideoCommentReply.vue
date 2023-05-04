<template>
  <div class="reply-container">
    <div class="reply-item">
      <div class="avatar-box">
        <div class="avatar">
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="main-comment-box">
        <div class="user-info">
          <div class="user-name">
            {{ props.item?.uname }}
          </div>
          <span class="reply-content">
            <div class="reply-to" v-if="replyname">{{ replyname }}</div>
            <div>{{ props.item?.content }}</div>
          </span>
        </div>
        <div class="reply">
          <div class="reply-info">
            <span class="reply-time">{{
              timeAgo(props.item?.create_time)
            }}</span>
            <div class="reply-like">
              <svg
                t="1636093575017"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="3323"
                width="18"
                height="18"
                fill="#9499a0"
                ref="likeSvg"
                @click="submitLike"
              >
                <path
                  d="M594.176 151.168a34.048 34.048 0 0 0-29.184 10.816c-11.264 13.184-15.872 24.064-21.504 40.064l-1.92 5.632c-5.632 16.128-12.8 36.864-27.648 63.232-25.408 44.928-50.304 74.432-86.208 97.024-23.04 14.528-43.648 26.368-65.024 32.576v419.648a4569.408 4569.408 0 0 0 339.072-4.672c38.72-2.048 72-21.12 88.96-52.032 21.504-39.36 47.168-95.744 63.552-163.008a782.72 782.72 0 0 0 22.528-163.008c0.448-16.832-13.44-32.256-35.328-32.256h-197.312a32 32 0 0 1-28.608-46.336l0.192-0.32 0.64-1.344 2.56-5.504c2.112-4.8 5.12-11.776 8.32-20.16 6.592-17.088 13.568-39.04 16.768-60.416 4.992-33.344 3.776-60.16-9.344-84.992-14.08-26.688-30.016-33.728-40.512-34.944zM691.84 341.12h149.568c52.736 0 100.864 40.192 99.328 98.048a845.888 845.888 0 0 1-24.32 176.384 742.336 742.336 0 0 1-69.632 178.56c-29.184 53.44-84.48 82.304-141.76 85.248-55.68 2.88-138.304 5.952-235.712 5.952-96 0-183.552-3.008-244.672-5.76-66.432-3.136-123.392-51.392-131.008-119.872a1380.672 1380.672 0 0 1-0.768-296.704c7.68-72.768 70.4-121.792 140.032-121.792h97.728c13.76 0 28.16-5.504 62.976-27.456 24.064-15.104 42.432-35.2 64.512-74.24 11.904-21.184 17.408-36.928 22.912-52.8l2.048-5.888c6.656-18.88 14.4-38.4 33.28-60.416a97.984 97.984 0 0 1 85.12-32.768c35.264 4.096 67.776 26.88 89.792 68.608 22.208 42.176 21.888 84.864 16 124.352a342.464 342.464 0 0 1-15.424 60.544z m-393.216 477.248V405.184H232.96c-40.448 0-72.448 27.712-76.352 64.512a1318.912 1318.912 0 0 0 0.64 282.88c3.904 34.752 32.96 61.248 70.4 62.976 20.8 0.96 44.8 1.92 71.04 2.816z"
                  p-id="3324"
                ></path>
              </svg>
              {{ likeCount }}
            </div>

            <span
              class="reply-btn"
              @click="
                toggleReplyInput(
                  props.item?.parrent_id,
                  props.item?.comment_id,
                  userStore.uname,
                  props.item?.uname,
                  props.item?.id
                );
                $emit('setActiveComment', props.item?.parrent_id);
              "
              >回复</span
            >
            <span class="report" @click="handleReport">投诉</span>
          </div>
        </div>
      </div>
    </div>
    <el-dialog v-model="showReport" title="请说明举报原因">
      <div>
        <el-input
          v-model="textarea"
          autosize
          type="textarea"
          placeholder="请输入举报理由"
        />
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
          "
        >
          <el-button type="primary" @click="submitReport">提交</el-button>
          <el-button type="warning" @click="resetReport">重置</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref, onMounted, watchEffect } from "vue";
import { timeAgo } from "@/utils/getTime";
import { useCommentStore } from "@/stores/comment";
import { ElMessage } from "element-plus";
import { getCommentLike, deleteLike, setLike } from "@/api/like";
import { useUserStore } from "@/stores/user";
import { setReport } from "@/api/report";
const userStore = useUserStore();
const store = useCommentStore();
const likeCount = ref(0);
const img = ref("");
const showReply = ref(false);
const replyname = ref("");
const showReport = ref(false);
const textarea = ref("");
const handleReport = () => {
  if (userStore.isLoggedIn) {
    textarea.value = "";
    showReport.value = true;
  } else {
    ElMessage.error("请先登录");
  }
};
const submitReport = async () => {
  const form = {
    reporter_id: userStore.id,
    reported_type: "comment",
    reported_id: props.item.user_id,
    reason: textarea.value,
    report_target_id: props.item.comment_id,
  };
  const res = await setReport(form);
  if (res.success == true) {
    ElMessage.success("举报成功");
    textarea.value = "";
    showReport.value = false;
  } else {
    ElMessage.error("举报失败");
    textarea.value = "";
    showReport.value = false;
  }
};
const resetReport = () => {
  textarea.value = "";
};
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  toggleReplyInput: {
    type: Function,
    default: () => {},
  },
});
const color = ref("rgb(150, 11, 201)");
const likeSvg = ref(null);
const bLike = ref(false);
//点赞逻辑
//***************************** */
onMounted(async () => {
  const res = await getCommentLike(userStore.id);
  likeCount.value = props.item.comment_like_count;
});
watchEffect(async () => {
  if (userStore.isLoggedIn) {
    const res = await getCommentLike(userStore.id);
    res.forEach((item) => {
      if (item.like_target_id == props.item.comment_id) {
        toggle(likeSvg, bLike);
      }
    });
  }
});
function submitLike() {
  const status = toggle(likeSvg, bLike);
  if (status === 1) {
    setLike(props.item.comment_id, userStore.id, "comment").then((res) => {
      ElMessage.success("点赞成功");
      likeCount.value++;
    });
  } else if (status === 2) {
    deleteLike(props.item.comment_id, userStore.id, "comment").then((res) => {
      ElMessage.success("取消点赞");
      likeCount.value--;
    });
  } else if (status === 0) {
    ElMessage.error("请先登录");
  }
}
function toggle(e, t) {
  if (!userStore.isLoggedIn) {
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
watchEffect(async () => {
  if (props.item) {
    img.value = `http://localhost:3000/avatar/${props.item.avatar}`;
    if (props.item.reply_user_name == null) {
      replyname.value = ``;
    } else {
      replyname.value = `回复@${props.item.reply_user_name}:`;
    }
  }
});
</script>

<style lang="scss" scoped>
.report {
  margin-left: 10px;
  cursor: pointer;
  color: #d812aa;
}
.reply-container {
  width: 100%;
  padding-left: 72px;
  .reply-item {
    width: 100%;
    padding: 8px 0;
    border-radius: 4px;
    display: flex;
    .avatar-box {
      display: flex;
      width: 40px;
      cursor: pointer;
      .avatar {
        width: 30px;
        height: 30px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }
    }
    .main-comment-box {
      width: 100%;
      .user-info {
        font-size: 14px;
        margin-bottom: 4px;
        display: flex;
        padding-top: 5px;
        align-items: center;
        .user-name {
          white-space: nowrap;
          font-weight: 500;
          margin-right: 5px;
          cursor: pointer;
          color: rgb(206, 205, 205);
        }
        .reply-content {
          font-size: 16px;
          font-weight: 400;
          box-sizing: border-box;
          color: white;
          display: flex;
          .reply-to {
            color: purple;
          }
        }
      }
      .reply {
        font-size: 16px;
        line-height: 26px;
        padding: 2px 0;
        .reply-info {
          display: flex;
          align-items: center;
          margin-top: 2px;
          font-size: 13px;
          color: rgb(206, 205, 205);
          .reply-time {
            margin-right: 20px;
          }
          .reply-like {
            display: flex;
            margin-right: 19px;
            cursor: pointer;
            align-items: center;
            svg {
              margin-right: 5px;
            }
          }
          .reply-dislike {
            display: flex;
            margin-right: 19px;
            cursor: pointer;
          }
          .reply-btn {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
