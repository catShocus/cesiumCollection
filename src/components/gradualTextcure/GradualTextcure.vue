<template>
  <div id="geadual-textcure"></div>
</template>
<script setup>
import { onMounted, inject } from "vue";
import * as Cesium from "cesium";
let $viewer;
let grd;
//生成纹理色阶
function getColorRamp(elevationRamp) {
  var ramp = document.createElement("canvas");
  ramp.width = 1;
  ramp.height = 100;
  var ctx = ramp.getContext("2d");

  var values = elevationRamp;
  grd = ctx.createLinearGradient(0, 0, 0, 100);
  grd.addColorStop(values[0], "#000000"); //black
  grd.addColorStop(values[1], "#2747E0"); //blue
  grd.addColorStop(values[2], "#D33B7D"); //pink
  grd.addColorStop(values[3], "#D33038"); //red
  grd.addColorStop(values[4], "#FF9742"); //orange
  grd.addColorStop(values[5], "#ffd700"); //yellow
  grd.addColorStop(values[6], "#ffffff"); //white

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 1, 100);
  return ramp;
}
onMounted(() => {
  $viewer = inject("viewer");

  $viewer.entities.add({
    name: "Red wall at height",
    wall: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        121.444409, 31.247417, 200.0, 121.533521, 31.235685, 200.0, 121.563273,
        31.190347, 200.0, 121.546744, 31.194054, 200.0, 121.516705, 31.191459,
        200.0, 121.502188, 31.203074, 200.0,
      ]),
      minimumHeights: [3000.0, 2000.0, 2000, 2000, 2000, 3000],
      material: getColorRamp([0.0, 0.045, 0.1, 0.15, 0.37, 0.54, 1.0], true),
      transparent: true,
    },
  });
  $viewer.flyTo($viewer.entities);
});
</script>
<style scoped lang='scss'>
</style>
