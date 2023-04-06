<template>
  <div class="Author-con">
    <div class="info">
      <div class="avatar">
        <img
          src="https://yt3.ggpht.com/yti/AHXOFjUpjQadqXhG1NT6K1weT1akpXcetI-mM8PFrIw=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
        />
      </div>
      <div class="right">
        <div class="name">
          <span class="r-name">小猪佩奇</span>
          <span class="r-mail">发消息</span>
        </div>
        <div class="intro">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
        </div>
        <div class="btn">
          <span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7.25098 8.75V13.25C7.25098 13.6642 7.58676 14 8.00098 14C8.41519 14 8.75098 13.6642 8.75098 13.25V8.75H13.251C13.6652 8.75 14.001 8.41421 14.001 8C14.001 7.58579 13.6652 7.25 13.251 7.25H8.75098V2.75C8.75098 2.33579 8.41519 2 8.00098 2C7.58676 2 7.25098 2.33579 7.25098 2.75V7.25H2.75098C2.33676 7.25 2.00098 7.58579 2.00098 8C2.00098 8.41421 2.33676 8.75 2.75098 8.75H7.25098Z"
                fill="white"
              ></path>
            </svg>
            关注 28.4万
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
</script>

<style lang="scss" scoped>
.Author-con {
  .info {
    min-height: 58px;
    margin: 0 0 10px 0;
    display: flex;
    align-items: center;
    .avatar {
      cursor: pointer;
      width: 48px;
      height: 48px;
      flex-shrink: 0;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .right {
      margin-left: 12px;
      flex: 1;
      overflow: auto;
      .name {
        font-size: 16px;
        height: 22px;
        line-height: 22px;
        display: flex;
        align-items: center;
        font-weight: 500;
        .r-name {
          cursor: pointer;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          margin-right: 12px;
        }
        .r-mail {
          cursor: pointer;
          font-size: 14px;
          color: #61666d;
          flex-shrink: 0;
        }
      }
      .intro {
        font-size: 14px;
        margin: 2px 0 10px 0;
        line-height: 16px;
        height: 16px;
        color: #9499a0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn {
        cursor: pointer;
        background: #fe03e5;
        max-width: 230px;
        padding: 0;
        line-height: 30px;
        height: 30px;
        border-radius: 6px;
        font-size: 14px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        margin-top: 5px;
        white-space: nowrap;
        span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }
      }
    }
  }
}
</style>
