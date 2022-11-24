<template>
  <MainWrapperVue>
    <template #header>
      <div>
        <router-link class="h-nav" to="/news/index">
          <el-icon :size="18"><i-ep-Back /></el-icon>
          <span style="padding: 0 5px">返回</span>
        </router-link>
        <h2>文章详情</h2>
      </div>
    </template>
    <template #center>
      <el-row :gutter="20" class="title">
        <el-col :span="8">标题</el-col>
        <el-col :span="8">作者</el-col>
        <el-col :span="8">更新时间</el-col>
      </el-row>
      <el-row>
        <el-col :span="8">{{ data.title }}</el-col>
        <el-col :span="8">{{ data.authorName }}</el-col>
        <el-col :span="8">{{ formatTime(data.publishTime) }}</el-col>
      </el-row>
      <div class="content">
        <div class="title">正文信息</div>
        <span v-html="data.content"></span>
      </div>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import { ref, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { getArticlesById } from "/src/api/article.js";
import formatTime from "/src/utils/formatTime.js";

const route = useRoute();
let data = ref({
  content: []
});

onBeforeMount(async () => {
  const id = route.query.id;
  const res = await getArticlesById(id);
  data.value = res.data
});
</script>

<style lang="less" scoped>
:deep(.header) {
  padding-left: 40px;
  line-height: 91px;
  div {
    display: flex;
    justify-content: space-between;
    align-content: center;
    width: 150px;
    .h-nav {
      font-size: 14px;
      cursor: pointer;
      color: #666;
      &:hover {
        color: rgb(0, 110, 255);
      }
      .el-icon {
        position: relative;
        top: 2px;
      }
    }
  }
}
:deep(.center) {
  padding: 40px 0 40px 40px;
  font-size: 14px;
  .title {
    color: #666;

    font-size: 15px;
    margin-bottom: 20px;
  }
  .content {
    margin: 20px 0;
    font-size: 14px;
    img {
      width: 200px;
      height: 200px;
    }
  }
}
:deep(.footer) {
  display: none;
}
</style>