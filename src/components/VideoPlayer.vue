<template>
  <div class="player-container" ref="playerContainer">
    <div class="video-box">
      <video ref="videoPlayer" loop="true" @click="toggleVideo"></video>
    </div>
    <div class="video-box-bottom">
      <div
        class="progress"
        ref="progressBar"
        @click="gotoHere"
        @mousedown="startDragging"
        @mousemove="drag"
        @mouseup="stopDragging"
        @mouseleave="stopDragging"
      >
        <div class="preload" ref="preloadBar"></div>
        <div class="now" ref="nowBar"></div>
      </div>
      <div class="controll">
        <div class="left">
          <div class="play" @click="toggleVideo">
            <img src="../assets/icon/播放.png" alt="" />
          </div>
          <div class="volume">
            <img src="@/assets/icon/音量.png" />
            <input
              type="range"
              class="volume-slider"
              min="0"
              max="100"
              step="1"
              @input="changeVolume"
            />
          </div>
          <div class="time">
            <span ref="nowTime">00:00</span>
            <span>/</span>
            <span ref="totalTime">00:00</span>
          </div>
        </div>
        <div class="right">
          <div class="quality">720 高清</div>
          <div class="playrate">倍速</div>

          <div class="fullscrean">
            <img src="@/assets/icon/全屏.png" @click="fullscrean" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Hls from "hls.js/dist/hls.min.js";

const videoPlayer = ref();
const playerContainer = ref();
const progressBar = ref();
const nowBar = ref();
const preloadBar = ref();
const totalTime = ref();
const nowTime = ref();
let timer: any = null;
let countTimer: any = null;
let loadedFragments: any = [];
let isDragging = ref(false);
const hls = new Hls();
onMounted(() => {
  setInfo();
});
function changeVolume(e: Event) {
  const volumeSlider = e.target as HTMLInputElement;
  videoPlayer.value.volume = parseInt(volumeSlider.value) / 100;
}
function setProgress(
  cur: number,
  total: number,
  width: number,
  dom: HTMLElement
) {
  let percent = (cur / total) * width;
  dom.style.width = percent + "px";
}
function updateProgress() {
  const player = videoPlayer.value;
  const pcon = playerContainer.value;
  const pconWidth = pcon.clientWidth;
  const now = nowBar.value;
  setProgress(player.currentTime, player.duration, pconWidth, now);
}
function updatePreloadProgress(loadedFragments: any, totalFragments: any) {
  const pcon = playerContainer.value;
  const pconWidth = pcon.clientWidth;
  const preload = preloadBar.value;
  setProgress(loadedFragments, totalFragments, pconWidth, preload);
}
function setInfo() {
  if (Hls.isSupported()) {
    hls.loadSource("http://localhost:3000/1680352225597/1680352225597.m3u8"); // 替换为你的m3u8文件路径
    hls.attachMedia(videoPlayer.value);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {});
    hls.on(Hls.Events.FRAG_LOADED, (event: any, data: any) => {
      // 计算加载的片段数量
      console.log(event);
      if (!loadedFragments.includes(data.frag.sn)) {
        loadedFragments.push(data.frag.sn);
      }
      // 获取总片段数量
      if (hls.levels && hls.levels[hls.currentLevel]) {
        const totalFragments =
          hls.levels[hls.currentLevel].details.fragments.length;
        // 更新预加载进度条
        console.log(loadedFragments.length, totalFragments);
        updatePreloadProgress(loadedFragments.length, totalFragments);
      } else {
        console.warn("Unable to access level details");
      }
    });
    hls.on(Hls.Events.ERROR, (event: any, data: any) => {
      console.error("Error event:", event, "Data:", data);
    });
  } else if (videoPlayer.value.canPlayType("application/vnd.apple.mpegurl")) {
    videoPlayer.value.addEventListener("loadedmetadata", () => {
      timer = setInterval(updateProgress, 10);
    });
  } else {
    console.error("该浏览器不支持HLS播放");
  }
}
function toggleVideo() {
  if (videoPlayer.value.paused) {
    setall();
    videoPlayer.value.play();
  } else {
    clearAll();
    videoPlayer.value.pause();
  }
}
function setTime() {
  const player = videoPlayer.value;
  const total = totalTime.value;
  const now = nowTime.value;
  const totalMin = Math.floor(player.duration / 60);
  const totalSec = Math.floor(player.duration % 60);
  const nowMin = Math.floor(player.currentTime / 60);
  const nowSec = Math.floor(player.currentTime % 60);
  total.innerHTML = `${totalMin < 10 ? "0" + totalMin : totalMin}:${
    totalSec < 10 ? "0" + totalSec : totalSec
  }`;
  now.innerHTML = `${nowMin < 10 ? "0" + nowMin : nowMin}:${
    nowSec < 10 ? "0" + nowSec : nowSec
  }`;
}
function fullscrean() {
  const playerContainer = videoPlayer.value.closest(".player-container");
  const requestFullScreenMethods = [
    "requestFullscreen",
    "webkitRequestFullscreen",
    "mozRequestFullScreen",
    "msRequestFullscreen",
  ];
  for (const method of requestFullScreenMethods) {
    if (playerContainer[method]) {
      playerContainer[method]();
      break;
    }
  }
}
function setall() {
  timer = setInterval(updateProgress, 10);
  countTimer = setInterval(setTime, 10);
}
function clearAll() {
  clearInterval(countTimer);
  clearInterval(timer);
}
function gotoHere(e: MouseEvent) {
  if (videoPlayer.value.currentTime <= 0) return;
  let cur = e.offsetX / progressBar.value.clientWidth;
  videoPlayer.value.currentTime = cur * videoPlayer.value.duration;
  updateProgress();
}
function startDragging(e: MouseEvent) {
  if (videoPlayer.value.currentTime <= 0) return;
  isDragging.value = true;
}
function drag(e: MouseEvent) {
  if (!isDragging.value) return;
  let offsetX = Math.min(Math.max(e.offsetX, 0), progressBar.value.clientWidth);
  let cur = offsetX / progressBar.value.clientWidth;
  videoPlayer.value.currentTime = cur * videoPlayer.value.duration;
  updateProgress();
}
function stopDragging(e: MouseEvent) {
  if (!isDragging.value) return;
  isDragging.value = false;
}
onUnmounted(() => {
  clearInterval(timer);
  hls.destroy();
});
</script>

<style lang="scss" scoped>
.player-container {
  user-select: none;
  &:hover {
    .video-box-bottom .controll {
      height: 45px;
    }
  }
  z-index: 99;
  position: relative;
  width: 100%;
  .video-box {
    width: 100%;
    video {
      width: 100%;
    }
  }
  .video-box-bottom {
    padding: 0px;
    transition: padding;
    width: 100%;
    bottom: 0;
    position: absolute;
    .progress {
      cursor: pointer;
      height: 5px;
      width: 100%;
      position: relative;
      background-color: rgba(211, 211, 211, 0.432);
      .now {
        width: 0;
        height: 5px;
        background-color: rgb(255, 0, 0);
        transition: width 10ms;
        position: absolute;
        top: 0;
        left: 0;
      }
      .preload {
        width: 0;
        height: 5px;
        background-color: rgba(255, 255, 255, 0.5);
        transition: width 10ms;
        position: absolute;
        top: 0;
        left: 0;
      }
    }
    .controll {
      bottom: 0;
      height: 0px;
      transition: height;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: transparent;
      .left {
        display: flex;
        align-items: center;
        height: 100%;
        .time {
          font-size: 16px;
          font-weight: 600;
        }
        .play {
          cursor: pointer;
          margin-right: 10px;
          width: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          img {
            width: 24px;
            height: 24px;
          }
        }
        .volume {
          &:hover {
            .volume-slider {
              width: 100px;
              opacity: 1;
            }
          }
          cursor: pointer;
          display: flex;
          align-items: center;
          margin-right: 12px;
          height: 100%;
          img {
            width: 24px;
            height: 24px;
          }
          .volume-slider {
            &:focus {
              outline: none;
            }

            cursor: pointer;
            margin-left: 10px;
            width: 0px;
            opacity: 0;
            transition: width 0.5s;
            height: 3px;
            &::-webkit-slider-runnable-track {
              -webkit-appearance: none;
              width: 100%;
              height: 5px;
              background: #ffffff;
              border-radius: 20px;
            }
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              margin-top: -5px;
              height: 15px;
              width: 15px;
              border-radius: 50%;
              background-color: #ffffff;
              cursor: pointer;
            }
          }
        }
      }
      .right {
        display: flex;
        align-items: center;
        .quality {
          margin-right: 12px;
          font-size: 16px;
        }
        .playrate {
          margin-right: 12px;
          cursor: pointer;
          font-weight: 600;
          font-size: 16px;
        }
        .fullscrean {
          width: 18px;
          height: 18px;
          img {
            width: 18px;
            height: 18px;
          }
        }
      }
    }
  }
}
</style>
