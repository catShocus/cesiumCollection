<template>
  <div id="clamp-ground"></div>
</template>
<script setup>
import * as Cesium from "cesium";
import { onMounted, inject, onUnmounted } from "vue";
import axios from "axios";
import LoadData from "../../utils/loadDatas";
import MapConfig from "../../utils/classMapConfig";

let $viewer;
let linePositions = [];
let lineEntity;
const loadLineData = new LoadData();
const clampMapConfig = new MapConfig();
onMounted(async () => {
  $viewer = inject("viewer");
  //添加自定义地形 and 开启地形深度检测
  clampMapConfig.setTerrain($viewer);
  //添加geojson数据
  let lineGeojson = await axios.get(
    "/src/components/clampToGround/assest/甘肃省.geojson"
  );
  linePositions = lineGeojson.data.features[0].geometry.coordinates[0].flat(2);
  lineEntity = loadLineData.addEntityPoint($viewer, linePositions);
  $viewer.flyTo(lineEntity);
});

onUnmounted(() => {
  loadLineData.removeGeojson($viewer);
  clampMapConfig.destroyConfig($viewer);
});
</script>
<style scoped lang='scss'>
</style>