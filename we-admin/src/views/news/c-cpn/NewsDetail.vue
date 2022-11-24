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
        <el-col :span="8">{{ formatTime(data.submitedTime) }}</el-col>
      </el-row>
      <div class="content">
        <div class="title">正文信息</div>
        <div v-for="item in JSON.parse(data.content)">
          <p v-if="item.type === 'text'" style="margin: 10px 0;">{{ item.value }}</p>
          <el-image v-else :src="item.value"></el-image>
        </div>
      </div>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import { ref, onBeforeMount } from "vue";
import formatTime from "/src/utils/formatTime.js";
let data = ref(null);
onBeforeMount(() => {
  data.value = {
    id: 6468,
    userId: 1102,
    title: "文章发布体验1",
    content:
      '[{"type":"text","value":"焊接速度加快v\\n"},{"type":"image","value":"http://heima-fastdfs.itheima.net/group1/M00/00/03/wKgCIWDoHVmAfA3NAATzoW3WmPA.02cf5e"}]',
    type: 1,
    channelId: 1,
    labels: "后即可",
    createdTime: "2022-11-05T07:32:31.000+0000",
    submitedTime: "2022-11-05T07:32:31.000+0000",
    status: 9,
    publishTime: "2022-11-05T07:32:27.000+0000",
    reason: "已发布",
    articleId: 1588802042283974700,
    images: "group1/M00/00/03/wKgCIWDoHVmAfA3NAATzoW3WmPA.02cf5e",
    enable: 1,
    authorName: "admin",
  };
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
  }
}
:deep(.footer) {
  display: none;
}
</style>