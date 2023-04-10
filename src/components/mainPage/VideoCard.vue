<template>
  <div class="video-card-container">
    <div class="video-card" @click="gotoVideo">
      <div class="img-box">
        <img src="@/assets/test.jpg" alt="video-img" />
      </div>
      <div class="video-intro">
        <div class="video-intro-avatar">
          <img src="@/assets/test_avatar.jpg" alt="" />
        </div>
        <div class="video-intro-text">
          <div class="video-intro-text-title">
            <h3>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis inventore minus dolore vel. Accusan
            </h3>
          </div>
          <div class="video-intro-text-info">
            <div>Kitsune</div>
            <div>觀看次數：43萬次 11 個月前</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
const router = useRouter();
function gotoVideo() {
  router.push({
    name: "video",
    path: "/video",
  });
}
</script>

<style lang="scss" scoped>
.video-card-container {
  width: 340px;
  height: 16.988869vw;
  margin: 0 0.468658vw 2.343292vw 0.468658vw;
  .video-card {
    cursor: pointer;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: transparent;
    .img-box {
      width: 100%;
      display: flex;
      // height: 11.130639vw;
      border-radius: 0.871646vw;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
      }
    }
    .video-intro {
      width: 100%;
      height: auto;
      // height: 5.75823vw;
      display: flex;
      .video-intro-avatar {
        width: 2.108963vw;
        // height: 2.108963vw;
        margin-top: 0.702988vw;
        margin-right: 0.702988vw;

        img {
          width: 2.108963vw;
          // height: 100%;
          border-radius: 50%;
        }
      }
      .video-intro-text {
        h3 {
          margin: 0.702988vw 0 0.234329vw 0;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          font-size: 0.99054482vw;
        }
        .video-intro-text-info {
          color: #aaaaaa;
          display: flex;
          line-height: 1.185823vw;
          font-size: 0.820152vw;
          flex-direction: column;
        }
      }
    }
  }
}
</style>
