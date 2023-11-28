<template>
  <div id="load-control"></div>
</template>
<script setup>
import * as Cesium from "cesium";
import MapWidgets from "./utils/classMapWidgets";
import { onMounted, inject } from "vue";

let $viewer;
let mapWidgets = new MapWidgets();
onMounted(() => {
  $viewer = inject("viewer");
  mapWidgets.setMapWidgets($viewer);
});
</script>
<style scoped lang='scss'>
// :global(.compass) {
//   left: 0px;
//   transform: scale(0.85);
// }
</style>
