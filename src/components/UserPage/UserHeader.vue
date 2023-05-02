<template>
  <div class="user-header-container">
    <div class="user-header">
      <div class="user-header-avatar" @click="updateAvatarBtn">
        <img :src="imgUrl" alt="" />
      </div>
      <div class="user-header-info">
        <div class="user-header-info-name">{{ uname }}</div>
        <div class="user-header-info-introduction">
          <input placeholder="编辑个性签名" maxlength="60" />
        </div>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="上传头像"
    width="30%"
    :before-close="handleClose"
  >
    <div class="custom-upload">
      <el-upload
        v-if="!isUpload"
        class="avatar-uploader"
        :show-file-list="false"
        action="#"
        :on-change="imgChange"
        :auto-upload="false"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
      <img v-if="isUpload" ref="customImg" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetImg">重置</el-button>
        <el-button type="primary" @click="submitImg"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessage } from "element-plus";
import { ElMessageBox } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
import { updateAvatar } from "@/api/user";
const isUpload = ref(false);
const dialogVisible = ref(false);
const customImg = ref<HTMLImageElement>();
const imageUrl = ref("");
const updateImg = ref("");
const store = useUserStore();
const props = defineProps({
  userInfo: Object,
});
const uname = ref("???");
const imgUrl = ref(
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
);
function imgChange(file) {
  const reader = new FileReader();
  isUpload.value = true;
  reader.onload = (e) => {
    updateImg.value = e.target.result;
    customImg.value.src = updateImg.value;
  };
  reader.readAsDataURL(file.raw);
}
watchEffect(() => {
  if (props.userInfo) {
    uname.value = props.userInfo.uname;
    if (props.userInfo.avatar) {
      imgUrl.value = `http://localhost:3000/avatar/${props.userInfo.avatar}`;
    }
  }
});
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure to close this dialog?")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
const updateAvatarBtn = () => {
  if (!store.isLoggedIn) {
    ElMessage.error("请先登录");
    return;
  }
  if (store.id) {
    if (store.id !== props.userInfo.id) {
      ElMessage.error("只能修改自己的头像");
      return;
    }
  }
  dialogVisible.value = true;
};
const resetImg = () => {
  isUpload.value = false;
  imageUrl.value = "";
  updateImg.value = "";
};

const submitImg = async () => {
  if (!updateImg.value) {
    ElMessage.error("请先选择图片");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("userId", store.id);
    formData.append("avatar", dataURLtoFile(updateImg.value, "avatar.png"));
    const response = await updateAvatar(formData);
    ElMessage.success(response.message);
    store.avatar = `http://localhost:3000/avatar/${response.data}`;
    dialogVisible.value = false;
    setLocal();
    location.reload();
    // 更新成功的逻辑
  } catch (error) {
    ElMessage.error("上传头像失败");
  }
};
function setLocal() {
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: store.id,
      uname: store.uname,
      avatar: store.avatar,
      followArr: store.followArr,
    })
  );
}
// 将 Data URL 转换为 File 对象的函数
function dataURLtoFile(dataurl, filename) {
  let arr = dataurl.split(",");
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
</script>

<style lang="scss" scoped>
:deep(.avatar-uploader .el-upload) {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  width: auto;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}
.custom-upload {
  flex: 1;
  height: 270px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 180px;
  }
}
:deep(.avatar-uploader .el-upload:hover) {
  border-color: purple;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.user-header-container {
  border: 1px solid rgb(61, 2, 199);
  margin-top: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
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
      border-radius: 50%;
      border: 2px solid transparent;
      transition: border 0.3s ease;
      cursor: pointer;
      &:hover {
        border: 2px solid rgb(61, 2, 199);
      }
      img {
        border-radius: 50%;
        width: 100%;
        height: 100%;
      }
    }
    .user-header-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .user-header-info-name {
        font-size: 1.343292vw;
        font-family: "Zpix" "sans-serif";
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
