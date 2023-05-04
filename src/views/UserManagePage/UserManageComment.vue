<template>
  <el-table :data="pagedTableData" style="width: 100%">
    <el-table-column fixed prop="avatar" label="用户头像" width="125">
      <template #default="{ row }">
        <el-image
          style="width: 100px; height: 100px; border-radius: 50%"
          :src="baseUrl + row.avatar"
          fit="cover"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column prop="uname" label="用户名" width="240" />
    <el-table-column
      prop="content"
      label="内容"
      width="320"
      :show-overflow-tooltip="true"
    />
    <el-table-column prop="create_time" label="发布时间" width="200">
      <template #default="{ row }">
        <span>{{ new Date(row.create_time).toLocaleString() }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="img" label="视频" width="150">
      <template #default="{ row }">
        <el-image
          style="width: 150px; height: 80px"
          :src="baseUrl2 + row.img"
          fit="cover"
        ></el-image>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="120">
      <template #default="{ row }">
        <el-button
          link
          type="primary"
          size="small"
          @click="handleClick(row.comment_id)"
          >删除</el-button
        >
        <el-button link type="primary" size="small" @click="handleGO(row.vid)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
    v-model:current-page="currentPage"
    v-model:page-size="pageSize"
    :page-sizes="[4, 8, 16, 32]"
    :small="small"
    :disabled="disabled"
    :background="background"
    layout="sizes, prev, pager, next"
    :total="tableData.length"
  />
</template>

<script setup lang="ts">
import { ref, onMounted, watchEffect, defineProps, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { commentDelete } from "@/api/comment";
import { ElMessage } from "element-plus";
import { useManageStore } from "@/stores/manage";
const store = useManageStore();
const router = useRouter();
const currentPage = ref(1);
const pageSize = ref(8);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const baseUrl = "http://localhost:3000/avatar/";
const baseUrl2 = "http://localhost:3000/videoImg/";
const props = defineProps({
  commentData: {
    type: Object,
    required: true,
  },
});
const tableData = ref([]);
watchEffect(() => {
  if (props.commentData) {
    tableData.value = props.commentData;
  }
});
const pagedTableData = computed(() => {
  const startIndex = (currentPage.value - 1) * pageSize.value;
  const endIndex = startIndex + pageSize.value;
  return tableData.value.slice(startIndex, endIndex);
});
onMounted(() => {
  store.index = "4";
});
const handleClick = async (id) => {
  const res = await commentDelete(id);
  if (res.error) {
    ElMessage.error("删除失败");
  } else {
    ElMessage.success("删除成功");
    location.reload();
  }
};
const handleGO = (id) => {
  router.push({
    name: "video",
    path: "/video",
    query: {
      vid: id,
    },
  });
};
</script>

<style lang="scss" scoped></style>
