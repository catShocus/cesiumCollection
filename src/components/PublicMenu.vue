<template>
  <div class="app-slider">
    <el-menu
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
    >
      <el-sub-menu index="1">
        <template #title>
          <el-icon><location /></el-icon>
          <span>功能模块</span>
        </template>
        <el-menu-item-group title="Cesium书籍">
          <el-menu-item index="1-1" @click="toNodeAnimation"
            >节点动画</el-menu-item
          >
          <el-menu-item index="1-2" @click="toConvertCoordinate"
            >坐标转换</el-menu-item
          >
          <el-menu-item index="1-3" @click="toDynamicArrow"
            >流线箭头</el-menu-item
          >
          <el-menu-item index="1-4" @click="toLoadGeojson"
            >加载Geojson</el-menu-item
          >
          <el-menu-item index="1-5" @click="toCustomGeometry"
            >自定义形状</el-menu-item
          >
          <el-menu-item index="1-6" @click="toPolylineSegmental"
            >polyline弧段线</el-menu-item
          >
          <el-menu-item index="1-7" @click="toGradualTextcure"
            >渐变纹理</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
//路由跳转
const router = useRouter();
const toNodeAnimation = () => {
  router.push({ path: "/node" });
};
const toConvertCoordinate = () => {
  router.push({ path: "/coordinate" });
};
const toDynamicArrow = () => {
  router.push({ path: "/arrow" });
};
const toLoadGeojson = () => {
  router.push({ path: "/geojson" });
};
const toCustomGeometry = () => {
  router.push({ path: "/custom" });
};
const toPolylineSegmental = () => {
  router.push({ path: "/segmental" });
};
const toGradualTextcure = () => {
  router.push({
    path: "/textcure",
  });
};
</script>

<style scoped lang="scss">
.el-menu {
  width: 200px;
  height: 100%;
  background: rgb(88, 125, 148);
}
</style>
