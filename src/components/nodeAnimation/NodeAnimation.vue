<template>
  <div id="node-animation"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, inject } from "vue";
import LoadData from "../../utils/loadDatas";

let $viewer;
onMounted(() => {
  $viewer = inject("viewer");
  console.log($viewer, "$viewer");
  //加载gltf数据
  const loadData = new LoadData($viewer);
  console.log(loadData, "loadData");
  let url = "/src/assets/WDMZ/武定门gltf+bin02/wdm.gltf ";
  loadData.addGltfModel(url);
});
</script>

<style scoped lang='scss'>
</style>