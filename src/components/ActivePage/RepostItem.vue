<template>
  <div class="multi">
    //<span>@{{ uname }}</span
    >:{{ repostContent }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  item: {
    type: Object,
    default: () => {},
  },
  uname: {
    type: String,
    default: "",
  },
  repostContent: {
    type: String,
    default: "",
  },
  id: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.multi {
  display: flex;
  span {
    cursor: pointer;
    color: purple;
  }
}
</style>
