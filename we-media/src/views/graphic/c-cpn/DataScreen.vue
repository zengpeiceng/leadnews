<template>
  <!-- 中间数据展示 -->
  <div id="dataScreen">
    <dl>
      <dt><img class="icon" :src="data.iconSrc" alt="" /></dt>
      <dd>
        <p class="number">{{ data.number }}</p>
        <p class="desc">{{ data.desc }}</p>
      </dd>
    </dl>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
let props = defineProps({
  data: {
    type: Object,
    required: false,
    default() {
      return {
        iconSrc: "/src/assets/img/home/avatar.png",
        number: "234",
        desc: "累计粉丝数量",
      };
    },
  },
});
</script>

<style lang="less" scoped>
#dataScreen {
  width: 220px;
  height: 116px;
  background-color: rgb(226, 246, 233);
  border-radius: 10px;
  dl {
    display: flex;
    align-items: center;
    height: 100%;
    dt {
      flex: 1;
      margin: 0 10px;
      height: 50px;
      line-height: 50px;
      border-radius: 50%;
      text-align: center;
      background: rgb(195, 232, 209);
      .icon {
        width: 50%;
        height: 50%;
      }
    }
    dd {
      flex: 3;
      color: rgb(59, 211, 150);
      font-size: 24px;
      font-weight: bold;
      .desc {
        margin-top: 10px;
        font-size: 12px;
        color: #58637d;
      }
    }
  }
}
</style>