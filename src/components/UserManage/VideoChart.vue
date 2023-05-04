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
      <div ref="chartRef" class="chart" id="main"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  watch,
  onMounted,
  defineProps,
  onUnmounted,
} from "vue";
import * as echarts from "echarts";
import * as XLSX from "xlsx";
import { useUserStore } from "@/stores/user";
import { useVideoChartStore } from "@/stores/videochart";
import { getVideoLikesChart } from "@/api/like";
import { getVideoCommentsChart } from "@/api/comment";
import { getVideoWatchChart } from "@/api/watch";
import { getVideoCollectChart } from "@/api/collect";
import { getVideoDanmakuChart } from "@/api/danmaku";
const chartStore = useVideoChartStore();
const store = useUserStore();
const chartRef = ref(null);
const data = ref([]);
let myChart = null;
onMounted(async () => {
  initALL();
});
onUnmounted(() => {
  chartStore.resetAll();
});
const exportToExcel = () => {
  const fileName = `${chartStore.form.title}-${chartStore.time}${
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
const initALL = async () => {
  myChart = echarts.init(chartRef.value);
  data.value = await getVideoLikesChart(chartStore.vid, "昨日");
  const arr = await fetchAll(chartStore.vid, "昨日");
  arr.forEach((item, index) => {
    chartStore.setUpdate(index, arr[index], "昨日");
  });
  initChart(data.value);
};
//这里
const fetchAll = async (followedId, type) => {
  const follow = await getVideoLikesChart(followedId, type);
  const comment = await getVideoCommentsChart(followedId, type);
  const watch = await getVideoWatchChart(followedId, type);
  const collect = await getVideoCollectChart(followedId, type);
  const danma = await getVideoDanmakuChart(followedId, type);
  return [follow, comment, watch, collect, danma];
};

//这里
const fetchData = async (followedId: number, type) => {
  try {
    if (chartStore.currentIndex == 1) {
      return await getVideoLikesChart(followedId, type);
    } else if (chartStore.currentIndex == 2) {
      return await getVideoCommentsChart(followedId, type);
    } else if (chartStore.currentIndex == 3) {
      return await getVideoWatchChart(followedId, type);
    } else if (chartStore.currentIndex == 4) {
      return await getVideoCollectChart(followedId, type);
    } else if (chartStore.currentIndex == 5) {
      return await getVideoDanmakuChart(followedId, type);
    }
  } catch (error) {}
};
watch(
  () => chartStore.time,
  async (newVal) => {
    data.value = await fetchAll(chartStore.vid, newVal);
    data.value.forEach((item, index) => {
      chartStore.setUpdate(index, data.value[index], newVal);
    });
    initChart(data.value[chartStore.currentIndex - 1]);
  }
);
watch(
  () => chartStore.currentIndex,
  async (newVal) => {
    data.value = await fetchData(chartStore.vid, chartStore.time);
    const key = Object.keys(data.value[0])[1];
    chartStore.setUpdate(
      chartStore.currentIndex - 1,
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
      triggerOn: "mousemove|click",
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
.chart {
  width: 800px;
  height: 300px;
}
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
