<template>
  <MainWrapperVue>
    <template #header>
      <el-row :gutter="20" align="middle" justify="start">
        <el-col :span="8">
          <span>搜索内容：</span>
          <el-input v-model="content" placeholder="输入标题内容"></el-input>
        </el-col>
        <el-col :span="8">
          <span>审核状态：</span>
          <el-select v-model="status">
            <el-option v-for="item in options"> </el-option>
          </el-select>
        </el-col>
      </el-row>
    </template>
    <template #center>
      <div class="c-t-wrapper">
        <el-table :data="tableData" style="width: 100%" highlight-current-row>
          <el-table-column
            type="index"
            label="序号"
            align="center"
            min-width="9%"
          ></el-table-column>
          <el-table-column
            prop="title"
            label="标题"
            min-width="20%"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="authorName"
            label="作者"
            align="center"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            prop="type"
            label="类型"
            align="center"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            prop="labels"
            label="标签"
            align="center"
            min-width="8%"
          ></el-table-column>
          <el-table-column
            prop="createdTime"
            label="发布时间"
            align="center"
            min-width="11%"
          >
            <template #default="scope">
              {{ formatTime(scope.row.createdTime) }}
            </template>
          </el-table-column>
          <el-table-column
            prop="reason"
            label="状态"
            min-width="14%"
            align="center"
          >
            <template #default="scope">
              {{ scope.row.reason || "提交（待审核）" }}
            </template>
          </el-table-column>
          <el-table-column label="操作" min-width="20%" align="center">
            <template #default="scope">
              <div style="display: flex; justify-content: space-evenly">
                <el-link
                  :href="`/news/detail?id=${scope.row.id}`"
                  type="primary"
                  :underline="false"
                  >查看</el-link
                >
                <el-link
                  href="javscript:;"
                  type="success"
                  :underline="false"
                  disabled
                  >通过</el-link
                >
                <el-link
                  href="javscript:;"
                  type="danger"
                  :underline="false"
                  disabled
                  >驳回</el-link
                >
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template #footer>
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        :page-sizes="[10, 20, 30, 40]"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import { ref, onBeforeMount } from "vue";
import { getArticles } from "/src/api/article.js";
import formatTime from "/src/utils/formatTime.js";
let content = ref();
let status = ref();
let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);
const options = ref([]);
let tableData = ref([]);
const handleSizeChange = (val) => {};
const handleCurrentChange = (val) => {};
onBeforeMount(async () => {
  const res = await getArticles({ page: 1, size: 10 });
  console.log(res);
  // tableData.value = [
  // ];
  // total.value = 10;

  currentPage.value = 1;
});
</script>

<style lang="less" scoped>
:deep(header) {
  padding-left: 40px;
  .el-row {
    height: 100%;
  }
  .el-input,
  .el-input__wrapper {
    width: 200px;
  }
}
</style>