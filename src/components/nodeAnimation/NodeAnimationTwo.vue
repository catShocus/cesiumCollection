<template>
  <div id="node-animation-two"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, defineProps, watch } from "vue";
import LoadData from "../../utils/loadDatas";
import GateController from "./utils/controlGate";
//组件传值
const props = defineProps({
  viewerTwoClickNode: Object,
});

//初始化数据
let loadGltfData;
let model;
let viewerTwo;
function initData(url) {
  loadGltfData = new LoadData(viewerTwo);
  return loadGltfData.addGltfModel(url);
}

//通过侦听属性获取父组件点击的节点
watch(props.viewerTwoClickNode, (newValue) => {
  if (newValue) {
    let gateNode = model.getNode(props.viewerTwoClickNode.clickGateNode);
    let hoistNode = model.getNode(props.viewerTwoClickNode.clickHoistNode);
    const viewerTwoGateController = new GateController(
      viewerTwo,
      gateNode,
      hoistNode
    );
    viewerTwoGateController.openFrontGateSelf(true, false);
    console.log(viewerTwoGateController, "---测试");
  }
});

onMounted(() => {
  viewerTwo = new Cesium.Viewer("node-animation-two", {
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
    shouldAnimate: true,
  });

  let url = "/src/assets/cabinet_animation_data/柜门动画原点调整.glb";
  model = initData(url);
});
</script>

<style scoped lang='scss'>
#node-animation-two {
  position: absolute;
  top: 60%;
  left: 80%;
  width: 300px;
  height: 300px;
  border: 1px solid red;
}
</style>