import { defineStore } from "pinia";

export const useChartStore = defineStore({
  id: "chart",

  state: () => ({
    time: "昨日",
    item: [
      { name: "新增粉丝", index: 1, num: 0, origin: 0 },
      { name: "新增点赞", index: 2, num: 0, origin: 0 },
      { name: "新增视频评论", index: 3, num: 0, origin: 0 },
      { name: "新增视频收藏", index: 4, num: 0, origin: 0 },
      { name: "新增播放", index: 5, num: 0, origin: 0 },
    ],
    currentIndex: 1,
  }),

  actions: {
    setUpdate(index, key, data, type) {
      if (type === "昨日") {
        let originLength = data[data.length - 1][`${key}`];

        this.item[index].num = this.item[index].origin - originLength;
      }
      if (type === "近七天") {
        let originLength = data[0][`${key}`];
        this.item[index].num = this.item[index].origin - originLength;
      }
      if (type === "历史累计") {
        let originLength = data[0][`${key}`];
        this.item[index].num = this.item[index].origin - originLength;
      }
    },
  },
});
