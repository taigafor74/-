<template>
  <div class="previewcon">
    <div class="preview-header">
      <div class="hleft">评论</div>
      <div class="hright" @click="gotoComment">更多</div>
    </div>
    <div class="preview">
      <el-card shadow="always" v-for="item in sliceData">
        <div class="con">
          <div class="left">
            <div class="avatar">
              <img :src="baseUrl + item.avatar" />
            </div>
          </div>
          <div class="right">
            <div class="top">
              <div class="info">
                <span class="uname"> {{ item.uname }}</span>
                <span class="dot">·</span>
                <span class="time">{{
                  new Date(item.create_time).toLocaleString()
                }}</span>
              </div>
              <div class="content">{{ item.content }}</div>
            </div>
            <div class="bottom">
              <span>来源：{{ item.title }}</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, defineProps } from "vue";
import { useManageStore } from "@/stores/manage";
import { useRoute, useRouter } from "vue-router";
const store = useManageStore();
const router = useRouter();
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
const baseUrl = "http://localhost:3000/avatar/";
const sliceData = ref([]);
watchEffect(() => {
  if (props.data) {
    sliceData.value = props.data.slice(0, 3);
    console.log(sliceData.value);
  }
});
const gotoComment = () => {
  router.push({
    name: "manageComment",
  });
  store.index = "4";
};
</script>

<style lang="scss" scoped>
.previewcon {
  margin-top: -20px;
  background: black;
  padding: 20px;
  border-radius: 0.625rem;
  .preview-header {
    margin-bottom: 10px;
    font-size: 20px;
    color: rgb(170, 46, 164);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .hright {
      cursor: pointer;
      font-size: 13px;
    }
  }
  .preview {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
    .con {
      display: flex;
      .left {
        margin-right: 10px;
        .avatar {
          width: 28px;
          height: 28px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
      }
      .right {
        .top {
          border-bottom: 1px solid #5c5b5b;
          .info {
            display: flex;
            align-items: center;
            .uname {
              margin-right: 8px;
            }
            .dot {
              margin-right: 8px;
            }
            .time {
              font-size: 12.5px;
              color: #5c5b5b;
            }
          }
          .content {
            padding: 10px 0;
          }
        }
        .bottom {
          padding-top: 15px;
          span {
            font-size: 12px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>
