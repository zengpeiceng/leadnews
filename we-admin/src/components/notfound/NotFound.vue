<template>
  <div id="notFound">
    <h2>404</h2>
    <p>天呐，您访问的页面失踪啦！！！</p>
    <div style="padding: 20px 0;">
      <router-link to="/">返回首页</router-link>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
#notFound {
  width: 100%;
  text-align: center;
  h2 {
    padding-top: 50px;
    font-size: 100px;
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-weight: 700;
  }
  a {
    text-decoration: none;
    color: #409EFF;
  }
}
</style>