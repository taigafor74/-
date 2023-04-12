<template>
  <div class="upload-video-con">
    <div class="tr-box">
      <Transition name="bounce">
        <div
          class="box"
          @click="uploadFile"
          @dragover.prevent
          @drop="handleDrop"
          v-show="isShow"
        >
          <div class="upload">
            <img src="@/assets/icon/上传.png" alt="" />
            <div class="info">拖拽也可上传</div>
            <div class="btn">上传视频</div>
            <input
              ref="fileInput"
              accept=".mp4"
              type="file"
              style="display: none"
              @change="fileChange"
            />
          </div>
        </div>
      </Transition>
      <Transition name="scaleimg">
        <img
          class="ok-img"
          src="@/assets/icon/投稿.png"
          alt=""
          v-show="!isShow"
        />
      </Transition>
    </div>
    <div class="progress">
      <el-progress :percentage="progress" :format="format" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import request from "@/axios/index";
const isShow = ref(true);
const fileInput = ref(null);
const progress = ref(0);
function processFile(file: File) {
  const formData = new FormData();
  formData.append("file", fileBlob);
  console.log(formData);
}
watch(
  () => progress.value,
  (newVal) => {
    if (newVal === 100) {
      isShow.value = false;
    }
  }
);
async function fileChange(e: any) {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);
  formData.append("title", "Example Video Title");
  try {
    const response = await request.post("/videos/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        progress.value = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );
      },
    });
    console.log("File uploaded successfully:", response);
  } catch (error) {
    console.error("File upload failed:", error);
  }
  e.target.value = null;
}

function uploadFile() {
  if (fileInput.value) {
    fileInput.value.click();
  }
}

function handleDrop(e: DragEvent) {
  e.preventDefault();
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    const file = files[0];
    const fileBlob = new Blob([file], { type: "video/mp4" });
    processFile(fileBlob);
  }
}
</script>

<style lang="scss" scoped>
.upload-video-con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  .progress {
    width: 80%;
  }
  .tr-box {
    width: 100%;
    height: 284px;
    position: relative;
    .ok-img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 200px;
      height: 200px;
    }
    .box {
      width: 100%;
      height: 284px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 2px dashed #ccc;
      color: #dadada;
      font-size: 14px;
      text-align: center;
      .upload {
        flex: 1;
        cursor: pointer;
        img {
          width: 40px;
          height: 40px;
        }
        .info {
          font-size: 13px;
          color: #dadada;
          margin-top: 6px;
        }
        .btn {
          color: #fff;
          margin: 20px auto;
          width: 200px;
          height: 44px;
          cursor: pointer;
          background: #00a1d6;
          border-radius: 4px;
          text-align: center;
          line-height: 40px;
          white-space: nowrap;
        }
      }
    }
  }
}
.bounce-enter-active {
  animation: bounce-in 1s;
}
.bounce-leave-active {
  animation: bounce-in 1s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

.scaleimg-enter-active {
  animation: scaleimg-in 1s;
}
.scaleimg-leave-active {
  animation: scaleimg-in 1s reverse;
}
@keyframes scaleimg-in {
  0% {
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
