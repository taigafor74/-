<template>
  <div class="user-header-container">
    <div class="user-header">
      <div class="user-header-avatar">
        <img
          src="https://yt3.ggpht.com/yti/AHXOFjUpjQadqXhG1NT6K1weT1akpXcetI-mM8PFrIw=s88-c-k-c0x00ffffff-no-rj-mo"
          alt=""
        />
      </div>
      <div class="user-header-info">
        <div class="user-header-info-name">电锯锯木头</div>
        <div class="user-header-info-introduction">
          <input placeholder="编辑个性签名" maxlength="60" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {} from "vue";
</script>

<style lang="scss" scoped>
.user-header-container {
  border: 0.058582vw solid rgb(61, 2, 199);
  border-top: 0;
  border-bottom: 0;
  width: 100%;
  background-image: url("@/assets/background/userbg.jpg");
  height: 11.716462vw;
  background-position: 50%;
  background-size: cover;
  background-color: #f5f5f5;
  padding-top: 7.029877vw;
  .user-header {
    width: 100%;
    padding-left: 1.757469vw;
    display: flex;
    .user-header-avatar {
      width: 3.514938vw;
      height: 3.514938vw;
      margin-right: 1.343292vw;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .user-header-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user-header-info-name {
        font-size: 1.343292vw;
        font-family: "zpix" "sans-serif";
        font-weight: 600;
        color: #ffffff;
      }
      .user-header-info-introduction {
        font-size: 0.871646vw;
        width: 43.350908vw;
        input {
          padding-left: 0.275747vw;
          width: 100%;
          color: white;
          outline: none;
          border: 0;
          border-radius: 0.185823vw;
          overflow: hidden;
          background: transparent;
          &:focus {
            color: black;
            background: rgb(255, 255, 255);
          }
          &:hover:not(:focus) {
            background: #7e7e7e72;
          }
        }
      }
    }
  }
}
</style>
