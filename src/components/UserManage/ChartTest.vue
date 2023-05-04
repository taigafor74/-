<template>
  <div>
    <div class="chart-con">
      <div class="header">
        <div class="name">
          {{ chartStore.time
          }}{{ chartStore.item[chartStore.currentIndex - 1].name }}数据
        </div>
        <div class="export" @click="exportToExcel">导出数据</div>
      </div>
      <div ref="chartRef" style="width: 100%; height: 300px" id="main"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch, onMounted, defineProps } from "vue";
import * as echarts from "echarts";
import { useUserStore } from "@/stores/user";
import { useChartStore } from "@/stores/userchart";
import { getCountFollowers } from "@/api/follow";
import * as XLSX from "xlsx";
import { getCountLikes, getTotalLikes } from "@/api/like";
import { getWatchChart, getTotalWatch } from "@/api/watch";
import { getCommentsChart, getTotalComment } from "@/api/comment";
import { getCollectChart, getTotalCollect } from "@/api/collect";
import { getFans } from "@/api/follow";
const chartStore = useChartStore();
const store = useUserStore();
const chartRef = ref(null);
const data = ref([]);
let myChart = null;
onMounted(async () => {
  initALL();
});
const initALL = async () => {
  myChart = echarts.init(chartRef.value);
  const lengthArr = [];
  let data1 = await getFans(store.id);
  data1 = data1.length;
  lengthArr.push(data1);
  const data2 = await getTotalLikes(store.id);
  lengthArr.push(data2);
  const data3 = await getTotalComment(store.id);
  lengthArr.push(data3);
  const data4 = await getTotalCollect(store.id);
  console.log(data4);

  lengthArr.push(data4);
  const data5 = await getTotalWatch(store.id);
  lengthArr.push(data5);
  const arr = await fetchAll(store.id, chartStore.time);
  arr.forEach((item, index) => {
    chartStore.item[index].origin = lengthArr[index];
  });
  data.value = arr[0];
  const data11 = arr[1];
  const data22 = arr[2];
  const data33 = arr[3];
  const data44 = arr[4];
  const key = Object.keys(data.value[0])[1];
  const key11 = Object.keys(data11[0])[1];
  const key22 = Object.keys(data22[0])[1];
  const key33 = Object.keys(data33[0])[1];
  const key44 = Object.keys(data44[0])[1];
  chartStore.setUpdate(0, key, data.value, "昨日");
  chartStore.setUpdate(1, key11, data11, "昨日");
  chartStore.setUpdate(2, key22, data22, "昨日");
  chartStore.setUpdate(3, key33, data33, "昨日");
  chartStore.setUpdate(4, key44, data44, "昨日");
  initChart(data.value);
};
const fetchAll = async (followedId, type) => {
  const follow = await getCountFollowers(followedId, type);
  const like = await getCountLikes(followedId, type);
  const comment = await getCommentsChart(followedId, type);
  const collect = await getCollectChart(followedId, type);
  const watch = await getWatchChart(followedId, type);

  return [follow, like, comment, collect, watch];
};
const fetchData = async (followedId: number, type) => {
  try {
    if (chartStore.currentIndex == 1) {
      return await getCountFollowers(followedId, type);
    } else if (chartStore.currentIndex == 2) {
      return await getCountLikes(followedId, type);
    } else if (chartStore.currentIndex == 3) {
      return await getCommentsChart(followedId, type);
    } else if (chartStore.currentIndex == 4) {
      return await getCollectChart(followedId, type);
    } else if (chartStore.currentIndex == 5) {
      return await getWatchChart(followedId, type);
    }
  } catch (error) {}
};
const exportToExcel = () => {
  const fileName = `用户核心数据-${chartStore.time}${
    chartStore.item[chartStore.currentIndex - 1].name
  }.xlsx`; // 您可以自定义文件名
  const chartData = data.value.map((item) => {
    const date = new Date(item.date);
    const dateString = date.toLocaleDateString();
    const key = Object.keys(item)[1];
    return {
      date: dateString,
      [key]: item[key],
    };
  });
  const ws = XLSX.utils.json_to_sheet(chartData); // 将 JSON 数据转换为表格数据
  const wb = XLSX.utils.book_new(); // 创建新的工作簿
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1"); // 将表格数据添加到工作簿
  XLSX.writeFile(wb, fileName); // 将工作簿保存为文件并下载
};
watch(
  () => chartStore.time,
  async (newVal) => {
    data.value = await fetchAll(store.id, newVal);
    data.value.forEach((item, index) => {
      const key = Object.keys(data.value[index][0])[1];
      chartStore.setUpdate(index, key, data.value[index], newVal);
    });
    initChart(data.value[chartStore.currentIndex - 1]);
  }
);
watch(
  () => chartStore.currentIndex,
  async (newVal) => {
    data.value = await fetchData(store.id, chartStore.time);
    const key = Object.keys(data.value[0])[1];
    chartStore.setUpdate(
      chartStore.currentIndex - 1,
      key,
      data.value,
      chartStore.time
    );
    initChart(data.value);
  }
);
const initChart = (data) => {
  const key = Object.keys(data[0])[1];
  const xAxisData = data.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString();
  });
  const yAxisData = data.map((item) => item[`${key}`]);
  myChart.setOption({
    title: {
      text: "",
    },
    tooltip: {
      trigger: "axis",
      triggerOn: "mousemove",
      position: function (pt) {
        return [pt[0], 130];
      },
      axisPointer: {
        type: "line",
      },
    },
    xAxis: {
      data: xAxisData,
    },
    yAxis: {},
    series: [
      {
        type: "line",
        name: `${key}`,
        data: yAxisData,
        smooth: true,
        showSymbol: false,
        lineStyle: {
          color: "purple",
          width: 5,
        },
      },
    ],
  });
};
</script>

<style lang="scss" scoped>
.chart-con {
  width: 100%;
  height: 332px;
  background: black;
  border-radius: 16px;
  padding: 24px 32px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .name {
      font-weight: 600;
      font-size: 16px;
    }
    .export {
      font-size: 14px;
      color: #666;
      cursor: pointer;
      &:hover {
        color: #333;
      }
    }
  }
}
</style>
