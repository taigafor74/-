<template>
  <div class="up-video-img-con">
    <div class="title-bar">
      <div class="title-left">截取封面</div>
      <div class="title-right">上传封面</div>
    </div>
    <div class="main">
      <canvas ref="mainCanvas" width="480" height="270"></canvas>
      <video :src="videoUrl" style="display: none" ref="video"></video>
      <div class="custom-upload">
        <el-upload
          class="avatar-uploader"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </div>
    </div>
    <div class="slide" ref="slideBar">
      <canvas ref="slideCanvas" class="slide-canvas"></canvas>
      <el-tooltip content="Top center" placement="top">
        <div
          class="slide-square"
          ref="slideSquare"
          @mousedown="handleMouseDown"
        ></div>
      </el-tooltip>
    </div>
    <div class="button">
      <div class="left">
        <el-button color="purple">上传截取封面</el-button>
      </div>
      <div class="right">
        <el-button color="purple">上传自定封面</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
const mainCanvas = ref<HTMLCanvasElement>();
const slideCanvas = ref<HTMLCanvasElement>();
const video: any = ref();
const videoUrl = new URL("@/assets/2.mp4", import.meta.url).href;
const slideSquare = ref<HTMLDivElement>();
const slideBar = ref<HTMLDivElement>();
const tooltip = ref<HTMLElement>();
const videoDuration = ref(0);
const spTime = ref(0);
const newLeft = ref(0);
let isDragging = false;
//右侧
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
const imageUrl = ref("");
const handleAvatarSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile
) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};
const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

//左侧
onMounted(async () => {
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
    console.log(newLeft);
    video.value.currentTime =
      (newLeft / slideBar.value.offsetWidth) * videoDuration.value;
    mainDraw();
  }
});
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
  width: 800px;
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
      width: 480px;
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
    .custom-upload {
      flex: 1;
      height: 270px;
      display: flex;
      justify-content: center;
      align-items: center;
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
  }
  .button {
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .left {
      width: 480px;
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
