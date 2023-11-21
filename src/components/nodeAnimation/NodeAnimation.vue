<template>
  <div id="node-animation">
    <div class="gateOpenHeight">
      <h4>开启高度：</h4>
      <span>{{ gateOpenHeight }}</span>
    </div>
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
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
  controlCabinet = new ControlCabinet($viewer);
  // controlCabinet.openCabinet(model, wdmgtNameArr);
  // controlCabinet.closeCabinet(model, wdmgtNameArr);

  /* 闸门动画 */
  var gateHandler = new Cesium.ScreenSpaceEventHandler($viewer.scene.canvas);
  gateHandler.setInputAction(async (event) => {
    const pickedObject = $viewer.scene.pick(event.position);
    if (
      Cesium.defined(pickedObject) &&
      Cesium.defined(pickedObject.detail.node)
    ) {
      const nodeName = pickedObject.detail.node._name;
      let node = model.getNode(nodeName);
      console.log(node.name, "---node");
      // let currentNode = gateNameArr.find((item) => {
      //   return item.cabinetButton.remoteControl.name == node.name;
      // });
      let currentNode;
      for (const gate of gateNameArr) {
        const button = gate.cabinetButton.find((btn) => btn.name == node.name);
        if (button) {
          currentNode = gate;
        }
      }

      console.log(currentNode, "---curentNode");
      //启动按钮逻辑判断
      if (
        node.name != currentNode.cabinetButton[0].name &&
        currentNode.cabinetButton[0].status == false
      ) {
        alert("请先点击：远控");
        return;
      } else if (node.name == currentNode.cabinetButton[0].name) {
        currentNode.cabinetButton[0].status = true;
        let cabinetFrontNode = model.getNode(currentNode.gateFrontName);
        let hoistFrontNode = model.getNode(currentNode.hoistFrontName);

        controlFrontCabinet[currentNode.id - 1] = new GateController(
          $viewer,
          cabinetFrontNode,
          hoistFrontNode
        );
        // console.log(controlCabinet[index], "---闸门对象");
        alert("远控开启成功");
      }

      if (node.name == currentNode.cabinetButton[4].name) {
        currentNode.cabinetButton[4].status = true;
        alert("下扉门合闸成功");
      }

      if (
        node.name == currentNode.cabinetButton[1].name &&
        currentNode.cabinetButton[4].status == false
      ) {
        alert("请点击下扉门合闸");
        return;
      } else if (
        node.name == currentNode.cabinetButton[1].name &&
        currentNode.cabinetButton[4].status == true &&
        currentNode.cabinetButton[0].status == true
      ) {
        currentNode.cabinetButton[1].status = true;
        alert("下扉门开启成功");
        controlFrontCabinet[currentNode.id - 1].openFrontGateSelf(true, false);

        //通过setInterval获取抬升值
        /*   if (controlFrontCabinet[currentNode.id - 1].upDistance) {
          let gateUp = setInterval(() => {
            gateOpenHeight.value =
              controlFrontCabinet[currentNode.id - 1].upDistance.toFixed(3);
            console.log(111);
            //达到最高值后，清除定时器
            if (gateOpenHeight.value >= 0.1) {
              clearInterval(gateUp);
              return;
            }
          }, 50);
        } */

        //通过侦听属性，最高后，抬升上扉门
        /* watch(gateOpenHeight, (newValue) => {
          console.log(newValue, "---newValue");
          if (newValue >= 0.1) {
            let cabinetBehindNode = model.getNode(currentNode.gateBehindName);
            let hoistBehindNode = model.getNode(currentNode.hoistBehindName);
            controlBehindCabinet[currentNode.id - 1] = new GateController(
              $viewer,
              cabinetBehindNode,
              hoistBehindNode
            );
            controlBehindCabinet[currentNode.id - 1].openFrontGateSelf(
              true,
              true
            );
          }
        }); */
      }

      //下闸门关闭逻辑判断
      if (node.name == currentNode.cabinetButton[2].name) {
        controlFrontCabinet[currentNode.id - 1].openFrontGateSelf(false, false);
      }

      //下扉门停止按钮逻辑判断
      if (node.name == currentNode.cabinetButton[3].name) {
        controlFrontCabinet[currentNode.id - 1].stopOpening();
      }
    }
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});

//上扉门最高，下扉门启动
// watch(upDistance, (newValue) => {
//   console.log(newValue, "---newValue");
// });

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