<template>
  <div class="DataView-con">
    <div class="header">
      <div class="header-title">核心数据统计</div>
      <div style="width: 200px">
        <el-form-item label="时间选择">
          <el-select v-model="chartStore.time" width="20px">
            <el-option label="昨日" value="昨日" />
            <el-option label="近七天" value="近七天" />
            <el-option label="历史累计" value="历史累计" />
          </el-select>
        </el-form-item>
      </div>
    </div>
    <div class="card-con">
      <div
        class="card"
        v-for="item in chartStore.item"
        :key="item.index"
        ref="refList"
        @click="chooseCard(item.index)"
      >
        <div class="top">
          <div class="name">
            <div class="icon"></div>
            <div class="text">{{ item.name }}</div>
          </div>
        </div>
        <div class="bottom">{{ item.num }}</div>
      </div>
    </div>
    <ChartTest />
  </div>
</template>

<script setup lang="ts">
import ChartTest from "./ChartTest.vue";
import { ref, onMounted, watchEffect, reactive } from "vue";
import { useChartStore } from "@/stores/userchart";
import { useUserStore } from "@/stores/user";
import { getCountFollowers } from "@/api/follow";
const chartStore = useChartStore();
const store = useUserStore();
const data = ref(null);
onMounted(async () => {
  chooseCard(1);
});
const refList = ref([]);
const chooseCard = (index) => {
  chartStore.currentIndex = index;
  refList.value.forEach((item: any) => {
    item.style.backgroundColor = "#000000";
  });
  refList.value[index - 1].style.backgroundColor = "purple";
};
</script>

<style lang="scss" scoped>
.DataView-con {
  width: 100%;
  margin-top: 10px;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 50px;
  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .header-title {
      margin-right: 4px;
      color: #fefefe;
      font-weight: 600;
      font-size: 18px;
      line-height: 25px;
    }
  }
  .card-con {
    width: 100%;
    margin-top: 24px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    margin-bottom: 20px;
    gap: 16px;
    .card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 14px;
      color: #99a0a8;
      cursor: pointer;
      background-color: #000000;
      border-radius: 16px;
      .top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .name {
          display: flex;
          align-items: center;
          .text {
            display: inline-block;
            font-size: 12px;
            opacity: 0.8;
          }
        }
      }
      .bottom {
        margin-top: 10px;
        font-weight: 800;
        font-size: 21px;
        line-height: 21px;
        color: #cdcdce;
        box-sizing: border-box;
        letter-spacing: 1px;
      }
    }
  }
}
</style>
