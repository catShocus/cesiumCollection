<template>
  <div id="custom-geometry"></div>
</template>
<script setup>
import * as Cesium from "cesium";
import { onMounted, inject, onUnmounted } from "vue";
import AddCustomPolygon from "./utils/addPolygon";

let $viewer;
const sectorPolygon = new AddCustomPolygon();
onMounted(() => {
  $viewer = inject("viewer");
  sectorPolygon.addPolygon($viewer);
  sectorPolygon.addTraversePolygon($viewer);
});

onUnmounted(() => {
  sectorPolygon.removeSector($viewer);
});
</script>
<style scoped lang='scss'>
</style>