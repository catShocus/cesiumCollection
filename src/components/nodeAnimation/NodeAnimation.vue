<template>
  <div id="node-animation"></div>
  <!-- 第二个viewer -->
  <NodeAnimationTwo :viewerTwoClickNode="viewerTwoClickNode"></NodeAnimationTwo>
</template>

<script setup>
import * as Cesium from "cesium";
import NodeAnimationTwo from "./NodeAnimationTwo.vue";
import { onMounted, inject, onUnmounted, watch, ref, reactive } from "vue";
import LoadData from "../../utils/loadDatas";
import ControlCabinet from "./utils/controlCabinet";
import GateController from "./utils/controlGate";
import { wdmgtNameArr } from "./data/cabinetDatas";
import { gateNameArr } from "./data/gateDatas";

let $viewer;
let model;
let loadGltfData;
let controlFrontCabinet = [
  "firstCabinet",
  "twoCabinet",
  "threeCabinet",
  "fourCabinet",
  "fiveCabinet",
  "sixCabinet",
];
let controlBehindCabinet = [
  "firstBehindCabinet",
  "twoBehindCabinet",
  "threeBehindCabinet",
  "fourBehindCabinet",
  "fiveBehindCabinet",
  "sixBehindCabinet",
];
let gateOpenHeight = ref(null);
let controlCabinet;
let gateHandler;
let viewerTwoClickNode = reactive({
  clickGateNode: null,
  clickHoistNode: null,
});
// let index = 0
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
  // try {
  controlCabinet = new ControlCabinet($viewer);
  //   controlCabinet.openCabinet(model, wdmgtNameArr);
  //   controlCabinet.closeCabinet(model, wdmgtNameArr);
  // } catch (error) {
  //   console.log(error, "---错误提示");
  // }

  /* 闸门动画 */
  gateHandler = new Cesium.ScreenSpaceEventHandler($viewer.scene.canvas);
  gateHandler.setInputAction(async (event) => {
    const pickedObject = $viewer.scene.pick(event.position);
    if (
      Cesium.defined(pickedObject) &&
      Cesium.defined(pickedObject.detail.node)
    ) {
      const nodeName = pickedObject.detail.node._name;
      let node = model.getNode(nodeName);
      console.log(node.name, "---node");
      let currentNode;
      for (const gate of gateNameArr) {
        const button = gate.cabinetButton.find((btn) => btn.name == node.name);
        if (button) {
          currentNode = gate;
        }
      }
      console.log(currentNode, "---currentNode");
      //启动按钮逻辑判断
      if (
        node.name != currentNode.cabinetButton[0].name &&
        currentNode.cabinetButton[0].status == false
      ) {
        ElMessage({
          message: "请先点击：远控",
          type: "warning",
        });
        return;
      } else if (node.name == currentNode.cabinetButton[0].name) {
        currentNode.cabinetButton[0].status = true;

        let cabinetFrontNode = model.getNode(currentNode.gateFrontName);

        let hoistFrontNode = model.getNode(currentNode.hoistFrontName);
        // let ropeFrontNode = model.getNode("WDMQBJ320");
        controlFrontCabinet[currentNode.id - 1] = new GateController(
          $viewer,
          cabinetFrontNode,
          hoistFrontNode
          // ropeFrontNode
        );
        ElMessage({
          message: "远控开启成功",
          type: "success",
        });
      }

      if (node.name == currentNode.cabinetButton[4].name) {
        currentNode.cabinetButton[4].status = true;
        ElMessage({
          message: "下扉门合闸成功",
          type: "success",
        });
      }

      if (
        node.name == currentNode.cabinetButton[1].name &&
        currentNode.cabinetButton[4].status == false
      ) {
        ElMessage({
          message: "请点击：下扉门合闸",
          type: "warning",
        });
        return;
      } else if (
        node.name == currentNode.cabinetButton[1].name &&
        currentNode.cabinetButton[4].status == true &&
        currentNode.cabinetButton[0].status == true
      ) {
        currentNode.cabinetButton[1].status = true;
        ElMessage({
          message: "下扉门开启成功",
          type: "success",
        });
        viewerTwoClickNode.clickGateNode = currentNode.gateFrontName;
        viewerTwoClickNode.clickHoistNode = currentNode.hoistFrontName;
        controlFrontCabinet[currentNode.id - 1].openFrontGateSelf(true, false);
      }

      //下闸门关闭逻辑判断
      if (node.name == currentNode.cabinetButton[2].name) {
        ElMessage({
          message: "下扉门关闭",
          type: "success",
        });
        controlFrontCabinet[currentNode.id - 1].openFrontGateSelf(false, false);
      }

      //下扉门停止按钮逻辑判断
      if (node.name == currentNode.cabinetButton[3].name) {
        ElMessage({
          message: "下扉门停止",
          type: "success",
        });
        controlFrontCabinet[currentNode.id - 1].stopOpening();
      }

      //下扉门分闸按钮逻辑判断
      if (node.name == currentNode.cabinetButton[5].name) {
        ElMessage({
          message: "下扉门分闸",
          type: "success",
        });
        //分闸之后，所有按钮状态为false
        currentNode.cabinetButton.forEach((item) => {
          item.status = false;
        });
      }

      //上扉门开启按钮逻辑判断
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});

//事件解绑，防止其影响下一组件
onUnmounted(() => {
  loadGltfData.removeGltfData();
  controlCabinet.destroyHandler();
  gateHandler && gateHandler.destroy();
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
  .gateOpenHeight {
    display: flex;
    align-items: center;
    border-bottom: 3px solid rgba(9, 105, 78, 0.5);
    margin-top: 5px;
    padding-bottom: 5px;
    h4 {
      color: aqua;
    }
    span {
      display: inline-block;
      color: white;
      border-radius: 5px;
      border: 2px solid rgb(77, 151, 151);
      width: 200px;
      height: 25px;
      overflow: hidden;
    }
  }
}
</style>