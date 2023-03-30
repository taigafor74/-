<template>
  <div class="user-announce-container">
    <div ref="head" class="head">公告</div>
    <div class="text-area">
      <textarea
        ref="textarea"
        rows="4"
        type="textarea"
        placeholder="请输入公告内容"
        maxlength="150"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.user-announce-container {
  width: 100%;
  margin-bottom: 0.585823vw;
  padding: 0.878735vw 1.171646vw 1.054482vw;
  height: 15.2314vw;
  background: rgb(0, 0, 0);
  border: 0.05852vw solid rgb(61, 2, 199);
  border-radius: 0.492912vw;
  .head {
    display: flex;
    align-items: center;
    font-size: 0.820152vw;
    height: 2.636204vw;
    line-height: 2.636204vw;
    margin: -0.878735vw 0 0.585823vw;
    border-bottom: 0.058582vw solid #7c7a7a;
  }
  .text-area {
    textarea {
      color: white;
      background: transparent;
      width: 17.926186vw;
      height: 10.076157vw;
      font-size: 0.702988vw;
      padding: 0.585823vw;
      margin: -0.65823vw 0 0 -0.644405vw;
      border-radius: 0.234329vw;
      box-sizing: content-box;
      outline: none;
      border: 0.058582vw solid transparent;
      transition: all 0.3s ease;
      resize: none;
      &:hover {
        border: 0.058582vw solid rgb(61, 2, 199);
      }
      &:focus {
        border: 0.058582vw solid rgb(61, 2, 199);
      }
    }
  }
}
</style>
