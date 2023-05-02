<template>
  <div class="multi">
    //<span @click="goto">@{{ uname }}</span
    >:{{ repostContent }}
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
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
const goto = () => {
  router.push({
    path: "/user/" + props.id + "/main",
  });
};
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
