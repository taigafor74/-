<template>
  <div class="upload-video-con">
    <div class="tr-box">
      <Transition name="bounce">
        <div
          class="box"
          @click="uploadFile"
          @dragover.prevent
          @drop="handleDrop"
          v-if="isShow"
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
        <div class="ok-img" v-if="!isShow">
          <img src="@/assets/icon/OK.png" alt="" />
          <div class="btn">
            <el-button color="#d305de" @click="uploadAgain">
              重新上传
            </el-button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import request from "@/axios/index";
import { useUploadStore } from "@/stores/upload";
const uploadStore = useUploadStore();
const isShow = ref(true);
const fileInput = ref(null);
async function fileChange(e: any) {
  const file = e.target.files[0];
  e.target.value = "";
  processFile(file);
}
function uploadAgain() {
  isShow.value = true;
  uploadStore.setUrl("");
}
function processFile(file) {
  const videoUrl = URL.createObjectURL(file);
  uploadStore.setFile(file);
  uploadStore.setUrl(videoUrl);
  isShow.value = false;
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
    processFile(file);
  }
}
</script>

<style lang="scss" scoped>
.upload-video-con {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  .tr-box {
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    position: relative;
    .ok-img {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      position: absolute;
      left: -6.2px;
      top: 50%;
      transform: translateY(-50%);
      img {
        width: 100%;
      }
      .btn {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }
    .box {
      width: 100%;
      height: 180px;
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
          background: rgb(173, 8, 182);
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
// .bounce-leave-active {
//   animation: bounce-in 1s reverse;
// }
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

@keyframes scaleimg-in {
  0% {
    transform: translateY(-50%) scale(0);
  }
  50% {
    transform: translateY(-50%) scale(1) rotate(-45deg);
  }
  75% {
    transform: translateY(-50%) scale(1) rotate(45deg);
  }
  100% {
    transform: translateY(-50%) scale(1) rotate(0deg);
  }
}
</style>
