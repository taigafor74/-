<template>
  <div class="user-announce-container">
    <div ref="head" class="head">公告</div>
    <div class="text-area">
      <textarea
        rows="4"
        type="textarea"
        placeholder="请输入公告内容"
        maxlength="150"
        @blur="handleBlur"
        :disabled="!isMe"
        v-model="textarea"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { getInfo, updateDesc } from "@/api/user";
import { updateAvatar } from "@/api/user";
import { useRoute } from "vue-router";
const route = useRoute();
const isUpload = ref(false);
const dialogVisible = ref(false);
const textarea = ref("");
const customImg = ref<HTMLImageElement>();
const imageUrl = ref("");
const updateImg = ref("");
const store = useUserStore();
const isMe = ref(false);
const handleBlur = async () => {
  const res = await updateDesc(store.id, textarea.value);
};
onMounted(async () => {
  const res = await getInfo(route.params.id);
  textarea.value = res.data.desc;
});
watchEffect(() => {
  if (store.isLoggedIn) {
    if (store.id) {
      if (store.id == route.params.id) {
        isMe.value = true;
        console.log("isMe", isMe.value);
      }
    }
  }
});
</script>
<style lang="scss" scoped>
.user-announce-container {
  width: 100%;
  margin-bottom: 0.585823vw;
  padding: 0.878735vw 1.171646vw 1.054482vw;
  height: 260px;
  background: rgb(0, 0, 0);
  border: 0.05852vw solid rgb(61, 2, 199);
  border-radius: 0.492912vw;
  .head {
    display: flex;
    align-items: center;
    font-size: 14px;
    height: 45px;
    line-height: 45px;
    margin: -18px 0 10px;
    border-bottom: 0.058582vw solid #7c7a7a;
  }
  //1
  .text-area {
    textarea {
      color: white;
      background: transparent;
      width: 280px;
      height: 10.076157vw;
      font-size: 0.702988vw;
      padding: 0.585823vw;
      margin: -0.65823vw 0 0 -0.644405vw;
      border-radius: 0.234329vw;
      box-sizing: content-box;
      outline: none;
      border: 0.058582vw solid transparent;
      transition: all 0.3s ease;
      resize: none;
      &:hover {
        border: 0.058582vw solid rgb(61, 2, 199);
      }
      &:focus {
        border: 0.058582vw solid rgb(61, 2, 199);
      }
    }
  }
}
</style>
