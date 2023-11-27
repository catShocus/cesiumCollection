<template>
  <div id="dynamic-arrow"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, inject, onUnmounted } from "vue";
import ImageLineMaterial from "./utils/ImageLineMaterial.js";
import arrowImg from "./assest/3365a3fd0f23d571fce6672f010c970.png";
let $viewer;
onMounted(() => {
  $viewer = inject("viewer");
  let model = $viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArrayHeights([
        104.57311103029339, 30.71454550939871, 0, 104.57369073762032,
        30.71350155773247, 0, 104.57414650599235, 30.7135714014856, 0,
        104.5740256006362, 30.714837602541927, 0, 104.57483833991859,
        30.72413178951584, 0,
      ]),
      material: new ImageLineMaterial({
        image: arrowImg,
      }), //使用我们自定义的材质
      width: 10,
    },
  });
  $viewer.zoomTo(model);
});

//组件解绑
onUnmounted(() => {
  $viewer.entities.removeAll();
  // $viewer.camera.flyHome(1);
});
</script>
<style scoped lang='scss'>
</style>
