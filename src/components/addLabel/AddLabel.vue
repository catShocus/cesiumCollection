<template>
  <div class="add-label"></div>
</template>
<script setup>
import { onMounted, inject } from "vue";
import * as Cesium from "cesium";
import MapConfig from "../../utils/classMapConfig";

let $viewer;
const terrainMapConfig = new MapConfig();
onMounted(() => {
  $viewer = inject("viewer");
  terrainMapConfig.setTerrain($viewer);
});
</script>
<style scoped lang='scss'>
</style>
