<template>
  <div class="comment-input-con">
    <div class="avatar-box">
      <div class="avatar">
        <img
          src="https://yt3.ggpht.com/yti/AHXOFjUpjQadqXhG1NT6K1weT1akpXcetI-mM8PFrIw=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
        />
      </div>
    </div>
    <textarea class="input-box" placeholder="发一条评论吧"></textarea>
    <div class="send-box">
      <div class="send-text">发布</div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.comment-input-con {
  font-weight: 400;
  display: flex;
  height: 50px;
  align-items: center;
  .avatar-box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80px;
    height: 50px;
    .avatar {
      width: 48px;
      height: 48px;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
  .input-box {
    width: 100%;
    height: 100%;
    padding: 5px 10px;
    border: 1px solid rgb(47, 47, 47);
    border-radius: 6px;
    background-color: rgb(47, 47, 47);
    font-family: inherit;
    line-height: 38px;
    color: white;
    resize: none;
    outline: none;
    box-sizing: border-box;
  }
  .send-box {
    display: flex;
    justify-content: center;
    background: #d007c6;
    align-items: center;
    height: 100%;
    width: 70px;
    font-weight: 600;
    margin-left: 10px;
    border-radius: 4px;
    cursor: pointer;
    .send-text {
      font-size: 16px;
      color: black;
    }
  }
}
</style>
