<template>
  <div id="primitive-textcure"></div>
</template>
<script setup>
import * as Cesium from "cesium";
import LoadByPrimitive from "../../utils/classLoadDataByPrimitive";
import { onMounted, inject, onUnmounted } from "vue";

let $viewer;
let loadTextcure = new LoadByPrimitive();
onMounted(() => {
  $viewer = inject("viewer");
  loadTextcure.setTextToCanvas();
  loadTextcure.addPrimitive($viewer);
});

onUnmounted(() => {
  loadTextcure.removeData($viewer);
});
</script>
<style scoped lang='scss'>
</style>
