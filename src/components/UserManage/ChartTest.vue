<template>
  <div>
    <div class="chart-con">
      <div class="header">
        <div class="name">七日新增用户数据</div>
        <div class="export">导出数据</div>
      </div>
      <div ref="chartRef" style="width: 100%; height: 100%"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount, watch } from "vue";
import * as echarts from "echarts";
import { useUserStore } from "@/stores/user";
import { getSevenFollowers } from "@/api/follow";
const store = useUserStore();

const chart = ref(null);
const chartRef = ref(null);

onBeforeMount(() => {
  fetchData(store.id);
});

watch(chartRef, () => {
  if (chartRef.value) {
    initChart();
  }
});
const initChart = (data) => {
  if (!chart.value) {
    chart.value = echarts.init(chartRef.value as HTMLElement);
  }
  if (!data) {
    return;
  }
  const xAxisData = data.map((item) => {
    const date = new Date(item.date);
    return date.toLocaleDateString();
  });
  const yAxisData = data.map((item) => item.total_followers);

  const options = {
    animation: {
      duration: 300,
      easing: "cubicOut",
      animation: "auto",
      animationDuration: 1000,
      animationDurationUpdate: 500,
      animationEasing: "cubicInOut",
      animationEasingUpdate: "cubicInOut",
      animationThreshold: 2000,
      progressiveThreshold: 3000,
      progressive: 400,
      hoverLayerThreshold: 3000,
      useUTC: false,
    },

    tooltip: {
      trigger: "axis",
      triggerOn: "mousemove",
      alwaysShowContent: true,
      position: function (pt) {
        return [pt[0], 130];
      },
      axisPointer: {
        type: "cross",
      },
      formatter: function (params) {
        const date = params.name;
        const value = params.data;
        return `时间：${date}<br>粉丝数：${value}`;
      },
    },

    xAxis: {
      type: "category",
      data: xAxisData,
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "粉丝数",
        data: yAxisData,
        type: "line",
        smooth: true,
        lineStyle: {
          color: "purple",
          width: 5,
        },
      },
    ],
  };

  chart.value.setOption(options);
};

const fetchData = async (followedId: number) => {
  try {
    const data = await getSevenFollowers(followedId);
    initChart(data);
  } catch (error) {}
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
