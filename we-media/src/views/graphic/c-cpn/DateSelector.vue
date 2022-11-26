<template>
  <el-form-item label="数据时间：">
    <el-date-picker
      v-model="date"
      type="daterange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
    ></el-date-picker>
  </el-form-item>
  <ul class="options">
    <li
      v-for="(item, index) in options"
      :key="item"
      :class="{ 'o-active': index === currOption, '': '' }"
      @click="changeCurrOption(index)"
    >
      <span>{{ item }}</span>
    </li>
  </ul>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
let date = ref();

let options = reactive(["今日", "本周", "近7天", "近30天"]);
let currOption = ref(1);
const changeCurrOption = (i) => {
  currOption.value = i;
};
</script>

<style lang="less" scoped>
.el-form-item {
  display: flex;
  align-items: center;
}
ul {
  list-style: none;
  display: flex;
  margin-left: 30px;
  padding: 0;
  background-color: #f3f4f7;
  li {
    margin: 5px;
    cursor: pointer;
    span {
      padding: 0 10px;
    }
  }
  .o-active {
    background-color: #fff;
    font-weight: bold;
    color: #000;
    border-radius: 4px;
    box-shadow: 0 1px 4px 0 rgb(0 0 0 / 6%);
  }
}
</style>