<template>
  <div class="">
    <video controls ref="player"></video>
    <button @click="test">123</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import Hls from "hls.js/dist/hls.min.js";
const player = ref();
const hls = new Hls();
onMounted(() => {
  if (Hls.isSupported()) {
    hls.loadSource("http://localhost:3000/1680352225597/1680352225597.m3u8");
    hls.attachMedia(player.value);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      console.log(1);

      // player.value.play();
    });
  }
});
function test() {
  if (player.value.paused) {
    player.value.play();
  } else {
    player.value.pause();
  }
}
</script>

<style lang="scss" scoped>
video {
  width: 100%;
}
</style>
