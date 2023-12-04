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
          <span>入门模块</span>
        </template>
        <el-menu-item-group title="Cesium入门">
          <el-menu-item
            v-for="item in routerPrimierArr"
            :key="item.id"
            :index="`1-${item.id}`"
            @click="toRouterPush({ id: item.id, type: item.type })"
            >{{ item.routerName }}</el-menu-item
          >
        </el-menu-item-group>
      </el-sub-menu>
      <el-sub-menu index="2">
        <template #title>
          <el-icon><location /></el-icon>
          <span>进阶模块</span>
        </template>
        <el-menu-item-group title="Cesium进阶">
          <el-menu-item
            v-for="item in routerIntermediateArr"
            :key="item.id"
            :index="`2-${item.id}`"
            @click="toRouterPush({ id: item.id, type: item.type })"
            >{{ item.routerName }}</el-menu-item
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
let routerPrimierArr = [
  {
    id: 1,
    type: "primier",
    routerName: "坐标转换",
    routerPath: "/coordinate",
  },
  {
    id: 2,
    type: "primier",
    routerName: "流线箭头",
    routerPath: "/arrow",
  },
  {
    id: 3,
    type: "primier",
    routerName: "加载Geojson",
    routerPath: "/geojson",
  },
  {
    id: 4,
    type: "primier",
    routerName: "自定义形状",
    routerPath: "/custom",
  },
  {
    id: 5,
    type: "primier",
    routerName: "polyline弧段线",
    routerPath: "/segmental",
  },
  {
    id: 6,
    type: "primier",
    routerName: "渐变纹理",
    routerPath: "/textcure",
  },
  {
    id: 7,
    type: "primier",
    routerName: "贴地线",
    routerPath: "/clamp",
  },
  {
    id: 8,
    type: "primier",
    routerName: "控件加载",
    routerPath: "/loadControl",
  },
  {
    id: 9,
    type: "primier",
    routerName: "纹理贴图",
    routerPath: "/primitiveTextcure",
  },
];
let routerIntermediateArr = [
  {
    id: 1,
    type: "intermediate",
    routerName: "节点动画",
    routerPath: "/node",
  },
  {
    id: 2,
    type: "intermediate",
    routerName: "动态CZML",
    routerPath: "/dynamicCzml",
  },
  {
    id: 3,
    type: "intermediate",
    routerName: "添加标签",
    routerPath: "/addLabel",
  },
];
const router = useRouter();
let currentArray;
const toRouterPush = (curentObject) => {
  if (curentObject.type === "primier") {
    currentArray = routerPrimierArr;
  } else {
    currentArray = routerIntermediateArr;
  }
  let clickName = currentArray.find((item) => {
    return item.id == curentObject.id;
  });
  router.push({
    path: `${clickName.routerPath}`,
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
