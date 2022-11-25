<template>
  <MainWrapperVue>
    <template #header>
      <el-form ref="ruleFormRef" :model="searchForm" class="filter">
        <!-- 搜索内容 -->
        <el-form-item label="搜索内容：" class="filter_content">
          <el-input v-model="searchForm.title" placeholder="请输入内容标题" />
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="发布状态：" class="filter_status">
          <el-select
            v-model="searchForm.enable"
            placeholder="全部"
            size="large"
          >
            <el-option value="" label="全部" />
            <el-option value="1" label="已上架" />
            <el-option value="0" label="已下架" />
          </el-select>
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item label="发布时间：" class="filter_data">
          <el-date-picker
            v-model="searchForm.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #center>
      <!-- 内容表格 -->
      <el-table
        :data="tableData"
        style="width: 98%"
        :border="false"
        class="tableconten"
        highlight-current-row
      >
        <el-table-column type="index" label="序号" min-width="5%" />
        <el-table-column prop="title" label="标题" min-width="18%" />
        <el-table-column prop="authorName" label="作者" min-width="8%" />
        <el-table-column prop="type" label="类型" min-width="8%">
          <template #default="scope">
            {{ getTypeMsg(scope.row.type) }}
          </template>
        </el-table-column>

        <el-table-column prop="labels" label="标签" min-width="8%" />
        <el-table-column prop="publishTime" label="发布时间" min-width="6%">
          <template #default="scope">
            {{ formatTime(scope.row.publishTime) }}
          </template>
        </el-table-column>
        <el-table-column prop="enable" label="状态" min-width="8%">
          <template #default="scope">
            {{ scope.row.enable ? "已上架" : "已下架" }}
          </template>
        </el-table-column>

        <el-table-column prop="" label="操作" min-width="16%">
          <template #default="scope">
            <el-button type="primary" text @click="skip(scope.row.id)">查看</el-button>
            <el-button
              type="success"
              text
              :disabled="scope.row.enable != 0"
              @click="changeEnableFunc(scope.row.id, 1)"
              >上架</el-button
            >
            <el-button
              type="danger"
              text
              :disabled="scope.row.enable != 1"
              @click="changeEnableFunc(scope.row.id, 0)"
              >下架</el-button
            >
          </template>
        </el-table-column>
        <template #empty>
          <img src="/src/assets/img/empty/img_nodata@2x.26d7c6a.png" alt="" />
        </template>
      </el-table>
    </template>
    <template #footer>
      <PageBoxVue :total="total" @pageChange="handlePageChange" />
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import PageBoxVue from "../../../components/page/PageBox.vue";
import formatTime from "../../../utils/formatTime";
import { reactive, ref, onBeforeMount, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { getArticles, changeEnable } from "/src/api/article.js";
import chekcSuccess from "/src/utils/checkSuccess.js";

// 搜索字段
const searchForm = reactive({
  title: "",
  enable: null,
  date: null,
});
// 文章跳转
const router = useRouter();
// 表格数据
let tableData = ref();
let currentPage = ref(1); // 当前页
let pageSize = ref(10); // 一页显示数据数量
let total = ref(0); // 数据总数

watch(searchForm, () => {
  getNewestArticles();
});
const getTypeMsg = computed(() => {
  return (type) => {
    switch(type) {
      case "1": return "单图文章";
      case "3": return "三图文章";
      case "0":
      case "1": return "无图文章"
    }
  }
})
// 更新数据
const getNewestArticles = async () => {
  const res = await getArticles({
    page: currentPage.value,
    size: pageSize.value,
    ...searchForm,
    status: 9,
  });
  tableData.value = res.data;
  total.value = res.total;
};
// 页码更新
const handlePageChange = ({ page, size }) => {
  currentPage.value = page;
  pageSize.value = size;
  getNewestArticles();
};
// 上架/下架
const changeEnableFunc = async (id, enable) => {
  const res = await changeEnable({ id, enable });
  chekcSuccess(res);
  getNewestArticles();
};
// 查看详情
const skip = (id) => {
  router.push({
    path: "/news-published/detail",
    query: {
      id
    }
  });
};
onBeforeMount(async () => {
  const res = await getArticles({ page: 1, size: 10, status: 9 });
  tableData.value = res.data;
  total.value = res.total;
});
</script>

<style lang="less" scoped>
:deep(.header) {
  padding-left: 30px;
  .filter {
    display: flex;
    height: 100%;
    .el-form-item {
      margin: 0 5px;
      align-items: center;
    }
    .el-form-item__content {
      .el-input {
        width: 180px;
        height: 36px;
        line-height: 36px;
      }
    }
    .filter_data {
      .el-date-editor {
        max-width: 300px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
}
:deep(.center) {
  .el-table {
    margin-left: 1%;
    .is-leaf {
      color: #000;
    }
    .el-table__cell {
      border: 0;
      text-align: center;
      .cell {
        padding: 0;
      }
    }
    .el-table__inner-wrapper::before {
      height: 0;
    }
    tbody {
      tr {
        position: relative;
      }
      tr:hover .el-table__cell:first-of-type {
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background-color: #3175fb;
          border-radius: 5px;
        }
      }
      .current-row .el-table__cell:first-of-type {
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 6px;
          height: 100%;
          background-color: #3175fb;
          border-radius: 5px;
        }
      }
    }
    .el-table__cell {
      height: 90px;
      .el-button:active {
        background-color: rgba(0, 0, 0, 0);
      }
      .el-button:hover {
        opacity: 0.6;
        background-color: rgba(0, 0, 0, 0);
      }
      .el-button:focus {
        background-color: rgba(0, 0, 0, 0);
      }
    }
  }
}
</style>