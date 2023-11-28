<template>
  <div id="polyline-segmental"></div>
</template>
<script setup>
import { onMounted, inject, onUnmounted } from "vue";
import PolylineSegmental from "./utils/classAddPolylineSegmental";
import * as Cesium from "cesium";

let $viewer;
const addPolylineSegment = new PolylineSegmental();
let a = {
  number: 11,
  age: 22,
  height: 33,
};
onMounted(() => {
  $viewer = inject("viewer");
  $viewer.camera.flyHome(1)
  addPolylineSegment.addRedLine($viewer);
  addPolylineSegment.addGreenRhumbLine($viewer);/* 恒定航向弧线 */
  addPolylineSegment.addGlowingLine($viewer);/* 发光线 */
  addPolylineSegment.addOrangeOutlined($viewer);
  addPolylineSegment.addPurpleArrow($viewer);/* 直线段 */
  addPolylineSegment.addDashedLine($viewer);/* 蓝色虚直线 */
});

onUnmounted(() => {
    $viewer.entities.removeAll()
})
</script>
<style scoped lang='scss'>
</style>

