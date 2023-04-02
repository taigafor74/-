<template>
  <div class="video-container">
    <div class="video-left-container">
      <VideoPlayer></VideoPlayer>
      <!-- <TestPlayer></TestPlayer> -->
      <div ref="videoRef"></div>
    </div>
    <div class="video-right-container"></div>
  </div>
</template>

<script setup lang="ts">
import VideoPlayer from "@/components/VideoPlayer.vue";
import TestPlayer from "@/components/TestPlayer.vue";
import axios from "axios";
// import DPlayer from "dplayer";
// import Hls from "hls.js/dist/hls.min.js";
// import { ref, reactive, onBeforeUnmount, onMounted } from "vue";

// const videoRef = ref();
// const state = reactive({
//   instance: null as any,
// });
// const props = defineProps({
//   // 是否自动播放
//   autoplay: {
//     type: Boolean,
//     default: false,
//   },
//   // 主题色
//   theme: {
//     type: String,
//     default: "#0093ff",
//   },
//   // 视频是否循环播放
//   loop: {
//     type: Boolean,
//     default: true,
//   },
//   // 语言(可选值: 'en', 'zh-cn', 'zh-tw')
//   lang: {
//     type: String,
//     default: "zh-cn",
//   },
//   // 是否开启截图(如果开启，视频和视频封面需要允许跨域)
//   screenshot: {
//     type: Boolean,
//     default: false,
//   },
//   // 是否开启热键
//   hotkey: {
//     type: Boolean,
//     default: true,
//   },
//   // 视频是否预加载(可选值: 'none', 'metadata', 'auto')
//   preload: {
//     type: String,
//     default: "auto",
//   },
//   // 默认音量
//   volume: {
//     type: Number,
//     default: 0.7,
//   },
//   // 可选的播放速率，可以设置成自定义的数组
//   playbackSpeed: {
//     type: Array,
//     default: [0.5, 0.75, 1, 1.25, 1.5, 2, 3],
//   },
//   // 在左上角展示一个 logo，你可以通过 CSS 调整它的大小和位置
//   // 视频信息
//   video: {
//     type: Object,
//     default: {
//       url: "http://localhost:3000/1680352225597/1680352225597.m3u8",
//       type: "customHls",
//       customType: {
//         customHls: function (video: HTMLMediaElement) {
//           const hls = new Hls(); //实例化Hls  用于解析m3u8
//           hls.loadSource(video.src);
//           hls.attachMedia(video);
//         },
//       },
//     },
//   },
//   // 外挂字幕
//   subtitle: {
//     type: Object,
//     default: {},
//   },
//   // 显示弹幕
//   danmaku: {
//     type: Object,
//     default: {},
//   },
//   // 自定义右键菜单
//   contextmenu: {
//     type: Array,
//     default: [],
//   },
//   // 自定义进度条提示点
//   highlight: {
//     type: Array,
//     default: [],
//   },
//   // 阻止多个播放器同时播放，当前播放器播放时暂停其他播放器
//   mutex: {
//     type: Boolean,
//     default: true,
//   },
// });
// function getAssetsImages(url: string) {
//   return new URL(url, import.meta.url).href;
// }
// onMounted(() => {
//   let player = {
//     container: videoRef.value,
//     autoplay: props.autoplay,
//     theme: props.theme,
//     loop: props.loop,
//     lang: props.lang,
//     screenshot: props.screenshot,
//     hotkey: props.hotkey,
//     preload: props.preload,
//     volume: props.volume,
//     playbackSpeed: props.playbackSpeed,
//     video: props.video,
//     contextmenu: props.contextmenu,
//     highlight: props.highlight,
//     mutex: props.mutex,
//   };
//   // if (props.subtitle.url) {
//   //   player.subtitle = props.subtitle;
//   // }
//   // if (props.danmaku) {
//   //   player.danmaku = props.danmaku;
//   // }
//   console.log(player);
//   state.instance = new DPlayer(player as any);
// });
// // 销毁

// onBeforeUnmount(() => {
//   state.instance?.destroy();
// });
</script>

<style lang="scss" scoped>
.video-container {
  width: 100%;
  height: 100vh;
  padding: 0 0.585823vw;
  display: flex;
  justify-content: center;
  background-color: black;
  .video-left-container {
    width: 62.272994vw;
    height: 100%;
    background-color: rgba(255, 0, 0, 0);
  }
  .video-right-container {
    width: 24.077329vw;
    height: 100%;
    background-color: rgba(0, 0, 255, 0);
  }
}
</style>
