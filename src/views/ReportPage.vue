<template>
  <div class="con">
    <div class="main">
      <el-table :data="store.filteredTableData" style="width: 100%">
        <el-table-column
          fixed
          prop="create_time"
          label="时间"
          width="200"
          align="center"
        >
          <template v-slot:default="scope">
            <span>{{ new Date(scope.row.create_time).toLocaleString() }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="rid" label="举报id" width="80" align="center" />
        <el-table-column
          prop="reporter_id"
          label="举报者id"
          width="100"
          align="center"
        />
        <el-table-column
          prop="reported_type"
          label="举报类型"
          width="100"
          align="center"
        >
          <template v-slot:default="scope">
            <span v-if="scope.row.reported_type == 'video'">视频</span>
            <span v-if="scope.row.reported_type == 'barrage'">弹幕</span>
            <span v-if="scope.row.reported_type == 'comment'">评论</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="reason"
          label="举报原因"
          width="300"
          :show-overflow-tooltip="true"
        />
        <el-table-column
          prop="status"
          label="状态"
          width="140"
          :show-overflow-tooltip="true"
        />
        <el-table-column label="操作" align="center" prop="" width="240">
          <template v-slot:default="scope">
            <el-button type="text" size="large" @click="audit(scope.row)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="final_reason"
          label="理由"
          width="80"
          align="center"
        />
      </el-table>
      <CutPage></CutPage>
      <el-dialog v-model="isShowDialog">
        <div class="test">
          <div class="avatar">
            <img :src="avatar" />
          </div>
          <div class="content">{{ type }}：{{ textarea3 }}</div>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import CutPage from "./CutPage.vue";
import { useCutStore } from "@/stores/cut";
import { getReport } from "@/api/report";
import { ElMessage } from "element-plus";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";
const router = useRouter();
const userStore = useUserStore();
const isShowDialog = ref(false);
const isShowApprove = ref(false);
const isShowReject = ref(false);
const textarea1 = ref("");
const textarea3 = ref("");
const rowid = ref(0);
const currentRow = ref(null);
const avatar = ref("");
const data = ref([]);
const type = ref("评论");
const search = ref();
const store = useCutStore();
const handleReject = (row) => {
  isShowReject.value = true;
  rowid.value = row.rid;
  currentRow.value = row;
};
const handleApprove = (row) => {
  isShowApprove.value = true;
  rowid.value = row.rid;
  currentRow.value = row;
};
const submit = async () => {
  const form = {
    status: "通过",
    reason: textarea1.value,
  };
  const res = await updateReport(rowid.value, form);
  if ((res.success = true)) {
    ElMessage.success("操作成功");
    textarea1.value = "";
    currentRow.value.status = "通过";
    currentRow.value.disabled = true;
    isShowApprove.value = false;
  } else {
    ElMessage.error("操作失败");
    textarea1.value = "";
    isShowApprove.value = false;
  }
};
const reject = async () => {
  const form = {
    rid: rowid.value,
    status: "驳回",
    reason: textarea2.value,
  };
  const res = await updateReport(rowid.value, form);
  if ((res.success = true)) {
    ElMessage.success("操作成功");
    currentRow.value.status = "驳回";
    currentRow.value.disabled = true;
    textarea2.value = "";
    isShowReject.value = false;
  } else {
    ElMessage.error("操作失败");
    textarea2.value = "";
    isShowReject.value = false;
  }
};
const formatTimeStmap = (timestamp: any) => {
  //formate video time stamp
  //hh:mm:ss
  let hour = Math.floor(timestamp / 3600);
  let minute = Math.floor((timestamp - hour * 3600) / 60);
  let second = timestamp - hour * 3600 - minute * 60;
  let hourStr = hour < 10 ? "0" + hour : hour;
  let minuteStr = minute < 10 ? "0" + minute : minute;
  let secondStr = second < 10 ? "0" + second : second;
  return hourStr + ":" + minuteStr + ":" + secondStr;
};
const audit = (row: any) => {
  if (row.reported_type == "video") {
    router.push({
      path: "/video",
      query: {
        vid: row.report_target_id,
      },
    });
  }

  isShowDialog.value = true;
  avatar.value = `http://localhost:3000/avatar/${row.avatar}`;
  if (row.reported_type == "comment") {
    type.value = "评论";
    textarea3.value = row.c_content;
  } else if (row.reported_type == "video") {
    type.value = "视频";
    console.log(row);
  } else {
    type.value = "弹幕";
    textarea3.value = row.b_content;
  }
};
const fetchData = async () => {
  const res = await getReport(userStore.id);
  data.value = res.data;
  //   data.value = res.map((item) => ({
  //     ...item,
  //     disabled: item.status !== "未处理",
  //   }));
  store.Data = data.value;
};
fetchData();
// store.Data = tableData as any
</script>

<style lang="scss" scoped>
.main {
  margin-left: 264px;
}
.test {
  width: 100%;
  display: flex;
  align-items: center;
  .avatar {
    width: 60px;
    height: 60px;
    margin-right: 20px;
    img {
      border-radius: 50%;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
