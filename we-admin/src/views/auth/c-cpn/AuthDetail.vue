<template>
  <MainWrapperVue>
    <template #header>
      <div>
        <el-page-header @back="$router.back()">
          <template #content>
            <h4>实名认证</h4>
          </template>
          <template #extra>
            <span style="font-size: 14px;color: #888">状态：</span>
            <span class="h-right">审核通过</span>
          </template>
        </el-page-header>
      </div>
    </template>
    <template #center>
      <el-row :gutter="24" align="middle" justify="start">
        <el-col :span="1.5">姓名</el-col>
        <el-col :span="3"
          ><span>{{ data.name }}</span></el-col
        >
        <el-col :span="2"><span>身份证号</span></el-col>
        <el-col :span="2"
          ><span>{{ data.idno }}</span></el-col
        >
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-image :src="data.fontImage"></el-image>
        </el-col>
        <el-col :span="8">
          <el-image :src="data.backImage"></el-image>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-icon color="#3175fb"><i-ep-CaretTop /></el-icon>
          <span>身份证正面</span>
        </el-col>
        <el-col :span="8">
          <el-icon color="#3175fb"><i-ep-CaretTop /></el-icon>
          <span>身份证反面</span>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-image :src="data.holdImage"></el-image>
        </el-col>
        <el-col :span="8">
          <el-image :src="data.liveImage"></el-image>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-icon color="#3175fb"><i-ep-CaretTop /></el-icon>
          <span>手持身份证</span>
        </el-col>
        <el-col :span="8">
          <el-icon color="#3175fb"><i-ep-CaretTop /></el-icon>
          <span>人脸识别信息</span>
        </el-col>
      </el-row>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";

import MainWrapperVue from "@/components/general/MainWrapper.vue";
const data = ref(null);
const route = useRoute();
onBeforeMount(() => {
  data.value = route.query;
});
</script>

<style lang="less" scoped>
:deep(.header) {
  padding-left: 40px;
  padding-right: 20px;
  .h-right {
    padding: 5px 10px;
    font-size: 14px;
    color: #3bd396;
    background-color: #ebf7f2;
  }
}
:deep(.center) {
  padding: 20px 0 20px 40px;
  font-size: 14px;
  .el-image {
    width: 100%;
    min-height: 260px;
    margin: 15px 0;
  }
}
:deep(.footer) {
  display: none;
}
</style>