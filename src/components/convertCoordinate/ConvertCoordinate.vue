<template>
  <div id="convert-coordinate"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, inject } from "vue";

let $viewer;
onMounted(() => {
  $viewer = inject("viewer");

  //点击获取屏幕坐标
  var handler = new Cesium.ScreenSpaceEventHandler($viewer.scene.canvas);
  handler.setInputAction(function (event) {
    console.log(event.position, "---屏幕坐标");
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
});

/* 坐标转换 */

</script>

<style scoped lang='scss'>
</style>