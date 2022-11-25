<template>
  <MainWrapperVue>
    <template #header>
      <el-row :gutter="20" align="middle" justify="start">
        <el-col :span="8">
          <span>搜索内容：</span>
          <el-input
            v-model="searchData.title"
            placeholder="输入标题内容"
          ></el-input>
        </el-col>
        <el-col :span="8">
          <span>审核状态：</span>
          <el-select v-model="searchData.status">
            <el-option label="全部" value=""> </el-option>
            <el-option label="提交待审核" :value="1"> </el-option>
            <el-option label="审核失败" :value="2"> </el-option>
            <el-option label="审核通过（待发布）" :value="8"> </el-option>
            <el-option label="已发布" :value="9"> </el-option>
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
            show-overflow-tooltip
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
          >
            <template #default="scope">{{ getType(scope.row.type) }}</template>
          </el-table-column>
          <el-table-column
            prop="labels"
            label="标签"
            align="center"
            min-width="8%"
            show-overflow-tooltip
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
              {{ getStatus(scope.row.status) }}
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
                  :disabled="scope.row.status != 1"
                  @click="toExamine(scope.row, 1)"
                  >通过</el-link
                >
                <el-link
                  href="javscript:;"
                  type="danger"
                  :underline="false"
                  :disabled="scope.row.status != 1"
                  @click="toExamine(scope.row, 0)"
                  >驳回</el-link
                >
              </div>
            </template>
          </el-table-column>
          <template #empty>
            <img src="/src/assets/img/empty/img_nodata@2x.26d7c6a.png" alt="" />
          </template>
        </el-table>
      </div>
    </template>
    <template #footer>
      <el-pagination
        v-if="total > 0"
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
import { ref, reactive, onBeforeMount, computed, watch } from "vue";
import { getArticles, examineArticle } from "/src/api/article.js";
import checkSuccess from "/src/utils/checkSuccess.js";
import formatTime from "/src/utils/formatTime.js";

let currentPage = ref(1);
let pageSize = ref(10);
let total = ref(0);

let tableData = ref([]);

let searchData = reactive({
  title: "",
  status: "",
});
watch(
  searchData,
  async () => {
    updateData();
  },
  {
    deep: true,
  }
);
// 更新数据
const updateData = async () => {
  const res = await getArticles({
    ...searchData,
    page: currentPage.value,
    size: pageSize.value,
  });
  tableData.value = res.data;
  total.value = res.total;
};
const getType = computed(() => {
  return (type) => {
    switch (type) {
      case "1":
        return "单图";
      case "3":
        return "三图";
      case "0":
      case "-1":
        return "无图";
    }
  };
});
const getStatus = computed(() => {
  return (status) => {
    switch (status) {
      case 1:
        return "提交（待审核）";
      case 2:
        return "审核失败";
      case 8:
        return "审核通过（待发布）";
      case 9:
        return "已发布";
    }
  };
});

const toExamine = async (item, operate) => {
  let status;
  if (operate == 1) {
    status = item.publishTime > Date.now() ? 8 : 9;
  } else {
    status = 2;
  }
  const res = await examineArticle({id:item.id, status});
  checkSuccess(res);
  updateData();
};
const handleSizeChange = (val) => {};
const handleCurrentChange = (val) => {};

onBeforeMount(async () => {
  const res = await getArticles({ page: 1, size: 10 });
  tableData.value = res.data;
  total.value = res.total;

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