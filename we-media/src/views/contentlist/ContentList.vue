<template>
  <div id="contentlist">
    <MainFrameVue>
      <template #header>
        <el-form-item label="文章状态：">
          <el-radio-group v-model="status">
            <el-radio label="">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="9">审核通过</el-radio>
            <el-radio :label="2">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-col>
          <el-form-item label="关键字：">
            <el-input placeholder="请输入关键字" v-model="keyword"></el-input>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select v-model="channelId">
              <el-option value="" label="全部">全部</el-option>
              <el-option
                v-for="item in channels"
                :key="item.id"
                :value="item.id"
                :label="item.name"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="发布日期：">
            <el-date-picker
              v-model="date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </template>
      <template #main> 
        <el-card v-for="item in contentlist">
          <img :src="item.images[0]" alt="">
          <p>{{item.title}}</p>
          <div>
            <span>{{item.publishTime}}</span>
          </div>
        </el-card>
      </template>
    </MainFrameVue>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import MainFrameVue from "/src/components/MainFrame.vue";
import { getChannels } from "/src/api/channel.js";
import { getContentlist } from "/src/api/content.js";
const channels = ref(); // 频道列表
const contentlist = ref([]); // 文章列表

const status = ref(""); // 文章状态
const keyword = ref(); // 关键字
const channelId = ref(""); // 频道id
const date = ref(); //发布日期

onBeforeMount(async () => {
  // 频道
  const res = await getChannels();
  channels.value = res.data;
  // 文章
  const res2 = await getContentlist({
    page: 1,
    size: 10,
  });
  contentlist.value = res2.data;
});
</script>

<style lang="less" scoped>
#contentlist {
  :deep(.header) {
    height: 136px;
    .el-form-item {
      display: flex;
      height: 58px;
      margin-right: 20px;
      align-items: center;
      .el-form-item__label {
        font-weight: normal;
        font-size: 14px;
        color: #000;
        padding-right: 10px;
      }
    }
    .el-col {
      display: flex;
    }
    .el-input {
      width: 176px;
    }
    .el-date-editor {
      width: 220px;
    }
  }
  :deep(.main) {
    .el-card {
      img {
        width: 231px;
        height: 155px;
      }
    }
  }
}
</style>