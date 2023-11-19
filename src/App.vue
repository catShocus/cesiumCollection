<template>
  <div id="app">
    <header>
      <i class="iconfont icon-diqiu" @click="toHome"></i>
      <h3>Cesium Template for JavaScript</h3>
    </header>
    <!-- Cesium初始化组件 -->
    <OpenMap></OpenMap>
    <PublicMenu class="app-slider"></PublicMenu>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import OpenMap from "./components/OpenMap.vue";
import PublicMenuVue from "./components/PublicMenu.vue";

//路由跳转
const router = useRouter();
const toHome = () => {
  router.push({ path: "/" });
};
</script>

<style scoped lang="scss">
#app {
  display: flex;
  flex-direction: column;
}
header {
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 10px;
  padding: 5px;
  box-shadow: 10px 5px 5px rgb(160, 159, 159);
  i {
    cursor: pointer;
    color: lightblue;
    padding-top: 2px;
    font-size: 20px;
  }
  h3 {
    display: inline-block;
    color: rgb(106, 140, 204);
  }
}

.app-slider {
  position: absolute;
  top: 53px;
  bottom: 0;
}
</style>
