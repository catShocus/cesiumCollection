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
        <el-menu-item-group title="Cesium入门">
          <el-menu-item
            v-for="item in routerArr"
            :key="item.id"
            :index="`1-${item.id}`"
            @click="toRouterPush(item.id)"
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
let routerArr = [
  {
    id: 1,
    routerName: "节点动画",
    routerPath: "/node",
  },
  {
    id: 2,
    routerName: "坐标转换",
    routerPath: "/coordinate",
  },
  {
    id: 3,
    routerName: "流线箭头",
    routerPath: "/arrow",
  },
  {
    id: 4,
    routerName: "加载Geojson",
    routerPath: "/geojson",
  },
  {
    id: 5,
    routerName: "自定义形状",
    routerPath: "/custom",
  },
  {
    id: 6,
    routerName: "polyline弧段线",
    routerPath: "/segmental",
  },
  {
    id: 7,
    routerName: "渐变纹理",
    routerPath: "/textcure",
  },
  {
    id: 8,
    routerName: "贴地线",
    routerPath: "/clamp",
  },
  {
    id: 9,
    routerName: "动态CZML",
    routerPath: "/dynamicCzml",
  },
  {
    id: 10,
    routerName: "控件加载",
    routerPath: "/loadControl",
  },
];
const router = useRouter();
const toRouterPush = (id) => {
  let clickName = routerArr.find((item) => {
    return item.id == id;
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
