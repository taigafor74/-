<template>
  <div class="likelate-con">
    <div class="box1" :style="bgc">
      <div class="layer" :style="backgroundStyle">
        <div class="img-float">
          <div class="img-box">
            <img src="@/assets/test.jpg" />
          </div>
        </div>
      </div>
      <div class="bottom">
        <img src="@/assets/test.jpg" />
        <div class="title">喜欢的影片</div>
        <div class="info">
          <div class="wrap">
            <div class="name">电锯锯木头</div>
            <div class="bottom">
              <div class="item">126部影片</div>
              <div class="item">观看次数:74次</div>
            </div>
          </div>
        </div>
        <div class="btn">
          <el-button
            color="rgb(61, 2, 199)"
            :icon="CaretRight"
            round
            size="large"
            >播放</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CaretRight } from "@element-plus/icons-vue";
import ColorThief from "colorthief";
import { ref, onMounted, computed } from "vue";
const imageSrc = new URL("@/assets/test.jpg", import.meta.url).href;
const colors = ref({});
onMounted(async () => {
  const result = await getColorsFromImage(imageSrc);
  colors.value = result;
  console.log(colors.value);
});
const backgroundStyle = computed(() => {
  if (colors.value.vibrantColor && colors.value.mutedColor) {
    const vibrantColor = `rgba(${colors.value.brightestColor.join(",")}, 0.8)`;
    const second = `rgba(${colors.value.brightestColor.join(",")}, 0.3)`;
    return {
      background: `linear-gradient(to bottom, ${vibrantColor} 0%, ${second} 33%, rgba(15, 15, 15, 1) 100%)`,
    };
  }
  return {};
});
const bgc = computed(() => {
  if (colors.value.vibrantColor && colors.value.mutedColor) {
    const brightestColor = `rgb(${colors.value.brightestColor.join(",")})`;
    return {
      background: `${brightestColor}`,
    };
  }
  return {};
});
function getBrightness(color) {
  return (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
}
async function getColorsFromImage(imageSrc) {
  const colorThief = new ColorThief();
  const image = new Image();
  image.crossOrigin = "Anonymous";
  image.src = imageSrc;
  return new Promise((resolve) => {
    image.onload = () => {
      const vibrantColor = colorThief.getColor(image);
      const palette1 = colorThief.getPalette(image);
      const mutedColor = palette1[1];
      const palette = colorThief.getPalette(image, 5);
      const brightestColor = palette.reduce((brightest, currentColor) => {
        return getBrightness(currentColor) > getBrightness(brightest)
          ? currentColor
          : brightest;
      });
      resolve({
        vibrantColor,
        mutedColor,
        brightestColor,
      });
    };
  });
}
</script>

<style lang="scss" scoped>
:deep(.el-button) {
  flex: 1;
}
.likelate-con {
  margin-left: 264px;
  position: fixed;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 360px;
  overflow-x: hidden;
  .box1 {
    flex: 1;
    padding: 24px;
    position: relative;
    border-radius: 16px;
    margin-top: 12px;
    margin-bottom: 12px;
    overflow-y: hidden;
    display: flex;
    flex-direction: column;
    .bottom {
      z-index: 99;
      .title {
        color: white;
        font-size: 32px;
        line-height: 60px;
        font-weight: 700;
      }
      .info {
        display: flex;
        flex-direction: column;
        .wrap {
          display: flex;
          flex: 1;
          flex-direction: column;
          margin-bottom: 12px;
          .name {
            color: rgb(232, 232, 232);
            font-size: 16px;
            line-height: 20px;
            font-weight: 500;
          }
          .bottom {
            display: flex;
            color: rgb(220, 220, 220);
            font-size: 12px;
            line-height: 28px;
            font-weight: 500;
            .item {
              margin-right: 8px;
            }
          }
        }
      }
      .btn {
        width: 100%;
        display: flex;
      }
      img {
        width: 312px;
        height: 175.5px;
        object-fit: cover;
        border-radius: 12px;
      }
    }
    .layer {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    border-radius: 12px;
    .img-float {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: hidden;
      .img-box {
        background-color: transparent;
        width: 200%;
        transform: translateX(-25%);
        opacity: 0.7;
        -webkit-filter: blur(30px);
        filter: blur(30px);
        img {
          width: 100%;
          height: 400px;
        }
      }
    }
  }
}
</style>
