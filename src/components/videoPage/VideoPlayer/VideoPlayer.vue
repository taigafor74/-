<template>
  <div
    class="player-container"
    ref="playerContainer"
    @mouseleave="showSetting = false"
  >
    <div class="video-box">
      <video ref="videoPlayer" loop="true" @click="toggleVideo"></video>
      <div class="danmaku" ref="danmakuCon" @click="maskDanmaku"></div>
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
            <img src="@/assets/icon/播放.png" alt="" ref="playImg" />
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
  <div class="danmaku-bar">
    <div class="danmaku-bar-con">
      <div class="left">已装填{{ danmakuArr.length }}条弹幕</div>
      <div class="right">
        <div class="danmaku-switch" @click="switchDanmaku">
          <span v-if="isShowDanmaku">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-pointer="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                fill-rule="evenodd"
                d="M11.989 4.828c-.47 0-.975.004-1.515.012l-1.71-2.566a1.008 1.008 0 0 0-1.678 1.118l.999 1.5c-.681.018-1.403.04-2.164.068a4.013 4.013 0 0 0-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 0 0 3.763 3.363l.906.046c1.205.063 1.808.095 3.607.095a.988.988 0 0 0 0-1.975c-1.758 0-2.339-.03-3.501-.092l-.915-.047a2.037 2.037 0 0 1-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.01.342.017.65.025.88a.987.987 0 1 0 1.974-.068c-.008-.226-.016-.523-.025-.856v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.9-.032-1.743-.058-2.531-.078l1.05-1.46a1.008 1.008 0 0 0-1.638-1.177l-1.862 2.59c-.38-.004-.744-.007-1.088-.007h-.13Zm.521 4.775h-1.32v4.631h2.222v.847h-2.618v1.078h2.618l.003.678c.36.026.714.163 1.01.407h.11v-1.085h2.694v-1.078h-2.695v-.847H16.8v-4.63h-1.276a8.59 8.59 0 0 0 .748-1.42L15.183 7.8a14.232 14.232 0 0 1-.814 1.804h-1.518l.693-.308a8.862 8.862 0 0 0-.814-1.408l-1.045.352c.297.396.572.847.825 1.364Zm-4.18 3.564.154-1.485h1.98V8.294h-3.2v.98H9.33v1.43H7.472l-.308 3.453h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.005c.285.02.551.04.818.04 1.001-.067 1.562-.419 1.694-1.057.11-.638.176-1.903.176-3.795h-2.2Zm7.458.11v-.858h-1.254v.858h1.254Zm-2.376-.858v.858h-1.199v-.858h1.2Zm-1.199-.946h1.2v-.902h-1.2v.902Zm2.321 0v-.902h1.254v.902h-1.254Z"
                clip-rule="evenodd"
              ></path>
              <path
                fill="#00FEFE"
                fill-rule="evenodd"
                d="M22.846 14.627a1 1 0 0 0-1.412.075l-5.091 5.703-2.216-2.275-.097-.086-.008-.005a1 1 0 0 0-1.322 1.493l2.963 3.041.093.083.007.005c.407.315 1 .27 1.354-.124l5.81-6.505.08-.102.005-.008a1 1 0 0 0-.166-1.295Z"
                clip-rule="evenodd"
                data-darkreader-inline-fill=""
                style="--darkreader-inline-fill: #27c6ff"
              ></path>
            </svg>
          </span>
          <span v-if="!isShowDanmaku">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-pointer="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                fill-rule="evenodd"
                d="m8.085 4.891-.999-1.499a1.008 1.008 0 0 1 1.679-1.118l1.709 2.566c.54-.008 1.045-.012 1.515-.012h.13c.345 0 .707.003 1.088.007l1.862-2.59a1.008 1.008 0 0 1 1.637 1.177l-1.049 1.46c.788.02 1.631.046 2.53.078 1.958.069 3.468 1.6 3.74 3.507.088.613.13 2.158.16 3.276l.001.027c.01.333.017.63.025.856a.987.987 0 0 1-1.974.069c-.008-.23-.016-.539-.025-.881v-.002c-.028-1.103-.066-2.541-.142-3.065-.143-1.004-.895-1.78-1.854-1.813-2.444-.087-4.466-.13-6.064-.131-1.598 0-3.619.044-6.063.13a2.037 2.037 0 0 0-1.945 1.748c-.15 1.04-.225 2.341-.225 3.904 0 1.874.11 3.474.325 4.798.154.949.95 1.66 1.91 1.708a97.58 97.58 0 0 0 5.416.139.988.988 0 0 1 0 1.975c-2.196 0-3.61-.047-5.513-.141A4.012 4.012 0 0 1 2.197 17.7c-.236-1.446-.351-3.151-.351-5.116 0-1.64.08-3.035.245-4.184A4.013 4.013 0 0 1 5.92 4.96c.761-.027 1.483-.05 2.164-.069Zm4.436 4.707h-1.32v4.63h2.222v.848h-2.618v1.078h2.431a5.01 5.01 0 0 1 3.575-3.115V9.598h-1.276a8.59 8.59 0 0 0 .748-1.42l-1.089-.384a14.232 14.232 0 0 1-.814 1.804h-1.518l.693-.308a8.862 8.862 0 0 0-.814-1.408l-1.045.352c.297.396.572.847.825 1.364Zm-4.18 3.564.154-1.485h1.98V8.289h-3.2v.979h2.067v1.43H7.483l-.308 3.454h2.277c0 1.166-.044 1.925-.12 2.277-.078.352-.386.528-.936.528-.308 0-.616-.022-.902-.055l.297 1.067.062.004c.285.02.551.04.818.04 1.001-.066 1.562-.418 1.694-1.056.11-.638.176-1.903.176-3.795h-2.2Zm7.458.11v-.858h-1.254v.858H15.8Zm-2.376-.858v.858h-1.199v-.858h1.2Zm-1.199-.946h1.2v-.902h-1.2v.902Zm2.321 0v-.902H15.8v.902h-1.254Zm3.517 10.594a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-.002-1.502a2.5 2.5 0 0 1-2.217-3.657l3.326 3.398a2.49 2.49 0 0 1-1.109.259Zm2.5-2.5c0 .42-.103.815-.286 1.162l-3.328-3.401a2.5 2.5 0 0 1 3.614 2.239Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </div>
        <div class="danmaku-setting">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              data-pointer="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="white"
                fill-rule="evenodd"
                d="m15.645 4.881 1.06-1.473a.998.998 0 1 0-1.622-1.166L13.22 4.835a110.67 110.67 0 0 0-1.1-.007h-.131c-.47 0-.975.004-1.515.012L8.783 2.3A.998.998 0 0 0 7.12 3.408l.988 1.484c-.688.019-1.418.042-2.188.069a4.013 4.013 0 0 0-3.83 3.44c-.165 1.15-.245 2.545-.245 4.185 0 1.965.115 3.67.35 5.116a4.012 4.012 0 0 0 3.763 3.363c1.903.094 3.317.141 5.513.141a.988.988 0 0 0 0-1.975 97.58 97.58 0 0 1-5.416-.139 2.037 2.037 0 0 1-1.91-1.708c-.216-1.324-.325-2.924-.325-4.798 0-1.563.076-2.864.225-3.904.14-.977.96-1.713 1.945-1.747 2.444-.087 4.465-.13 6.063-.131 1.598 0 3.62.044 6.064.13.96.034 1.71.81 1.855 1.814.075.524.113 1.962.141 3.065v.002c.005.183.01.07.014-.038.004-.096.008-.189.011-.081a.987.987 0 1 0 1.974-.069c-.004-.105-.007-.009-.011.09-.002.056-.004.112-.007.135l-.002.01a.574.574 0 0 1-.005-.091v-.027c-.03-1.118-.073-2.663-.16-3.276-.273-1.906-1.783-3.438-3.74-3.507-.905-.032-1.752-.058-2.543-.079Zm-3.113 4.703h-1.307v4.643h2.2v.04l.651-1.234c.113-.215.281-.389.482-.509v-.11h.235c.137-.049.283-.074.433-.074h1.553V9.584h-1.264a8.5 8.5 0 0 0 .741-1.405l-1.078-.381c-.24.631-.501 1.23-.806 1.786h-1.503l.686-.305c-.228-.501-.5-.959-.806-1.394l-1.034.348c.294.392.566.839.817 1.35Zm-1.7 5.502h2.16l-.564 1.068h-1.595v-1.068Zm-2.498-1.863.152-1.561h1.96V8.289H7.277v.969h2.048v1.435h-1.84l-.306 3.51h2.254c0 1.155-.043 1.906-.12 2.255-.076.348-.38.523-.925.523-.305 0-.61-.022-.893-.055l.294 1.056.061.005c.282.02.546.039.81.039.991-.065 1.547-.414 1.677-1.046.11-.631.175-1.883.175-3.757H8.334Zm5.09-.8v.85h-1.188v-.85h1.187Zm-1.188-.955h1.187v-.893h-1.187v.893Zm2.322.007v-.893h1.241v.893h-1.241Zm.528 2.757a1.26 1.26 0 0 1 1.087-.627l4.003-.009a1.26 1.26 0 0 1 1.094.63l1.721 2.982c.226.39.225.872-.001 1.263l-1.743 3a1.26 1.26 0 0 1-1.086.628l-4.003.009a1.26 1.26 0 0 1-1.094-.63l-1.722-2.982a1.26 1.26 0 0 1 .002-1.263l1.742-3Zm1.967.858a1.26 1.26 0 0 0-1.08.614l-.903 1.513a1.26 1.26 0 0 0-.002 1.289l.885 1.492c.227.384.64.62 1.086.618l2.192-.005a1.26 1.26 0 0 0 1.08-.615l.904-1.518a1.26 1.26 0 0 0 .001-1.288l-.884-1.489a1.26 1.26 0 0 0-1.086-.616l-2.193.005Zm2.517 2.76a1.4 1.4 0 1 1-2.8 0 1.4 1.4 0 0 1 2.8 0Z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
          <div class="danmaku-setting-box"></div>
        </div>
        <div class="danmaku-send">
          <div class="color-set">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xml:space="preserve"
                data-pointer="none"
                style="enable-background: new 0 0 22 22"
                viewBox="0 0 22 22"
              >
                <path
                  fill="white"
                  d="M17 16H5c-.55 0-1 .45-1 1s.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1zM6.96 15c.39 0 .74-.24.89-.6l.65-1.6h5l.66 1.6c.15.36.5.6.89.6.69 0 1.15-.71.88-1.34l-3.88-8.97C11.87 4.27 11.46 4 11 4s-.87.27-1.05.69l-3.88 8.97c-.27.63.2 1.34.89 1.34zM11 5.98 12.87 11H9.13L11 5.98z"
                ></path>
              </svg>
            </span>
          </div>
          <input
            placeholder="发个弹幕吧"
            type="text"
            v-model="userDanmaku"
            ref="userInput"
          />
          <button @click="sendDanmaku">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, reactive } from "vue";
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
const userInput = ref();
const isShowDanmaku = ref(true);
let timer: any = null;
let showSetting = ref(false);
let loadedFragments: any = [];
let isDragging = ref(false);
let hls = new Hls();
const qualityArr = [360, 480, 720, 1080];
const playRateArr = [0.5, 0.75, 1.0, 1.25, 1.5, 2.0];
const nowPlayRate = ref(1);
const nowQuality = ref(720);
const userSetting = {
  isSetting: false,
  opcity: 0.5,
};
let src = "1680539678412";
let testSrc = ref(
  "http://localhost:3000/1680539678412/720p/1680539678412_720p.m3u8"
);
let userDanmaku = ref("");
const danmakuArr = reactive([
  {
    text: "1wadwadpiwajdwadpwajp",
    time: 2,
    color: "red",
    speed: 1,
    fontSize: 20,
    flag: false,
  },
  {
    text: "diwoaj21212diwadwadpiwajdwadpwajp",
    time: 4,
    color: "red",
    speed: 1,
    fontSize: 20,
    flag: false,
  },
  {
    text: "1jp",
    time: 5,
    color: "red",
    speed: 1,
    fontSize: 20,
    flag: false,
  },
  {
    text: "1jp",
    time: 8,
    color: "green",
    speed: 1,
    fontSize: 20,
    flag: false,
  },
  {
    text: "1jp",
    time: 10,
    color: "blue",
    speed: 1,
    fontSize: 20,
    flag: false,
  },
  {
    text: "1jp",
    time: 15,
    color: "blue",
    speed: 1,
    fontSize: 20,
    flag: false,
  },
]);

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
onMounted(() => {
  setInfo(testSrc.value);
  danmakuPool.init();
});
function sendDanmaku() {
  userInput.value.value = "";
  danmakuArr.push({
    text: userDanmaku.value,
    time: videoPlayer.value.currentTime,
    color: "red",
    speed: 1,
    fontSize: 20,
    flag: false,
  });
}
function switchDanmaku() {
  isShowDanmaku.value = !isShowDanmaku.value;
  danmakuCon.value.classList.toggle("danmaku-show");
}
function setDanmaku() {
  const player = videoPlayer.value;
  const currentTime = player.currentTime;
  let width = player.clientWidth;
  let height = player.clientHeight;
  danmakuArr.forEach((item, index) => {
    if (item.time <= currentTime && !item.flag) {
      let danmaku = danmakuPool.getDanmaku();
      let dt = 2;
      let dtime = Math.random() * 10 + dt;
      let top = Math.random() * (height - 20);
      item.flag = true;
      if (index > 5) {
        danmaku.style.border = `1px solid blue`;
      }
      danmakuCon.value.appendChild(danmaku);
      danmaku.innerText = item.text;
      danmaku.style.fontSize = `${item.fontSize}px`;
      danmaku.style.color = `${item.color}`;
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
    }
  });
}
function removeAllDanmaku() {
  danmakuArr.forEach((item) => {
    item.flag = true;
    if (item.time > videoPlayer.value.currentTime) {
      item.flag = false;
    }
  });
  danmakuPool.activePool.forEach((item: any) => {
    danmakuCon.value.removeChild(item);
    danmakuPool.returnDanmaku(item);
  });
  danmakuPool.activePool = [];
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
async function setQuality(quality: any) {
  stopDanmaku();
  nowQuality.value = quality;
  const newSrc = getVideoSrc(src, quality);
  const currentTime = videoPlayer.value.currentTime;
  loadedFragments = [];
  await loadVideoSource(newSrc, currentTime);
  initQuality();
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
  removeAllDanmaku();
  updateProgress();
}
function startDragging(e: MouseEvent) {
  if (videoPlayer.value.currentTime <= 0) return;
  isDragging.value = true;
  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDragging);
  removeAllDanmaku();
}
function drag(e: MouseEvent) {
  if (!isDragging.value) return;
  let offsetX = Math.min(Math.max(e.offsetX, 0), progressBar.value.clientWidth);
  let cur = offsetX / progressBar.value.clientWidth;
  videoPlayer.value.currentTime = cur * videoPlayer.value.duration;
  removeAllDanmaku();
  updateProgress();
}
function stopDragging(e: MouseEvent) {
  if (!isDragging.value) return;
  isDragging.value = false;
  removeAllDanmaku();
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
    .danmaku {
      visibility: visible;
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
.danmaku-bar {
  background-color: rgb(0, 0, 0);
  height: 56px;
  font-size: 14px;

  position: relative;
  .danmaku-setting-box {
    position: absolute;
    width: 300px;
    height: 300px;
    background: green;
    bottom: 100%;
    z-index: 99;
    left: 45px;
  }
  .danmaku-bar-con {
    padding: 10px;
    height: 100%;
    display: flex;
    align-items: center;
    .left {
      white-space: nowrap;
      margin-right: 36px;
    }
    .right {
      display: flex;
      align-items: center;
      height: 100%;
      width: 100%;
      span {
        display: block;
        height: 24px;
        cursor: pointer;
        svg {
          height: 100%;
          width: 100%;
        }
      }
      .danmaku-switch {
        margin-right: 18px;
      }
      .danmaku-setting {
        margin-right: 18px;
      }
      .danmaku-send {
        border: none;
        border-radius: 8px;
        display: flex;
        align-items: center;
        height: 100%;
        width: 100%;
        flex: 1;
        background: rgb(52, 52, 52);
        input {
          font-size: inherit;
          background: none;
          border: 0;
          flex-grow: 1;
          height: 28px;
          line-height: 28px;
          min-width: 100px;
          color: white;
          padding: 0 5px;
          width: 100%;
          outline: none;
        }
        button {
          height: 100%;
          width: 64px;
          background: #d007c6;
          border: 0;
          border-top-right-radius: 8px;
          border-bottom-right-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }
      }
    }
  }
}
.danmaku-show {
  visibility: hidden !important;
}
</style>
