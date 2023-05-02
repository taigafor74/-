<template>
  <div class="upload-form-con">
    <div class="box">
      <form class="form">
        <div class="same">
          <div class="sametoo" v-if="!store.isEdit">
            <div class="left">视频</div>
            <div class="right">
              <UploadVideo></UploadVideo>
              <div style="margin-bottom: 20px"></div>
            </div>
          </div>
        </div>
        <div class="same">
          <div class="sametoo">
            <div class="left">封面</div>
            <div class="right">
              <div class="set-img">
                <img :src="store.imgUrl" v-if="store.imgUrl" />
                <el-button
                  @click="store.setVisible(true)"
                  v-if="!store.isEdit"
                  color="#d305de"
                >
                  上传封面
                </el-button>
                <el-dialog
                  v-model="store.visible"
                  :show-close="true"
                  v-if="!store.isEdit"
                >
                  <UploadVideoImg v-if="store.visible"></UploadVideoImg>
                </el-dialog>
                <el-button
                  @click="showEditImg = true"
                  v-if="store.isEdit"
                  color="#d305de"
                >
                  更换封面
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="same">
          <div class="sametoo">
            <div class="left">标题</div>
            <div class="right">
              <el-input
                class="input"
                v-model="form.title"
                placeholder="起个标题吧~"
                maxlength="80"
                type="text"
                :show-word-limit="isTrue"
              />
            </div>
          </div>
        </div>
        <div class="same">
          <div class="sametoo">
            <div class="left">分区</div>
            <div class="right">
              <el-select v-model="form.area" placeholder="选择下分区吧~">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
        <div class="same">
          <div class="sametoo">
            <div class="left">标签</div>
            <div class="right">
              <div class="tag-sp">
                <el-tag
                  v-for="tag in form.tags"
                  :key="tag"
                  class="mx-1"
                  effect="plain"
                  type="info"
                  closable
                  :disable-transitions="false"
                  @close="handleClose(tag)"
                >
                  {{ tag }}
                </el-tag>
                <el-input
                  v-if="inputVisible"
                  ref="InputRef"
                  maxlength="6"
                  v-model="inputValue"
                  class="ml-1 w-20"
                  size="small"
                  @keyup.enter="handleInputConfirm"
                  @blur="handleInputConfirm"
                />
                <el-button
                  v-else
                  class="button-new-tag ml-1"
                  size="small"
                  :disabled="isBtnDis"
                  @click="showInput"
                >
                  + 标签
                </el-button>
              </div>
            </div>
          </div>
        </div>
        <div class="same">
          <div class="sametoo">
            <div class="left">简介</div>
            <div class="right">
              <el-input
                v-model="form.desc"
                :rows="5"
                type="textarea"
                placeholder="写个视频简介吧~"
                maxlength="400"
                :show-word-limit="isTrue"
              />
            </div>
          </div>
        </div>
        <div class="btn-con">
          <el-button class="btn" color="#d305de" @click="submit"
            >提交</el-button
          >
          <el-button class="btn" @click="reset">重置</el-button>
        </div>
      </form>
    </div>
  </div>
  <el-dialog v-model="showEditImg">
    <div class="custom-upload">
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        action="#"
        :on-change="imgChange"
        :auto-upload="false"
      >
        <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
      </el-upload>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, nextTick, watch, reactive, onMounted, onUnmounted } from "vue";
import { ElInput, ElMessage } from "element-plus";
import UploadVideoImg from "./UploadVideoImg.vue";
import { Plus } from "@element-plus/icons-vue";
import { ElButton, ElDialog } from "element-plus";
import { CircleCloseFilled } from "@element-plus/icons-vue";
import { useUploadStore } from "@/stores/upload";
import { useUserStore } from "@/stores/user";
import { getTime } from "@/utils/getTime";
import request from "@/axios/index";
import UploadVideo from "./UploadVideo.vue";
const store = useUploadStore();
const showEditImg = ref(false);
const userStore = useUserStore();
const visible = store.visible;
const form = reactive({
  title: "",
  area: "",
  tags: [],
  desc: "",
});
const imageChanged = ref(false);
const isTrue = ref(true);
const inputValue = ref("");
const isBtnDis = ref(false);
const inputVisible = ref(false);
const InputRef = ref<InstanceType<typeof ElInput>>();
const imgUrl1 = ref("");
async function imgChange(file) {
  const reader = new FileReader();

  // 使用 Promise 等待加载完成
  const result = await new Promise((resolve, reject) => {
    reader.onload = (e) => {
      resolve(e.target.result);
    };
    reader.onerror = (e) => {
      reject(e);
    };
    reader.readAsDataURL(file.raw);
  });

  imgUrl1.value = result;
  store.imgUrl = imgUrl1.value;
  imageChanged.value = true;
  showEditImg.value = false;
}

onMounted(() => {
  if (store.isEdit) {
    console.log(store.editForm);
    form.title = store.editForm.title;
    form.area = store.editForm.area;
    const tags = store.editForm.tags;
    form.desc = store.editForm.description;
    const str = tags.slice(1, tags.length - 1);
    const arr = str.split(",");
    form.tags = arr;
    store.imgUrl = `http://localhost:3000/videoImg/${store.editForm.img}`;
  }
});
onUnmounted(() => {
  store.resetAll();
});
const options = [
  {
    value: "游戏",
    label: "游戏",
  },
  {
    value: "音乐",
    label: "音乐",
  },
  {
    value: "科技",
    label: "科技",
  },
  {
    value: "生活",
    label: "生活",
  },
  {
    value: "番剧",
    label: "番剧",
  },
  {
    value: "时尚",
    label: "时尚",
  },
  {
    value: "娱乐",
    label: "娱乐",
  },
  {
    value: "影视",
    label: "影视",
  },
];
watch(form.tags, (val) => {
  if (val.length === 10) {
    isBtnDis.value = true;
    //message.warning("最多只能添加10个标签");
    ElMessage.warning("最多只能添加10个标签");
  } else {
    isBtnDis.value = false;
  }
});
const handleClose = (tag: string) => {
  form.tags.splice(form.tags.indexOf(tag), 1);
};

const showInput = () => {
  inputVisible.value = true;
  nextTick(() => {
    InputRef.value!.input!.focus();
  });
};

const handleInputConfirm = () => {
  if (inputValue.value) {
    form.tags.push(inputValue.value);
  }
  inputVisible.value = false;
  inputValue.value = "";
};
async function submit() {
  if (store.isEdit) {
    form.vid = store.editForm.vid;
    form.imgUrl = store.imgUrl;
    if (imageChanged.value) {
      form.imgUrl = store.imgUrl;
    } else {
      delete form.imgUrl;
    }

    if (form.title && form.area && form.desc && form.tags) {
      try {
        const serializedForm = JSON.stringify(form);
        const formData = new FormData();
        formData.append("form", serializedForm);
        const response = await request.post("/videos/update", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.data.success) {
          ElMessage.success("更新成功");
          // 在这里执行您需要的操作，例如返回视频列表页面
        } else {
          ElMessage.error("更新失败");
        }
      } catch (error) {
        console.error("Video update failed:", error);
      }
    } else {
      ElMessage.warning("请填写完整信息");
    }
  } else {
    form.imgUrl = store.imgUrl;
    form.time = getTime();
    form.id = userStore.id;
    if (
      form.id &&
      form.area &&
      form.desc &&
      form.tags &&
      form.title &&
      form.imgUrl &&
      store.file
    ) {
      try {
        const serializedForm = JSON.stringify(form);
        const formData = new FormData();
        formData.append("file", store.file);
        formData.append("form", serializedForm);
        const response = await request.post("/videos/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        if (response.data.success) {
          ElMessage.success("上传成功");
          location.reload();
          reset();
        } else {
          ElMessage.error("上传失败");
          location.reload();
        }
      } catch (error) {
        console.error("File upload failed:", error);
      }
    } else {
      ElMessage.warning("请填写完整信息");
    }
  }
}
function reset() {
  form.title = "";
  form.area = "";
  form.tags = [];
  form.desc = "";
  store.imgUrl = "";
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
.upload-form-con {
  width: 100%;
  border: 1px solid rgb(130, 17, 158);
  border-radius: 10px;
  padding: 20px;
  min-width: 740px;
  .box {
    width: 100%;
    height: 100%;
    .form {
      width: 100%;
      height: 100%;
      .same {
        margin: 24px 0 0 20px;
        width: 100%;
        .sametoo {
          display: flex;
          align-items: center;
          width: 100%;
          .left {
            align-items: center;
            flex-wrap: wrap;
            width: 134px;
          }
          .right {
            width: 80%;
            .set-img {
              display: flex;
              align-items: center;
              width: 100%;
              img {
                width: 480px;
                height: 270px;
                margin-right: 20px;
              }
            }
            .tag-sp {
              width: 100%;
              display: flex;
            }
            .input {
              width: 100%;
            }
          }
        }
      }
      .btn-con {
        width: 100%;
        display: flex;
        justify-content: center;
        margin-top: 20px;
        .btn {
          width: 100px;
        }
      }
    }
  }
}
.form:deep(.el-tag) {
  margin-right: 10px;
}
</style>
