<template>
  <div id="dynamic-czml">
    <button class="start-button" @click="startButton()">StartButton</button>
    <button class="end-button" @click="endButton()">EndButton</button>
  </div>
</template>
<script setup>
import * as Cesium from "cesium";
import DynamicCzml from "./utils/classDynamicCzml";
import { onMounted, inject, onUnmounted } from "vue";

let $viewer;
const setDynamicCzml = new DynamicCzml();

//开启动态
const startButton = () => {
  setDynamicCzml.startDynamic($viewer);
};

//停止动态
const endButton = () => {
  setDynamicCzml.stopDynamic();
};

onMounted(() => {
  $viewer = inject("viewer");
  $viewer.camera.flyTo({
    destination: Cesium.Cartesian3.fromDegrees(
      118.87841653400005,
      30.95679870500004,
      0.0
    ),
    orientation: {
      // heading: Cesium.Math.toRadians(1.191094628042772),
      // pitch: -Cesium.Math.PI_OVER_TWO,
      // roll: Cesium.Math.toRadians(0.0000029411615960484028)
      heading: 1.191094628042772,
      pitch: -0.14150746498186884,
      roll: 0.0000029411615960484028,
    },
  });
});

onUnmounted(() => {
  setDynamicCzml.clearDatas($viewer);
});
</script>
<style scoped lang='scss'>
#dynamic-czml {
  position: absolute;
  top: 53px;
  left: 200px;
  width: 300px;
  padding-bottom: 5px;
  //   height: 200px;
  border: 5px solid rgb(143, 236, 210);
  border-radius: 10px;
  .start-button {
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    background: lightblue;
    color: white;
  }
  .end-button {
    padding: 5px;
    margin: 5px;
    border-radius: 5px;
    background: lightblue;
    color: white;
  }
}
</style>
