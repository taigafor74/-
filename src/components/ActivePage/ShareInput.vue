<template>
  <div class="share-input-box">
    <el-input
      v-model="textarea"
      autosize
      type="textarea"
      :placeholder="placeholder"
      maxlength="100"
      show-word-limit
      resize="none"
    />

    <div class="btn">
      <el-button type="primary" @click="share">转发</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { shareActive } from "@/api/active";
import { ElMessage } from "element-plus";
const store = useUserStore();
const textarea = ref("");
const placeholder = ref("有什么想和大家分享的？");
const props = defineProps({
  item: Object,
});
onMounted(() => {
  console.log(props.item);
  if (props.item.target_user_id) {
    placeholder.value = `//@${props.item.uname}：${props.item.active_content}`;
  }
});
const share = async () => {
  if (store.isLoggedIn) {
    const originActiveId = props.item.origin_active_id || props.item.active_id;
    const form = {
      senderId: store.id,
      targetId: props.item.active_id,
      content: textarea.value,
      targetUserId: props.item.active_sender_id,
      originActiveId,
    };
    const res = await shareActive(form);
    if (res.success) {
      ElMessage.success("转发成功!");
    } else {
      ElMessage.error("转发失败!");
    }
  } else {
    ElMessage.error("请先登录!");
  }
};
</script>

<style lang="scss" scoped>
.share-input-box {
  background-color: #000000;
  border-radius: 4px;
  box-sizing: border-box;
  padding: 16px 16px 0 0;
  width: 100%;
  display: flex;
  .btn {
    margin-left: 20px;
  }
}
</style>
