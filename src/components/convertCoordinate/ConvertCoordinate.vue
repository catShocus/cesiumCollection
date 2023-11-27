<template>
  <div id="convert-coordinate">
    <div class="screen-position">
      <h3>屏幕坐标：</h3>
      <span>X:{{ screenPositions.x }}</span>
      <span>Y:{{ screenPositions.y }}</span>
    </div>
    <div class="cartesian-position">
      <h3>笛卡尔坐标：</h3>
      <span>Lon:{{ cartesian3.lon }}</span>
      <span>Lat:{{ cartesian3.lat }}</span>
      <span>Height:{{ cartesian3.height }}</span>
    </div>
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, inject, ref, reactive, onUnmounted } from "vue";
import ConvertCordinate from "../../utils/classConvertCoordinate";

let $viewer;
let handler;
let screenPositions = reactive({
  x: null,
  y: null,
});
let cartesian3 = reactive({
  lon: null,
  lat: null,
  height: null,
});
onMounted(() => {
  $viewer = inject("viewer");
  $viewer.camera.flyHome(1) 
  const convertCoordinate = new ConvertCordinate($viewer);
  //点击获取屏幕坐标
  handler = new Cesium.ScreenSpaceEventHandler($viewer.scene.canvas);
  handler.setInputAction(function (event) {
    screenPositions.x = event.position.x;
    screenPositions.y = event.position.y;

    let clickCartesian3 = convertCoordinate.screenToCartesian3(event.position);

    cartesian3.lon = clickCartesian3.x;
    cartesian3.lat = clickCartesian3.y;
    cartesian3.height = clickCartesian3.z;
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});
onUnmounted(() => {
  handler && handler.destroy();
});
</script>

<style scoped lang='scss'>
#convert-coordinate {
  position: absolute;
  top: 53px;
  left: 200px;
  width: 300px;
  padding-bottom: 5px;
  //   height: 200px;
  border: 5px solid rgb(143, 236, 210);
  border-radius: 10px;
  .screen-position {
    display: flex;
    flex-direction: column;
    gap: 5px;
    // align-items: center;
    padding: 5px;
    border-bottom: 3px solid rgb(0, 128, 255);
    color: rgb(77, 151, 151);
    h3 {
      color: lightblue;
    }
    span {
      color: white;
      border-radius: 5px;
      border: 2px solid rgb(77, 151, 151);
      width: 200px;
      height: 25px;
      overflow: hidden;
    }
  }
  .cartesian-position {
    display: flex;
    flex-direction: column;
    gap: 5px;
    // align-items: center;
    padding: 5px;
    border-bottom: 3px solid rgb(0, 128, 255);
    color: rgb(77, 151, 151);
  }
  h3 {
    color: lightblue;
  }
  span {
    color: rgb(234, 235, 229);
    border-radius: 5px;
    border: 2px solid rgb(77, 151, 151);
    width: 200px;
    height: 25px;
    overflow: hidden;
  }
}
</style>