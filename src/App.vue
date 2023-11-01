<template>
  <div id="app">
    <header>
      <i class="iconfont icon-diqiu"></i>
      <h3>Cesium Template for JavaScript</h3>
    </header>

    <PublicMenu class="app-slider"></PublicMenu>

    <router-link to="'/"></router-link>
    <router-link to="/test"></router-link>
    <router-view></router-view>
  </div>
</template>

<script setup>
import * as Cesium from "cesium";
import { onMounted } from "vue";
import OpenMap from "./components/OpenMap.vue";
import PublicMenuVue from "./components/PublicMenu.vue";
onMounted(() => {});
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
  // border: 1px solid lightcoral;
  box-shadow: 10px 5px 5px rgb(160, 159, 159);
  i {
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
