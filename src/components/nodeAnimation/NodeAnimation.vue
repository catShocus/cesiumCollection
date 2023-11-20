<template>
  <div id="node-animation"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, inject, onUnmounted } from "vue";
import LoadData from "../../utils/loadDatas";
import ControlCabinet from "./utils/controlCabinet";
import { wdmgtNameArr } from "./data/cabinetDatas";
import { gateNameArr } from "./data/gateDatas";

let $viewer;
let model;
let loadGltfData;
let controlCabinet;

//初始化数据
function initData(url) {
  loadGltfData = new LoadData($viewer);
  return loadGltfData.addGltfModel(url);
}

onMounted(async () => {
  $viewer = inject("viewer");
  //加载gltf数据
  let url = "/src/assets/cabinet_animation_data/柜门动画原点调整.glb";
  model = initData(url);

  //控制柜门开关
  controlCabinet = new ControlCabinet($viewer);
  controlCabinet.openCabinet(model, wdmgtNameArr);
  controlCabinet.closeCabinet(model, wdmgtNameArr);
});

//事件解绑，防止其影响下一组件
onUnmounted(() => {
  loadGltfData.removeGltfData();
  controlCabinet.destroyHandler();
});
</script>

<style scoped lang='scss'>
#node-animation {
  position: absolute;
  top: 53px;
  left: 200px;
  width: 300px;
  padding-bottom: 5px;
  height: 200px;
  border: 5px solid rgb(143, 236, 210);
  border-radius: 10px;
}
</style>