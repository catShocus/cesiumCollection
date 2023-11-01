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
        <el-menu-item-group title="Group One">
          <el-menu-item index="1-1">节点动画</el-menu-item>
        </el-menu-item-group>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<script setup>
</script>

<style scoped lang="scss">
.el-menu {
  width: 200px;
  height: 100%;
  background: rgb(88, 125, 148);
}
</style>
