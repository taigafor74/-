<template>
  <div class="video-danmaku-con">
    <div class="header" @click="toggle">
      <div class="left">
        <span>弹幕列表</span>
      </div>
      <div class="right">
        <span class="arrow" ref="arrow">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            data-pointer="none"
            viewBox="0 0 16 16"
            fill="#c0c0c0"
          >
            <path
              d="m9.188 7.999-3.359 3.359a.75.75 0 1 0 1.061 1.061l3.889-3.889a.75.75 0 0 0 0-1.061L6.89 3.58a.75.75 0 1 0-1.061 1.061l3.359 3.358z"
            ></path>
          </svg>
        </span>
      </div>
    </div>
    <Transition name="fade">
      <div class="danmaku-list" v-if="show">
        <div class="con">
          <div class="list-header">
            <div class="time">时间</div>
            <div class="content">弹幕内容</div>
            <div class="sendtime">发送时间</div>
          </div>
          <div class="list">
            <ul>
              <li v-for="item in 80">
                <div class="time">00:00</div>
                <div class="content">
                  弹幕内容弹幕内容弹幕内容弹幕内容弹幕内容弹幕内容弹幕内容
                </div>
                <div class="sendtime">04-04 10:41</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const arrow: any = ref(null);
const show = ref(false);
function toggle() {
  show.value = !show.value;
  if (show.value) {
    arrow.value.style.transform = "rotate(-90deg)";
  } else {
    arrow.value.style.transform = "rotate(90deg)";
  }
}
</script>

<style lang="scss" scoped>
.video-danmaku-con {
  width: 100%;
  margin-bottom: 16px;
  .header {
    border-radius: 6px;
    display: flex;
    background: #121212;
    align-items: center;
    justify-content: space-between;
    color: #c0c0c0;
    padding: 0 15px;
    cursor: pointer;
    .left {
      font-size: 16px;
      height: 44px;
      font-weight: 500;
      border-radius: 6px;
      line-height: 44px;
    }
    .right {
      height: 100%;
      display: flex;
      span {
        transition: all 0.3s ease-in-out;
        transform: rotate(90deg);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 100%;
        svg {
          width: 16px;
          height: 16px;
        }
      }
    }
  }
  .danmaku-list {
    width: 100%;
    overflow: hidden;
    .con {
      height: 699px;
      .list-header {
        display: flex;
        color: #c0c0c0;
        padding: 0 15px;
        .time {
          padding-right: 0;
          text-align: left;
          width: 60px;
          cursor: pointer;
          display: inline-block;
          font-size: 12px;
          height: 32px;
          line-height: 32px;
        }
        .content {
          flex: auto;
          text-align: left;
          cursor: pointer;
          display: inline-block;
          font-size: 12px;
          height: 32px;
          line-height: 32px;
        }
        .sendtime {
          text-align: left;
          padding-left: 18px;
          width: 88px;
          cursor: pointer;
          display: inline-block;
          font-size: 12px;
          height: 32px;
          line-height: 32px;
        }
      }
      .list {
        height: 100%;
        overflow-y: auto;
        ul {
          li {
            display: flex;
            color: #c0c0c0;
            padding: 0 15px;
            height: 24px;
            .time {
              padding-right: 0;
              text-align: left;
              width: 60px;
              cursor: pointer;
              display: inline-block;
              font-size: 12px;
            }
            .content {
              flex: 1;
              text-align: left;
              cursor: pointer;
              display: inline-block;
              font-size: 12px;
              overflow: hidden;
              pointer-events: auto;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
            .sendtime {
              padding-left: 18px;
              width: 88px;
              cursor: pointer;
              white-space: nowrap;
              display: inline-block;
              font-size: 12px;
            }
          }
        }
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: height 0.3s ease-in-out;
}
.fade-enter-from {
  height: 0;
}
.fade-enter-to {
  height: 699px;
}
.fade-leave-from {
  height: 699px;
}
.fade-leave-to {
  height: 0;
}
</style>
