<template>
  <div class="card-con">
    <div class="info">
      <div class="left">
        <!-- <div class="avatar">
          <img :src="img" alt="" />
        </div> -->
      </div>
      <div class="right">
        <div class="top">
          <div class="name">{{ uname }}</div>
          <div class="active">你的视频：</div>
          <div class="content">{{ title }}</div>
          <div class="no">视频id:{{ props.item?.vid }}</div>
          <div class="status">状态:{{ props.item?.is_handle }}</div>
          <div class="reason">
            原因：{{ props.item?.result == null ? "无 " : props.item?.result }}
          </div>
          <div class="cool">
            {{
              props.item?.is_approve == null ? "处理中" : props.item?.is_approve
            }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, ref } from "vue";
import { timeAgo } from "@/utils/getTime";
import { getLike } from "@/api/notifications";
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
onMounted(async () => {
  // data.value = await getLike(props.item?.target_id);
  console.log(props.item);

  // console.log(data.value);
  // uname.value = data.value[0].uname;
  // img.value = `http://localhost:3000/avatar/${data.value[0].avatar}`;
  title.value = props.item.title;
  console.log(title.value);
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
        align-items: center;
        justify-content: space-around;
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
        .no {
          width: 200px;
        }
      }
      .bottom {
        color: #999;
        font-size: 12px;
        line-height: 22px;
      }
      .reason {
        width: 200px;
      }
    }
  }
  .content {
    width: 200px;
    font-size: 13.5px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .status {
    width: 200px;
  }
}
</style>
