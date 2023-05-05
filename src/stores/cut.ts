import { defineStore } from 'pinia'

export const useCutStore = defineStore({
  id: 'cut',

  state: () => ({
    currentPage: 1,
    pageSize: 10,
    Data: [],
    filteredTableData: []
  }),

  actions: {
    // 3. 更新 handleSizeChange 和 handleCurrentChange 函数
    handleSizeChange(val: number) {
      this.pageSize = val
    },
    handleCurrentChange(val: number) {
      this.currentPage = val
    },
    setData(data: any) {
      this.filteredTableData = data
    }
  }
})
