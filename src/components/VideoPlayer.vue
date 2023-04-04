<template>
  <div
    class="player-container"
    ref="playerContainer"
    @mouseleave="showSetting = false"
  >
    <div class="video-box">
      <video ref="videoPlayer" loop="true" @click="toggleVideo"></video>
      <div class="danmaku" ref="danmakuCon" @click="maskDanmaku">
        <span class="danmakuspan">fuck</span>
      </div>
    </div>
    <div class="video-box-bottom">
      <div class="setting-con" v-if="showSetting">
        <div class="nothing" @click="showSetting = false"></div>
        <div class="setting-box">
          <div class="menu" ref="settingBmenu">
            <div class="item" @click="showPlayRate" ref="menuItem1">
              <div class="left">
                <img src="@/assets/icon/速度.png" /><span>播放速度</span>
              </div>
              <div class="right">
                <span>{{ nowPlayRate }}x</span
                ><img src="@/assets/icon/右箭头.png" />
              </div>
            </div>
            <div class="item" ref="menuItem2" @click="showQuality">
              <div class="left">
                <img src="@/assets/icon/清晰度.png" /><span>清晰度</span>
              </div>
              <div class="right">
                <span>{{ nowQuality }}p</span
                ><img src="@/assets/icon/右箭头.png" />
              </div>
            </div>
          </div>
          <div class="playrate-box" ref="playerRateBox">
            <div class="item" @click="initPlayRate">退出</div>
            <div
              class="item"
              v-for="item in playRateArr"
              @click="setPlayRate(item)"
            >
              {{ item }}
            </div>
          </div>
          <div class="quality-box" ref="qualitybox">
            <div class="item" @click="initQuality">退出</div>
            <div
              class="item"
              v-for="item in qualityArr"
              @click="setQuality(item)"
            >
              {{ item }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="progress"
        ref="progressBar"
        @click="gotoHere"
        @mousedown="startDragging"
      >
        <div class="preload" ref="preloadBar"></div>
        <div class="now" ref="nowBar"></div>
      </div>
      <div class="controll">
        <div class="left">
          <div class="play" @click="toggleVideo">
            <img src="../assets/icon/播放.png" alt="" ref="playImg" />
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
          <div class="icon setting">
            <img
              src="@/assets/icon/白设置.png"
              @click="showSetting = !showSetting"
            />
          </div>
          <div class="icon window">
            <img src="@/assets/icon/小窗口.png" @click="fullscrean" />
          </div>
          <div class="icon browserfull">
            <img src="@/assets/icon/网页全屏.png" @click="fullscrean" />
          </div>
          <div class="icon fullscrean">
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
const menuItem1 = ref();
const menuItem2 = ref();
const playerContainer = ref();
const qualitybox = ref();
const progressBar = ref();
const nowBar = ref();
const preloadBar = ref();
const totalTime = ref();
const nowTime = ref();
const playImg = ref();
const settingBmenu = ref();
const playerRateBox = ref();
const danmakuCon = ref();
let timer: any = null;
let showSetting = ref(false);
let loadedFragments: any = [];
let isDragging = ref(false);
let hls = new Hls();
const qualityArr = [360, 480, 720, 1080];
const playRateArr = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
const nowPlayRate = ref(1);
const nowQuality = ref(720);
let src = "1680539678412";
let testSrc = ref(
  "http://localhost:3000/1680539678412/720p/1680539678412_720p.m3u8"
);
let currentDanmakuIndex = 0;
//给出100个弹幕的数组
const danmakuArr = [
  {
    text: "diwoajhidjawdiwadwadpiwajdwadpwajp",
    time: 5,
    color: "red",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "diwoajhidjawdiwadwadpiwajdwadpwajp",
    time: 5,
    color: "red",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "diwoajhidjawdiwadwadpiwajdwadpwajp",
    time: 5,
    color: "red",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕2",
    time: 20,
    color: "green",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕3",
    time: 31,
    color: "blue",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕4",
    time: 34,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕5",
    time: 35,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕6",
    time: 36,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕7",
    time: 37,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕8",
    time: 38,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕9",
    time: 39,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕10",
    time: 40,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕11",
    time: 42,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕12",
    time: 43,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
  {
    text: "弹幕13",
    time: 44,
    color: "#fff",
    speed: 1,
    fontSize: 20,
  },
];

onMounted(() => {
  setInfo(testSrc.value);
  danmakuPool.init();
});
const danmakuPool = {
  pool: [] as any,
  activePool: [] as any,
  size: 50, // 根据实际需求调整池大小
  init: function () {
    for (let i = 0; i < this.size; i++) {
      const danmaku = document.createElement("span");
      danmaku.classList.add("danmakuspan");
      this.pool.push(danmaku);
    }
  },
  getDanmaku: function () {
    if (this.pool.length > 0) {
      return this.pool.shift();
    } else {
      const danmaku = document.createElement("span");
      danmaku.classList.add("danmakuspan");
      return danmaku;
    }
  },
  returnDanmaku: function (danmaku: any) {
    this.pool.push(danmaku);
  },
};

function setDanmaku() {
  const player = videoPlayer.value;
  const currentTime = player.currentTime;
  let width = player.clientWidth;
  let height = player.clientHeight;
  if (currentDanmakuIndex < danmakuArr.length) {
    let time = danmakuArr[currentDanmakuIndex].time;
    if (time == currentTime.toFixed(0)) {
      let danmaku = danmakuPool.getDanmaku();
      let dt = 2;
      let dtime = Math.random() * 5 + dt;
      let top = Math.random() * (height - 20);
      danmakuCon.value.appendChild(danmaku);
      danmaku.innerText = danmakuArr[currentDanmakuIndex].text;
      danmaku.style.fontSize = `${danmakuArr[currentDanmakuIndex].fontSize}px`;
      danmaku.style.color = `${danmakuArr[currentDanmakuIndex].color}`;
      danmaku.style.top = `${top}px`;
      danmaku.style.animationDuration = `${dtime}s`;
      danmaku.addEventListener("animationend", function () {
        danmakuCon.value.removeChild(danmaku);
        danmakuPool.returnDanmaku(danmaku);
        danmakuPool.activePool.splice(
          danmakuPool.activePool.indexOf(danmaku),
          1
        );
      });
      danmakuPool.activePool.push(danmaku);
      currentDanmakuIndex++;
    }
  }
}
function stopDanmaku() {
  danmakuPool.activePool.forEach((item: any) => {
    item.classList.add("paused");
  });
}
function activeDanmaku() {
  danmakuPool.activePool.forEach((item: any) => {
    item.classList.remove("paused");
  });
}
function timerCollect() {
  setDanmaku();
  setTime();
  updateProgress();
}
function maskDanmaku() {
  toggleVideo();
}
function toggleVideo() {
  showSetting.value = false;
  if (videoPlayer.value.paused) {
    setall();
    activeDanmaku();
    playImg.value.src = getAssetsImages("../assets/icon/暂停.png");
    videoPlayer.value.play();
  } else {
    clearAll();
    stopDanmaku();
    playImg.value.src = getAssetsImages("../assets/icon/播放.png");
    videoPlayer.value.pause();
  }
}
function setall() {
  timer = setInterval(timerCollect, 10);
}
function clearAll() {
  clearInterval(timer);
}
function setTime() {
  const player = videoPlayer.value;
  const total = totalTime.value;
  const now = nowTime.value;
  if (player.currentTime) {
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
}
function loadVideoSource(src: any, currentTime?: number) {
  if (hls) {
    hls.destroy();
  }
  hls = new Hls();
  hls.loadSource(src);
  hls.attachMedia(videoPlayer.value);
  hls.on(Hls.Events.MANIFEST_PARSED, () => {
    if (currentTime !== undefined) {
      videoPlayer.value.currentTime = currentTime;
    }
  });
  hls.on(Hls.Events.FRAG_LOADED, (event: any, data: any) => {
    if (!loadedFragments.includes(data.frag.sn)) {
      loadedFragments.push(data.frag.sn);
    }
    if (hls.levels && hls.levels[hls.currentLevel]) {
      const totalFragments =
        hls.levels[hls.currentLevel].details.fragments.length;
      updatePreloadProgress(loadedFragments.length, totalFragments);
    } else {
      console.warn("Unable to access level details");
    }
  });
}
function getVideoSrc(src: any, quality: any) {
  return `http://localhost:3000/${src}/${quality}p/${src}_${quality}p.m3u8`;
}
function setPlayRate(item: any) {
  videoPlayer.value.playbackRate = item;
  nowPlayRate.value = item;
  initPlayRate();
}
function setQuality(quality: any) {
  const newSrc = getVideoSrc(src, quality);
  const currentTime = videoPlayer.value.currentTime;
  loadedFragments = [];
  loadVideoSource(newSrc, currentTime);
}

function showPlayRate() {
  playerRateBox.value.style.visibility = "visible";
  qualitybox.value.style.visibility = "hidden";
  settingBmenu.value.style.height = "0";
  settingBmenu.value.style.width = "0";
  playerRateBox.value.style.width = "250px";
  playerRateBox.value.style.height = "310px";
  menuItem1.value.style.visibility = "hidden";
  menuItem2.value.style.visibility = "hidden";
}
function showQuality() {
  playerRateBox.value.style.visibility = "hidden";
  qualitybox.value.style.visibility = "visible";
  settingBmenu.value.style.height = "0";
  settingBmenu.value.style.width = "0";
  qualitybox.value.style.width = "250px";
  qualitybox.value.style.height = "225px";
  menuItem1.value.style.visibility = "hidden";
  menuItem2.value.style.visibility = "hidden";
}
function initPlayRate() {
  settingBmenu.value.style.width = "250px";
  settingBmenu.value.style.height = "90px";
  playerRateBox.value.style.width = "0";
  playerRateBox.value.style.height = "0";
  menuItem1.value.style.visibility = "visible";
  menuItem2.value.style.visibility = "visible";
}
function initQuality() {
  settingBmenu.value.style.width = "250px";
  settingBmenu.value.style.height = "90px";
  qualitybox.value.style.width = "0";
  qualitybox.value.style.height = "0";
  menuItem1.value.style.visibility = "visible";
  menuItem2.value.style.visibility = "visible";
}
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
function setInfo(src: any) {
  if (Hls.isSupported()) {
    loadVideoSource(src);
    videoPlayer.value.volume = 0.5;
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
function getAssetsImages(url: string) {
  return new URL(url, import.meta.url).href;
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
function gotoHere(e: MouseEvent) {
  if (videoPlayer.value.currentTime <= 0) return;
  let cur = e.offsetX / progressBar.value.clientWidth;
  videoPlayer.value.currentTime = cur * videoPlayer.value.duration;
  updateProgress();
}
function startDragging(e: MouseEvent) {
  if (videoPlayer.value.currentTime <= 0) return;
  isDragging.value = true;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);
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
  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDragging);
}

onUnmounted(() => {
  clearInterval(timer);
  hls.destroy();
});
</script>

<style lang="scss">
.player-container {
  user-select: none;
  position: relative;
  width: 100%;
  &:hover {
    .video-box-bottom .controll {
      height: 45px;
    }
  }

  .video-box {
    width: 100%;
    position: relative;
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
    z-index: 20;
    .setting-con {
      padding-right: 12px;
      width: 100%;
      display: flex;
      justify-content: end;
      .nothing {
        flex: 1;
        height: 100%;
      }
      .setting-box {
        border-radius: 20px;
        overflow: hidden;
        display: flex;
        background: rgba(5, 5, 5, 0.815);
      }
      .menu {
        transition: 0.3s all;
        width: 250px;
        .item {
          visibility: visible;
          &:hover {
            background: rgba(52, 52, 52, 0.815);
          }
          height: 45px;
          padding: 0 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border-bottom: 1px solid black;
          cursor: pointer;
          span {
            font-size: 12px;
          }
          .left {
            display: flex;
            align-items: center;
            img {
              width: 28px;
              height: 28px;
              margin-right: 10px;
            }
          }
          .right {
            display: flex;
            align-items: center;
            img {
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
          }
        }
      }
      .playrate-box,
      .quality-box {
        width: 0;
        height: 0;
        transition: 0.3s all;
        visibility: hidden;
        .item {
          &:hover {
            background: rgba(52, 52, 52, 0.815);
          }
          height: 45px;
          padding: 0 20px;
          display: flex;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid black;
          cursor: pointer;
        }
      }
    }
    .progress {
      &:hover {
        height: 8px;
        .now {
          height: 8px;
          background: #ff0000;
          &::after {
            opacity: 1;
          }
        }
        .preload {
          height: 8px;
        }
      }
      cursor: pointer;
      height: 5px;
      width: 100%;
      position: relative;
      background-color: rgba(211, 211, 211, 0.432);
      .now {
        width: 0;
        height: 5px;
        background-color: rgb(186, 4, 4);
        transition: width 10ms;
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        &::after {
          opacity: 0;
          content: "";
          position: absolute;
          right: -5px;
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: rgb(255, 5, 5);
        }
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
      background-color: rgba(0, 0, 0, 0.482);
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
        height: 100%;

        .icon {
          cursor: pointer;
          width: 28px;
          height: 100%;
          display: flex;
          align-items: center;
          margin-right: 12px;
          img {
            width: 28px;
            height: 28px;
          }
        }
      }
    }
  }
}

.danmaku {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 10;
}
.danmakuspan {
  position: absolute;
  right: 100%;
  font-size: 20px;
  color: #fff;
  white-space: nowrap;
  animation: danmankuAnimate linear 10s;
}
@keyframes danmankuAnimate {
  0% {
    right: 0%;
    transform: translate(100%, 0);
  }
  100% {
    right: 100%;
    transform: translate(0, 0);
  }
}
.paused {
  animation-play-state: paused !important;
}
</style>
