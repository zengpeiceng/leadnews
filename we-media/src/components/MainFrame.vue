<template>
  <header class="header">
    <slot name="header"></slot>
  </header>
  <main class="main">
    <slot name="main"></slot>
  </main>
  <footer class="footer">
    <slot name="footer"></slot>
  </footer>
</template>

<script setup>

</script>

<style lang="less" scoped>
header {
  height: 90px;
  border-bottom: 1px solid #eaeaea;
  padding-left: 30px;
}
main {
  min-height: calc(100vh - 90px - 90px);
}
footer {
  height: 90px;
  border-top: 1px solid #eaeaea;
}
</style>