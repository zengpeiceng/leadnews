<template>
  <div class="left-nav"></div>
  <router-view></router-view>
</template>

<script setup>
import MainFrameVue from '../components/MainFrame.vue';
</script>

<style lang="less" scoped>
.left-nav {
  position: fixed;
  width: 200px;
  background-color: red;
}
</style>