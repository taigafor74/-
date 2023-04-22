<template>
  <div class="comment-input-con">
    <div class="avatar-box">
      <div class="avatar">
        <img :src="img" alt="" />
      </div>
    </div>
    <textarea
      class="input-box"
      :placeholder="placeholder"
      v-model="comment"
      @focus="onFocus"
    ></textarea>
    <div class="send-box">
      <div class="send-text" @click="submitComment">发布</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";
import { ref, onMounted, defineProps, watchEffect } from "vue";
import { useRoute } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCommentStore } from "@/stores/comment";
import { postComment } from "@/api/comment";
const route = useRoute();
const commentStore = useCommentStore();
const store = useUserStore();
const comment = ref("");
const img = ref("");
const placeholder = ref("说点什么吧...");
const props = defineProps({
  type: String,
});
watchEffect(() => {
  if (commentStore.replyToWho) {
    placeholder.value = `回复@${commentStore.replyToWho}:`;
  }
});
function onFocus() {
  if (props.type == "main") {
    commentStore.resetAll();
  }
}
const submitComment = async () => {
  if (store.isLoggedIn) {
    if (comment.value == "") {
      ElMessage.error("评论不能为空");
      return;
    }
    if (commentStore.parrentId) {
      const res = await postComment(
        route.query.vid,
        store.id,
        comment.value,
        commentStore.uname,
        commentStore.parrentId,
        commentStore.replyTo,
        commentStore.replyToWho
      );
      ElMessage.success(res.message);
    } else {
      const res = await postComment(
        route.query.vid,
        store.id,
        comment.value,
        store.uname
      );
      ElMessage.success(res.message);
      commentStore.comments.unshift(res.data);
    }
    comment.value = "";
  } else {
    ElMessage.error("请先登录");
  }
};
onMounted(() => {
  img.value = store.avatar;
});
</script>

<style lang="scss" scoped>
.comment-input-con {
  font-weight: 400;
  display: flex;
  height: 50px;
  align-items: center;
  .avatar-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 50px;
    .avatar {
      width: 48px;
      height: 48px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
  .input-box {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    border: 1px solid rgb(47, 47, 47);
    border-radius: 6px;
    background-color: rgb(47, 47, 47);
    font-family: inherit;
    line-height: 38px;
    color: white;
    resize: none;
    outline: none;
    box-sizing: border-box;
  }
  .send-box {
    display: flex;
    justify-content: center;
    background: #d007c6;
    align-items: center;
    height: 100%;
    width: 70px;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
    .send-text {
      font-size: 16px;
      color: black;
    }
  }
}
</style>
