<template>
  <div class="nav-bar">
    <div class="title">
      <span class="comment">评论</span>
      <span class="number">{{ data }}</span>
    </div>
    <!-- <div class="sort">
      <div class="hot">最热</div>
      <div class="part"></div>
      <div class="time">最新</div>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { getVideoTotalComment } from "@/api/comment";
const data = ref(0);
const route = useRoute();
onMounted(async () => {
  const res = await getVideoTotalComment(route.query.vid);
  data.value = res;
});
</script>

<style lang="scss" scoped>
.nav-bar {
  display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 22px;
  .title {
    font-size: 20px;
    display: flex;
    align-items: center;
    .comment {
      color: white;
      font-weight: 700;
    }
    .number {
      font-size: 13px;
      margin: 0 36px 0 6px;
      font-weight: normal;
      color: rgb(189, 188, 188);
    }
  }
  .sort {
    font-size: 13px;
    display: flex;
    align-items: center;
    color: rgb(189, 188, 188);
    font-weight: 400;
    .hot {
      cursor: pointer;
    }
    .part {
      height: 11px;
      margin: 0 12px;
      border-left: solid 1px;
    }
    .time {
      cursor: pointer;
    }
  }
}
</style>
