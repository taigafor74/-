<template>
  <div class="ac-con">
    <div class="top">
      <ActiveInput />
      <ActiveCard v-for="item in data" :item="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import ActiveCard from "@/components/ActivePage/ActiveCard.vue";
import ActiveInput from "@/components/ActivePage/ActiveInput.vue";
import { getAllActive } from "@/api/active";
const data = ref([]);
onMounted(async () => {
  const res = await getAllActive();
  data.value = res;
  console.log(data.value);
});
</script>

<style lang="scss" scoped>
.ac-con {
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 56px);
  padding: 20px;
  background: #3d3c3c;
  display: flex;
  justify-content: center;
}
</style>
