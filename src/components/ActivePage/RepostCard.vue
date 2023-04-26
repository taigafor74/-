<template>
  <div class="repost-con">
    <div class="item">
      <div class="item-main">
        <div class="header">
          <div class="top">
            <div class="avatar">
              <div class="img">
                <img :src="avatar" />
              </div>
            </div>
            <div class="name">{{ uname }}</div>
          </div>
          <!-- <div class="time">42分钟前</div> -->
        </div>
        <div class="body">
          <div class="content">
            <div class="desc">{{ content }}</div>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from "vue";
import { getActive } from "@/api/active";
import RepostItem from "./RepostItem.vue";
import VideoCard from "./VideoCard.vue";
const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
});
const avatar = ref("");
const uname = ref("");
const content = ref("");
const showStuff = ref(false);
const showVideoCard = ref(false);
const showRepostCard = ref(false);
const imgList = ref([]);
onMounted(async () => {
  console.log(props.item);
  const id = props.item.origin_active_id || props.item.active_id;
  const res = await getActive(id);
  avatar.value = `http://localhost:3000/avatar/${res[0].avatar}`;
  uname.value = res[0].uname;
  content.value = res[0].active_content;
  if (res[0].imgList) {
    showStuff.value = true;
    imgList.value = res[0].imgList.split(",");
    imgList.value = imgList.value.map((item) => {
      return `http://localhost:3000/activeImg/${item}`;
    });
  }
});
</script>

<style lang="scss" scoped>
.repost-con {
  margin-bottom: 8px;
  background: rgb(27, 27, 27);
  padding: 10px;
  border-radius: 8px;
  .item {
    border-radius: 4px;
    min-width: 402px;
    letter-spacing: 0;
    .item-main {
      .header {
        // height: 73px;
        .top {
          display: flex;
          align-items: center;
          .avatar {
            height: 48px;
            width: 48px;
            margin-right: 10px;
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
          .name {
            height: 24px;
            display: flex;
            align-items: center;
            cursor: pointer;
            font-size: 16px;
          }
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
          width: auto;
          .desc {
            padding-right: 10px;
            font-size: 14px;
            letter-spacing: 0.5px;
            line-height: 22px;
            white-space: pre-wrap;
            word-break: break-word;
            margin-bottom: 20px;
          }
          .stuff {
            margin-top: 10px;
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
        }
      }
    }
  }
}
</style>
