<template>
  <div class="desc-con">
    <div class="info">
      <div class="info-2">
        {{ data.description }}
      </div>
    </div>
    <div class="tag">
      <ul
        class="tag-list"
        ref="tagList"
        :style="{ height: show ? '100%' : '36px' }"
      >
        <li @click="goto(item)" v-for="item in data.tags">{{ item }}</li>
      </ul>
      <div
        class="arrow"
        ref="arrow"
        @click="showAllTag"
        :style="{ transform: show ? 'rotate(-90deg)' : 'rotate(90deg)' }"
      >
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xml:space="preserve"
            data-pointer="none"
            viewBox="0 0 16 16"
            fill="#c0c0c0"
          >
            <path
              d="m9.188 7.999-3.359 3.359a.75.75 0 1 0 1.061 1.061l3.889-3.889a.75.75 0 0 0 0-1.061L6.89 3.58a.75.75 0 1 0-1.061 1.061l3.359 3.358z"
            ></path>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, watchEffect, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const data = ref([]);
const props = defineProps({
  data: {
    type: Object,
    require: true,
  },
});
onMounted(() => {
  watchEffect(() => {
    if (props.data.tags) {
      data.value = props.data;
      const inputString = data.value.tags;
      const cleanStr = inputString.slice(1, -1);
      const stringArray = cleanStr.split(",");
      data.value.upload_date = new Date(
        data.value.upload_date
      ).toLocaleString();

      data.value.tags = stringArray;
    }
  });
});
const arrow: any = ref(null);
const show = ref(false);
const tagList: any = ref(null);
function showAllTag() {
  show.value = !show.value;
}
const goto = (item) => {
  router.push({
    path: `/search/${item}/video`,
  });
};
</script>

<style lang="scss" scoped>
.desc-con {
  .info {
    margin: 18px 0;
    .info-2 {
      height: auto;
      font-size: 16px;
      line-height: 26px;
      white-space: pre-line;
      word-break: break-all;
      overflow: hidden;
      letter-spacing: 0;
      font-weight: 400;
    }
  }
  .tag {
    font-weight: 400;
    margin-top: 18px;
    padding-bottom: 10px;
    margin: 16px 0 20px 0;
    border-bottom: 1px solid rgb(68, 68, 68);
    display: flex;
    justify-content: space-between;
    .tag-list {
      display: flex;
      flex-wrap: wrap;
      height: 32px;
      overflow: hidden;
      li {
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        height: 32px;
        padding: 0 12px;
        margin-right: 10px;
        margin-bottom: 10px;
        border-radius: 12px;
        background-color: rgb(68, 68, 68);
        color: #d8d8d8;
        font-size: 14px;
      }
    }
    .arrow {
      width: 24px;
      height: 24px;
      transform: rotate(90deg);
      margin-top: 6px;
      div {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(68, 68, 68);
        border-radius: 50%;
        height: 100%;
        width: 100%;
        svg {
          width: 24px;
          height: 24px;
        }
      }
    }
  }
}
</style>
