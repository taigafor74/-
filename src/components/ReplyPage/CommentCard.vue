<template>
  <div class="card-con">
    <div class="info">
      <div class="left">
        <div class="avatar">
          <img :src="img" alt="" />
        </div>
      </div>
      <div class="right">
        <div class="top">
          <div class="name">{{ uname }}</div>
          <div class="active">{{ desc }}</div>
        </div>
        <div class="middle">
          <div class="ml" v-if="Ame">
            回复<span>@{{ replyToName }}</span
            >:
          </div>
          <div class="mr">{{ content }}</div>
        </div>
        <div class="reply" v-if="replyTo">{{ replyTo }}</div>
        <div class="bottom">{{ timeAgo(props.item?.create_time) }}</div>
      </div>
    </div>
    <div class="content">{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { timeAgo } from "@/utils/getTime";
import { getComment } from "@/api/notifications";
import { getByCommentId } from "@/api/comment";
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});
const data = ref([]);
const uname = ref("");
const img = ref("");
const title = ref("");
const content = ref("");
const desc = ref("");
const replyTo = ref("");
const Ame = ref(false);
const replyToName = ref("");
onMounted(async () => {
  data.value = await getComment(props.item?.target_id);
  uname.value = data.value[0].uname;
  img.value = `http://localhost:3000/avatar/${data.value[0].avatar}`;
  content.value = data.value[0].content;
  const parrent = data.value[0].parrent_id;
  const replyComment = data.value[0].reply_comment_id;
  //   console.log(data.value);
  const authorId = data.value[0].video_author_id;
  if (authorId === props.item?.receiver_id && !parrent && !replyComment) {
    desc.value = "评论了我的视频";
    title.value = data.value[0].title;
  } else {
    desc.value = "回复了我的评论";
    const parrentData = await getByCommentId(parrent);
    title.value = parrentData[0].content;
    if (replyComment) {
      const replyData = await getByCommentId(replyComment);
      replyTo.value = `${replyData[0].uname} : ${replyData[0].content}`;
      replyToName.value = replyData[0].uname;
      Ame.value = true;
      // content.value = `@${replyData[0].uname} ${content.value}`;
    }
  }
});
</script>

<style lang="scss" scoped>
.card-con {
  width: 100%;
  padding-top: 24px;
  padding-bottom: 24px;
  display: flex;
  border-bottom: 1px solid #333;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: #333;
  }
  .info {
    display: flex;
    .left {
      display: flex;
      align-items: center;
      margin-right: 15px;
      .avatar {
        width: 46px;
        height: 46px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .right {
      .top {
        margin-bottom: 10px;
        display: flex;
        .name {
          color: #f4f4f4;
          margin-right: 8px;
          font-weight: bold;
        }
        .active {
          color: #aaa9a9;
          font-size: 14px;
          line-height: 15px;
        }
      }
      .middle {
        margin-bottom: 10px;
        display: flex;
        .ml {
          margin-right: 10px;
          span {
            color: purple;
          }
        }
        .mr {
        }
      }
      .reply {
        margin-bottom: 10px;
        color: #aaa9a9;
        font-size: 12px;
        line-height: 15px;
      }
      .bottom {
        color: #999;
        font-size: 12px;
      }
    }
  }
  .content {
    width: 200px;
    margin-top: 6px;
    font-size: 13.5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
