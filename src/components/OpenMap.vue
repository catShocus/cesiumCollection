<template>
  <div id="open-map"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";

onMounted(() => {
  /* 地图初始化 */
  Cesium.Ion.defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZjY5M2UwNi1kODhmLTQzZTItYjc4Ni0yMzlmNTBlYmIxYjgiLCJpZCI6MTU3NTE3LCJpYXQiOjE2OTQ1MDMyOTl9.PSElCoyLF_ecNszBWrrOmB9JH7yPxrSLo-Tx4DIm1LU";
  const viewer = new Cesium.Viewer("open-map", {
    geocoder: false,
    homeButton: false,
    navigationHelpButton: false,
    baseLayerPicker: false,
    sceneModePicker: false,
    infoBox: false,
    selectionIndicator: false,
    timeline: false,
    animation: false,
    fullscreenButton: false,
  });
  //   app.provide("viewer", viewer);
});
</script>

<style scoped lang="scss">
#open-map {
  position: absolute;
  top: 53px;
  left: 200px;
  //   height: 100%;
  right: 0;
  bottom: 0;
}
</style>
