<template>
  <div class="user-info-con">
    <div class="top">
      <span>个人资料</span>
      <el-button
        type="primary"
        size="small"
        color="rgb(61, 2, 199)"
        @click="dialogVisible = true"
        >修改资料</el-button
      >
    </div>
    <div class="bottom">
      <div class="item">
        <span>用户名</span>
        <span>{{ store.uname }}</span>
      </div>
      <div class="item">
        <span>生日</span>
        <span>{{ new Date(bd).toLocaleDateString() }}</span>
      </div>
    </div>
  </div>
  <el-dialog
    v-model="dialogVisible"
    title="修改资料"
    width="30%"
    :before-close="handleClose"
  >
    <el-form :model="form" label-width="120px">
      <el-form-item label="用户名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="生日">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="选择日期"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="form.resource">
          <el-radio label="男" />
          <el-radio label="女" />
          <el-radio label="未知" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="简介">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {} from "vue";
import { ref, onMounted } from "vue";
import { useUserStore } from "@/stores/user";
import { ElMessageBox } from "element-plus";
import { getInfo, updateInfo } from "@/api/user";

const store = useUserStore();
const dialogVisible = ref(false);
import { reactive } from "vue";
const data = ref([]);
const bd = ref("");
onMounted(async () => {
  if (store.isLoggedIn) {
    const res = await getInfo(store.id);
    data.value = res.data;
    bd.value = data.value.birthday;
    form.name = store.uname;
    form.date1 = new Date(bd.value).toLocaleDateString();
    form.desc = data.value.desc;
    form.resource = data.value.sex;
  }
});
// do not use same name with ref
const form = reactive({
  name: "",
  date1: "",
  resource: "",
  desc: "",
});
const submit = async () => {
  form.id = store.id;
  const res = await updateInfo(form);
  if (res.success == true) {
    ElMessageBox.alert("修改成功");
    dialogVisible.value = false;
    location.reload();
  } else {
    ElMessageBox.alert("修改失败");
    location.reload();
  }
};
const onSubmit = () => {
  console.log("submit!");
};
const resetForm = () => {
  form.name = "";
  form.date1 = "";
  form.resource = "";
  form.desc = "";
};
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("你确定要关闭？")
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
</script>

<style lang="scss" scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.user-info-con {
  width: 100%;
  margin-bottom: 10px;
  padding: 15px 19px 18px;
  background: rgb(0, 0, 0);
  border: 1px solid rgb(61, 2, 199);
  border-radius: 8.5px;
  .top {
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    box-sizing: border-box;
    padding-bottom: 18px;
    border-bottom: 1px solid rgb(61, 2, 199);
    margin-bottom: 10px;
    span {
      line-height: 23px;
      font-size: 14px;
      color: white;
    }
  }
  .bottom {
    display: flex;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    width: 100%;
    .item {
      flex-shrink: 0;
      width: 139px;
      margin: 10px 0;
      white-space: nowrap;
      &:nth-child(2) {
        text-align: right;
      }
      span {
        display: inline-block;
        min-width: 24px;
        font-size: 12px;
        line-height: 16px;
        color: rgb(190, 190, 190);
        margin-right: 6px;
      }
    }
  }
}
</style>
