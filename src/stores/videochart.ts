import { defineStore } from "pinia";

export const useVideoChartStore = defineStore({
  id: "videochart",

  state: () => ({
    time: "昨日",
    currentIndex: 1,
    vid: null,
    form: {},
    item: [],
  }),

  actions: {
    setUpdate(index, data, type) {
      const key = Object.keys(data[0])[1];
      if (type === "昨日") {
        let originLength = data[data.length - 1][key];
        this.item[index].num = this.item[index].origin - originLength;
      }
      if (type === "近七天") {
        let originLength = data[0][key];
        this.item[index].num = this.item[index].origin - originLength;
      }
      if (type === "历史累计") {
        let originLength = data[0][key];
        this.item[index].num = this.item[index].origin - originLength;
      }
    },
    resetAll() {
      this.item = [];
      this.currentIndex = 1;
      this.vid = 1;
      this.form = {};
      this.time = "昨日";
      this.vid = null;
    },
  },
});
