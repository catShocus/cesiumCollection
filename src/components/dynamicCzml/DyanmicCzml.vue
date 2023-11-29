<template>
  <div id="dynamic-czml">
    <button class="start-button" @click="startButton()">StartButton</button>
    <button class="end-button" @click="endButton()">EndButton</button>
  </div>
</template>
<script setup>
import * as Cesium from "cesium";
import { czml } from "./data/czml";
import { onMounted, inject, onUnmounted } from "vue";

let $viewer;
let czmlInterval;
//开启按钮
const startButton = () => {
  rstCzml($viewer);
};

//结束按钮
const endButton = () => {
  clearInterval(czmlInterval);
};

function rstCzml(viewer) {
  let dataSourcePromise;
  let i = 30.957024;
  let a = 60;
  czmlInterval = setInterval(() => {
    i += 0.0001;
    a += 10;
    czml[1].position.cartographicDegrees.push(a, 118.8747338, i, 0);
    czml[0].clock.currentTime = viewer.clock.currentTime.toString();
    viewer.entities.removeAll();
    viewer.dataSources.add(Cesium.CzmlDataSource.load(czml));
  }, 1000);
  dataSourcePromise = Cesium.CzmlDataSource.load(czml);
  viewer.dataSources.add(dataSourcePromise);
  viewer.zoomTo(dataSourcePromise);
}

onMounted(() => {
  $viewer = inject("viewer");
});

onUnmounted(() => {});
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
