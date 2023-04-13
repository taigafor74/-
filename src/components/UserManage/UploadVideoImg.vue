<template>
  <div class="up-video-img-con">
    <div class="title-bar">
      <div class="title-left">截取封面</div>
      <div class="title-right">上传封面</div>
    </div>
    <div class="main">
      <canvas ref="mainCanvas" class="mainCanvas" height="270"></canvas>
      <video :src="store.url" style="display: none" ref="video"></video>
      <div class="custom-upload">
        <el-upload
          v-if="!isUpload"
          class="avatar-uploader"
          :show-file-list="false"
          action="#"
          :on-change="imgChange"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <img v-if="isUpload" ref="customImg" />
      </div>
    </div>
    <div class="slide" ref="slideBar">
      <canvas ref="slideCanvas" class="slide-canvas"></canvas>
      <div
        class="slide-square"
        ref="slideSquare"
        @mousedown="handleMouseDown"
        @mouseover="showTime = true"
        @mouseout="showTime = false"
      >
        <div class="slide-time" v-if="showTime">
          {{ slideTime }}
        </div>
      </div>
    </div>
    <div class="button">
      <div class="left">
        <el-button color="purple" @click="cutSubmit">上传截取封面</el-button>
      </div>
      <div class="right">
        <el-button color="purple" @click="customSubmit">上传自定封面</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from "vue";
import { useUploadStore } from "@/stores/upload";
import { ElMessage, ElMessageBox } from "element-plus";
import type { Action } from "element-plus";
const store = useUploadStore();
const mainCanvas = ref<HTMLCanvasElement>();
const slideCanvas = ref<HTMLCanvasElement>();
const video: any = ref();
const showTime = ref(false);
const slideSquare = ref<HTMLDivElement>();
const slideBar = ref<HTMLDivElement>();
const tooltip = ref<HTMLElement>();
const videoDuration = ref(0);
const spTime = ref(0);
const newLeft = ref(0);
const customImg = ref<HTMLImageElement>();
let isDragging = false;
const isUpload = ref(false);
const imgUrl = ref("");
const slideTime = ref("00:00:00");
onUnmounted(() => {
  isDragging = false;
});
//右侧
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
const imageUrl = ref("");
function imgChange(file) {
  const reader = new FileReader();
  isUpload.value = true;
  reader.onload = (e) => {
    imgUrl.value = e.target.result;
    customImg.value.src = imgUrl.value;
  };
  reader.readAsDataURL(file.raw);
}
function cutSubmit() {
  if (!video.value) {
    ElMessage.error("请上传视频");
    return;
  }
  imgUrl.value = mainCanvas.value.toDataURL("image/png");
  store.setImgUrl(imgUrl.value);
  store.setVisible(false);
  isUpload.value = false;
}
function customSubmit() {
  if (!imgUrl.value) {
    ElMessage.error("请上传图片");
    return;
  }
  store.setImgUrl(imgUrl.value);
  store.setVisible(false);
  isUpload.value = false;
}
//左侧
onMounted(async () => {
  if (!store.url) {
    ElMessageBox.alert("请先上传视频！！", {
      confirmButtonText: "好吧",
      callback: (action: Action) => {
        store.setVisible(false);
      },
    });
  }
  if (video.value) {
    await new Promise((resolve) => {
      video.value.addEventListener("loadedmetadata", () => {
        videoDuration.value = Math.floor(video.value.duration);
        spTime.value = Math.floor(video.value.duration / 6);
        video.value.currentTime = 0;
        video.value.addEventListener(
          "seeked",
          () => {
            mainDraw();
            resolve();
          },
          { once: true }
        );
      });
    });
    // 获取视频的宽度和高度
    const videoWidth = video.value.videoWidth;
    const videoHeight = video.value.videoHeight;
    // 将视频的宽度和高度设置为canvas的宽度和高度
    slideCanvas.value.width = videoWidth;
    slideCanvas.value.height = videoHeight;
    drawSlide();
  }
});
async function drawSlide() {
  if (slideCanvas.value) {
    const spWidth = slideCanvas.value.width / 6;
    const ctx = slideCanvas.value.getContext("2d");
    const drawVideoFrame = (index) => {
      return new Promise((resolve) => {
        video.value.currentTime = spTime.value * index;
        video.value.addEventListener(
          "seeked",
          () => {
            ctx.drawImage(
              video.value,
              spWidth * index,
              0,
              spWidth,
              slideCanvas.value.height
            );
            resolve();
          },
          { once: true }
        );
      });
    };

    for (let i = 0; i < 6; i++) {
      await drawVideoFrame(i);
    }
  }
}
watch(newLeft, (newLeft) => {
  if (video.value) {
    video.value.currentTime =
      (newLeft / slideBar.value.offsetWidth) * videoDuration.value;
    slideTime.value = formatTime(video.value.currentTime);
    setTimeout(() => {
      mainDraw();
    }, 500);
  }
});
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function mainDraw() {
  const ctx = mainCanvas.value.getContext("2d");
  ctx.drawImage(
    video.value,
    0,
    0,
    mainCanvas.value.width,
    mainCanvas.value.height
  );
}
function handleMouseDown(event) {
  isDragging = true;
  showTime.value = true;
  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}
function handleMouseMove(event) {
  if (!isDragging) return;
  const slideBarRect = slideBar.value.getBoundingClientRect();
  newLeft.value = event.clientX - slideBarRect.left;
  if (
    newLeft.value >= 0 &&
    newLeft.value <= slideBarRect.width - slideSquare.value.offsetWidth
  ) {
    slideSquare.value.style.left = newLeft.value + "px";
  }
}
function handleMouseUp() {
  isDragging = false;
  showTime.value = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

:deep(.avatar-uploader .el-upload:hover) {
  border-color: purple;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.up-video-img-con {
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 10px;
  border: 1px solid white;
  .title-bar {
    height: 50px;
    width: 100%;
    display: flex;
    border-bottom: 1px solid white;
    color: purple;
    .title-left {
      height: 100%;
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-right: 1px solid white;
    }
    .title-right {
      height: 100%;
      display: flex;
      flex: 1;
      justify-content: center;
      align-items: center;
    }
  }
  .main {
    height: 300px;
    width: 100%;
    display: flex;
    align-items: center;
    .mainCanvas {
      width: 60%;
      height: 270px;
    }
    .custom-upload {
      flex: 1;
      height: 270px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 180px;
      }
    }
  }
  .slide {
    height: 80px;
    width: 100%;
    background-color: #c9f504;
    .slide-canvas {
      position: absolute;
      left: 0;
      z-index: 9;
      height: 100%;
      width: 100%;
    }
    position: relative;
    .slide-square {
      z-index: 99;
      position: absolute;
      left: 0;
      cursor: pointer;
      height: 100%;
      width: 10px;
      border-radius: 5px;
      border: 2px solid rgb(255, 0, 238);
      background-color: #000000;
    }
    .slide-time {
      position: absolute;
      top: -25px; /* Adjust this value to position the time div above the slide-square */
      left: 50%;
      align-items: center;
      height: 20px;
      transform: translateX(-50%);
      z-index: 100;
      border-radius: 5px;
      width: 60px;
      font-size: 12px;
      display: flex;
      justify-content: center;
      background: purple;
      color: #ffffff;
    }
  }
  .button {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      width: 60%;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      border-right: 1px solid white;
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
    }
  }
}
</style>
