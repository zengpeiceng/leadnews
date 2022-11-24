<template>
  <div id="main-frame">
    <header class="header">
      <slot name="header"></slot>
    </header>
    <main class="center">
      <slot name="center"></slot>
    </main>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup>
</script>

<style lang="less" scoped>
#main-frame {
  min-height: 100%;
  .header {
    height: 90px;
    border-bottom: 1px solid #eaeaea;
  }
  .center {
    min-height: 325px;
  }
  footer {
    height: 90px;
    border-top: 1px solid #eaeaea;
  }
}
</style>