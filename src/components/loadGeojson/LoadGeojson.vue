<template>
  <div id="load-geojson"></div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted, inject, onUnmounted } from "vue";
import LoadData from "../../utils/loadDatas";
import ImageLineMaterial from "../dynamicArrow/utils/ImageLineMaterial";
import arrowImg from "../dynamicArrow/assest/3365a3fd0f23d571fce6672f010c970.png";
import axios from "axios";
let $viewer;

//加载geojson
onMounted(async () => {
  $viewer = inject("viewer");
  const { data } = await axios.get(
    "/src/components/loadGeojson/assest/南京市.geojson"
  );
  const polyline = $viewer.entities.add({
    polyline: {
      positions: Cesium.Cartesian3.fromDegreesArray(
        data.features[0].geometry.coordinates[0].flat(2)
      ),
      material: new ImageLineMaterial({
        image: arrowImg,
      }),
      width: 10,
    },
  });
  $viewer.zoomTo(polyline);
});

onUnmounted(() => {
  $viewer.entities.removeAll();
  // $viewer.camera.flyHome(1);
});
</script>
<style scoped lang='scss'>
</style>
