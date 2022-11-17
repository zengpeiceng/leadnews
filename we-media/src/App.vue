<template>
  <div id="app-wrapper">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
#app-wrapper {
  min-width: 100%;
  min-height: 100vh;
  background-image: url("@/assets/img/home/img_heima_bg@2x.393931b.png"),
    url("@/assets/img/home/img_bj_zuoxia@2x.6f2935e.png");
    background-size: 268px 182px,305px 229px;
    background-position: 0 0,107px 100%;
    background-attachment: fixed;
    background-repeat: no-repeat,no-repeat;
}
</style>