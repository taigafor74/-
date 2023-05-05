<template>
  <div class="demo-pagination-block">
    <div class="demonstration"></div>
    <el-pagination
      v-model:current-page="store.currentPage"
      v-model:page-size="store.pageSize"
      :page-sizes="[5, 10, 20, 30]"
      :small="small"
      :disabled="disabled"
      :background="background"
      layout="sizes, prev, pager, next"
      :total="store.Data.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from 'vue'
import { useCutStore } from '@/stores/cut'
const store = useCutStore()
const small = ref(false)
const background = ref(false)
const disabled = ref(false)

watchEffect(() => {
  const start = (store.currentPage - 1) * store.pageSize
  const end = start + store.pageSize
  store.setData(store.Data.slice(start, end))
})
const handleSizeChange = (val: number) => {
  store.pageSize = val
}
const handleCurrentChange = (val: number) => {
  store.currentPage = val
}
</script>

<style lang="scss" scoped>
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>
