<template>
  <div class="input-con">
    <el-input
      v-model="textarea"
      autosize
      type="textarea"
      placeholder="有什么想和大家分享的？"
      maxlength="300"
      show-word-limit
      resize="none"
    />
    <div class="controll">
      <div class="icon">
        <!-- <div class="emoji">
          <svg
            t="1682400984654"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6074"
            fill="white"
            width="24"
            height="24"
          >
            <path
              d="M341.333333 284.444444a56.888889 56.888889 0 0 1 56.888889 56.888889v113.777778a56.888889 56.888889 0 1 1-113.777778 0V341.333333a56.888889 56.888889 0 0 1 56.888889-56.888889z m341.333334 0a56.888889 56.888889 0 0 1 56.888889 56.888889v113.777778a56.888889 56.888889 0 1 1-113.777778 0V341.333333a56.888889 56.888889 0 0 1 56.888889-56.888889zM113.777778 74.524444a39.253333 39.253333 0 0 0-39.253334 39.253334v796.444444c0 21.674667 17.578667 39.253333 39.253334 39.253334h796.444444a39.253333 39.253333 0 0 0 39.253334-39.253334V113.777778a39.253333 39.253333 0 0 0-39.253334-39.253334H113.777778zM113.777778 0h796.444444a113.777778 113.777778 0 0 1 113.777778 113.777778v796.444444a113.777778 113.777778 0 0 1-113.777778 113.777778H113.777778a113.777778 113.777778 0 0 1-113.777778-113.777778V113.777778a113.777778 113.777778 0 0 1 113.777778-113.777778z m150.016 762.88a37.262222 37.262222 0 0 1 38.855111-63.658667c70.997333 43.349333 140.970667 64.739556 210.488889 64.739556 69.404444 0 139.434667-21.390222 210.488889-64.739556a37.262222 37.262222 0 1 1 38.798222 63.601778c-82.261333 50.232889-165.546667 75.662222-249.287111 75.662222-83.797333 0-167.082667-25.429333-249.344-75.662222z"
              p-id="6075"
            ></path>
          </svg>
        </div> -->
        <div class="img" @click="dialogTableVisible = true">
          <svg
            t="1682401271641"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="16383"
            width="27"
            height="27"
            fill="white"
          >
            <path
              d="M847.8 64.8H176.2c-61.8 0-111.9 50.1-111.9 111.8v670.8c0 61.8 50.1 111.8 111.9 111.8h671.5c61.8 0 111.9-50.1 111.9-111.8V176.6c0.1-61.7-50.1-111.8-111.8-111.8z m-658.6 71.1h645.4c29.7 0 53.8 24 53.8 53.7V640L751.2 454.8c-6.8-9.3-17.8-14.9-29.6-15.2-11.8-0.3-23.1 4.7-30.4 13.6L491.3 694.4l-128.9-117c-13.2-12-33.6-13.2-48.2-2.8L135.5 701.4V189.6c0-29.6 24-53.7 53.7-53.7zM834.7 888H189.2c-29.7 0-53.8-24-53.8-53.7v-44.1c2.2-1 4.4-2.2 6.4-3.7l191.8-136 135.7 123.2c7.7 7 18 10.5 28.5 9.8s20.2-5.6 26.8-13.5L719 535.5l154.7 209c3.9 5.3 9.1 9.2 14.8 11.8v78c0 29.6-24.1 53.7-53.8 53.7z"
              p-id="16384"
            ></path>
            <path
              d="M341 424c57.3 0 104-46.7 104-104s-46.7-104-104-104-104 46.7-104 104 46.7 104 104 104z m0-136c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.2-32 32-32z"
              p-id="16385"
            ></path>
          </svg>
          <el-dialog
            v-model="dialogTableVisible"
            title="上传图片"
            width="600px"
          >
            <el-upload
              v-model:file-list="fileList"
              :auto-upload="false"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :limit="9"
            >
              <el-icon><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </el-dialog>
        </div>
      </div>
      <div class="button">
        <el-button type="primary" :disabled="!isActive" @click="sendSubmit"
          >发布</el-button
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import { Delete, Plus, ZoomIn } from "@element-plus/icons-vue";
import { ElMessage, type UploadProps, type UploadUserFile } from "element-plus";
import type { UploadFile } from "element-plus";
import { postActive } from "@/api/active";
import { useUserStore } from "@/stores/user";
import router from "@/router";
const textarea = ref("");
const store = useUserStore();
const isActive = computed(() => {
  return textarea.value.length > 0 ? true : false;
});
const dialogTableVisible = ref(false);
const disabled = ref(false);
const fileList = ref<UploadUserFile[]>([]);
const dialogImageUrl = ref("");
const dialogVisible = ref(false);
let formData = new FormData();
const handleExceed = (files, fileList) => {
  ElMessage.warning(`最多只能上传9张图片`);
};
const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles.length);
};
const handlePictureCardPreview: UploadProps["onPreview"] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!;
  dialogVisible.value = true;
};
const sendSubmit = async () => {
  if (store.isLoggedIn) {
    if (fileList.value.length > 0) {
      await handleFileList(fileList.value);
    }
    formData.append("content", textarea.value);
    formData.append("userId", store.id);
    formData.append("type", "origin");
    const res = await postActive(formData);
    if (res.success) {
      ElMessage.success("发布成功");
      textarea.value = "";
      fileList.value = [];
      formData = new FormData();
      router.go(0);
    } else {
      ElMessage.error("发布失败");
      textarea.value = "";
      fileList.value = [];
      formData = new FormData();
    }
  } else {
    ElMessage.error("请先登录");
  }
};
const handleFileList = async (fileList: UploadFile[]) => {
  fileList.forEach((item, index) => {
    formData.append(`file`, item.raw);
  });
};
</script>

<style lang="scss" scoped>
:deep(.el-upload-list) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
.input-con {
  background-color: transparent;
  border-radius: 4px;
  box-sizing: border-box;
  min-width: 632px;
  padding: 16px;
  width: 100%;
  margin-bottom: 20px;
  .icon {
    display: flex;
    align-items: center;
    .emoji {
      cursor: pointer;
      svg {
        &:hover {
          fill: red;
        }
      }
    }
    .img {
      cursor: pointer;

      svg {
        &:hover {
          fill: red;
        }
      }
    }
  }
  .controll {
    margin-top: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
