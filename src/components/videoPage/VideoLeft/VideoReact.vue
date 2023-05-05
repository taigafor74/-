<template>
  <div class="react-con">
    <div class="left">
      <span class="item">
        <svg
          ref="likeSvg"
          @click="submitLike"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.77234 30.8573V11.7471H7.54573C5.50932 11.7471 3.85742 13.3931 3.85742 15.425V27.1794C3.85742 29.2112 5.50932 30.8573 7.54573 30.8573H9.77234ZM11.9902 30.8573V11.7054C14.9897 10.627 16.6942 7.8853 17.1055 3.33591C17.2666 1.55463 18.9633 0.814421 20.5803 1.59505C22.1847 2.36964 23.243 4.32583 23.243 6.93947C23.243 8.50265 23.0478 10.1054 22.6582 11.7471H29.7324C31.7739 11.7471 33.4289 13.402 33.4289 15.4435C33.4289 15.7416 33.3928 16.0386 33.3215 16.328L30.9883 25.7957C30.2558 28.7683 27.5894 30.8573 24.528 30.8573H11.9911H11.9902Z"
          ></path>
        </svg>
        <span>{{ likecount }}</span>
      </span>
      <span class="item">
        <svg
          ref="collectSvg"
          @click="submitCollect"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          class="icon"
          style="fill: "
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.8071 9.26152C18.7438 9.09915 17.7624 8.36846 17.3534 7.39421L15.4723 3.4972C14.8998 2.1982 13.1004 2.1982 12.4461 3.4972L10.6468 7.39421C10.1561 8.36846 9.25639 9.09915 8.19315 9.26152L3.94016 9.91102C2.63155 10.0734 2.05904 11.6972 3.04049 12.6714L6.23023 15.9189C6.96632 16.6496 7.29348 17.705 7.1299 18.7605L6.39381 23.307C6.14844 24.6872 7.62063 25.6614 8.84745 25.0119L12.4461 23.0634C13.4276 22.4951 14.6544 22.4951 15.6359 23.0634L19.2345 25.0119C20.4614 25.6614 21.8518 24.6872 21.6882 23.307L20.8703 18.7605C20.7051 17.705 21.0339 16.6496 21.77 15.9189L24.9597 12.6714C25.9412 11.6972 25.3687 10.0734 24.06 9.91102L19.8071 9.26152Z"
          ></path>
        </svg>
        <span>{{ collectcount }}</span>
      </span>
    </div>
    <div class="right">
      <span class="item">
        <svg
          ref="shareSvg"
          @click="submitShare1"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          xmlns="http://www.w3.org/2000/svg"
          fill="white"
        >
          <path
            d="M12.6058 10.3326V5.44359C12.6058 4.64632 13.2718 4 14.0934 4C14.4423 4 14.78 4.11895 15.0476 4.33606L25.3847 12.7221C26.112 13.3121 26.2087 14.3626 25.6007 15.0684C25.5352 15.1443 25.463 15.2144 25.3847 15.2779L15.0476 23.6639C14.4173 24.1753 13.4791 24.094 12.9521 23.4823C12.7283 23.2226 12.6058 22.8949 12.6058 22.5564V18.053C7.59502 18.053 5.37116 19.9116 2.57197 23.5251C2.47607 23.6489 2.00031 23.7769 2.00031 23.2122C2.00031 16.2165 3.90102 10.3326 12.6058 10.3326Z"
          ></path>
        </svg>
        <span>{{ sharecount }}</span>
      </span>
      <div class="report" @click="handleReport">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M9.40194 3.75C10.5566 1.74999 13.4434 1.75001 14.5981 3.75L21.7428 16.125C22.8975 18.125 21.4541 20.625 19.1447 20.625H4.8553C2.5459 20.625 1.10253 18.125 2.25723 16.125L9.40194 3.75ZM12.866 4.75C12.4811 4.08333 11.5189 4.08333 11.134 4.75L3.98928 17.125C3.60438 17.7917 4.08551 18.625 4.8553 18.625H19.1447C19.9145 18.625 20.3957 17.7917 20.0108 17.125L12.866 4.75Z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 8C12.4142 8 12.75 8.33579 12.75 8.75V13.75C12.75 14.1642 12.4142 14.5 12 14.5C11.5858 14.5 11.25 14.1642 11.25 13.75V8.75C11.25 8.33579 11.5858 8 12 8Z"
          ></path>
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 15.5C12.4142 15.5 12.75 15.8358 12.75 16.25V16.75C12.75 17.1642 12.4142 17.5 12 17.5C11.5858 17.5 11.25 17.1642 11.25 16.75V16.25C11.25 15.8358 11.5858 15.5 12 15.5Z"
          ></path>
        </svg>
        稿件投诉
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
    <el-dialog v-model="dialogTableVisible" :draggable="true">
      <div>
        <el-input
          v-model="textarea2"
          autosize
          type="textarea"
          placeholder="说点什么吧"
        />
        <div
          style="
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;
          "
        >
          <el-button type="primary" @click="submitShare">提交</el-button>
          <el-button type="warning" @click="resetShare">重置</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, defineProps, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { setReport } from "@/api/report";
import { setLike, getLike, deleteLike } from "@/api/like";
import { setCollect, getCollect, deleteCollect } from "@/api/collect";
import ActiveInput from "@/components/ActivePage/ActiveInput.vue";
import { shareVideo } from "@/api/active";
const likecount = ref(0);
const collectcount = ref(0);
const sharecount = ref(0);
const route = useRoute();
const likeSvg = ref(null);
const collectSvg = ref(null);
const shareSvg = ref(null);
const store = useUserStore();
const color = ref("rgb(150, 11, 201)");
const textarea2 = ref("");
const bLike = ref(false);
const bCollect = ref(false);
const bShare = ref(false);
const dialogTableVisible = ref(false);
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
const showReport = ref(false);
const textarea = ref("");
const handleReport = () => {
  if (store.isLoggedIn) {
    textarea.value = "";
    showReport.value = true;
  } else {
    ElMessage.error("请先登录");
  }
};
const submitReport = async () => {
  const form = {
    reporter_id: store.id,
    reported_type: "video",
    reported_id: props.data.user_id,
    reason: textarea.value,
    report_target_id: props.data.vid,
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
watchEffect(() => {
  if (props.data.likecount) {
    likecount.value = props.data.likecount;
    collectcount.value = props.data.collectcount;
    sharecount.value = props.data.sharecount;
  }
});
watchEffect(async () => {
  if (store.isLoggedIn) {
    const likeData = await getLike(store.id);
    likeData.forEach((item) => {
      if (item.like_target_id == route.query.vid) {
        toggle(likeSvg, bLike);
      }
    });
    const collectData = await getCollect(store.id);
    collectData.forEach((item) => {
      if (item.video_id == route.query.vid) {
        toggle(collectSvg, bCollect);
      }
    });
  }
});
function submitLike() {
  const status = toggle(likeSvg, bLike);
  if (status === 1) {
    setLike(route.query.vid, store.id, "video").then((res) => {
      ElMessage.success("点赞成功");
      likecount.value++;
    });
  } else if (status === 2) {
    deleteLike(route.query.vid, store.id, "video").then((res) => {
      ElMessage.success("取消点赞");
      likecount.value--;
    });
  } else if (status === 0) {
    ElMessage.error("请先登录");
  }
}
function submitCollect() {
  const status = toggle(collectSvg, bCollect);
  if (status === 1) {
    setCollect(route.query.vid, store.id).then((res) => {
      ElMessage.success("收藏成功");
      collectcount.value++;
    });
  } else if (status === 2) {
    deleteCollect(route.query.vid, store.id).then((res) => {
      ElMessage.success("取消收藏");
      collectcount.value--;
    });
  } else if (status === 0) {
    ElMessage.error("请先登录");
  }
}
const submitShare = async () => {
  const form = {
    active_sender_id: store.id,
    activity_type: "origin",
    active_content: textarea2.value,
    repost_video_id: props.data.vid,
  };
  const res = await shareVideo(form);
  if (res.success == 200) {
    ElMessage.success("分享成功");
    textarea2.value = "";
    dialogTableVisible.value = false;
  } else {
    ElMessage.error("分享失败");
    textarea2.value = "";
    dialogTableVisible.value = false;
  }
};
const resetShare = () => {
  textarea2.value = "";
};
function submitShare1() {
  if (store.isLoggedIn) {
    dialogTableVisible.value = true;
  } else {
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
</script>

<style lang="scss" scoped>
.react-con {
  padding-top: 18px;
  line-height: 36px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgb(68, 68, 68);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    font-size: 13px;
    display: flex;
    align-items: center;
    height: 100%;
    font-weight: 500;
    .item {
      display: flex;
      align-items: center;
      margin-right: 18px;
      span {
        color: #d8d8d8;
      }
      svg {
        margin-right: 10px;
        width: 36px;
        height: 36px;
        fill: #d8d8d8;
        cursor: pointer;
        &:hover {
          fill: rgb(150, 11, 201);
        }
      }
    }
  }
  .right {
    font-size: 14px;
    display: flex;
    align-items: center;
    color: #d8d8d8;
    height: 100%;
    .item {
      display: flex;
      align-items: center;
      margin-right: 18px;
      span {
      }
      svg {
        margin-right: 10px;
        width: 36px;
        height: 36px;
        fill: #d8d8d8;
        cursor: pointer;
      }
    }
    .report {
      height: 24px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        margin-right: 6px;
      }
    }
  }
}
</style>
