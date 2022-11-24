<template>
  <MainWrapperVue>
    <template #header>
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        label-width="120px"
        class="filter"
      >
        <!-- 搜索内容 -->
        <el-form-item label="搜索内容：" class="filter_content">
          <el-input v-model="ruleForm.search" placeholder="请输入内容标题" />
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="发布状态：" class="filter_status">
          <el-select v-model="ruleForm.status" placeholder="全部" size="large">
            <el-option value="无数据" />
          </el-select>
        </el-form-item>
        <!-- 发布时间 -->
        <el-form-item label="发布时间：" class="filter_data">
          <el-date-picker
            v-model="ruleForm.data"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-value="[new Date(), new Date()]"
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
        <el-table-column prop="title" label="标题" min-width="10%" />
        <el-table-column prop="author" label="作者" min-width="6%" />
        <el-table-column prop="type" label="类型" min-width="6%" />
        <el-table-column prop="lable" label="标签" min-width="6%" />
        <el-table-column prop="pubilecdata" label="发布时间" min-width="6%" />
        <el-table-column prop="status" label="状态" min-width="6%" />
        <el-table-column prop="" label="操作" min-width="16%">
          <template #default="scope">
            <el-button type="primary" text @click="skip(scope)">查看</el-button>
            <el-button type="success" text :disabled="true">上架</el-button>
            <el-button type="danger" text :disabled="false">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #footer>
      <el-pagination
        v-model:currentPage="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 40]"
        small="small"
        :disabled="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      />
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// 表单数据
const ruleForm = reactive({
  search: "",
  status: null,
  data: null,
});
// 文章跳转
const router = useRouter()
const skip = (scope) => {
  router.push({
    path: '/news-published/detail',
    query: {
      id: scope.row.index
    }
  })
}
// 表格数据
const tableData = reactive([
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
    kk: 1,
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
  {
    index: 0,
    title: "中国代表：严重关切美英等国近5年骇人听闻的贩卖人口问题",
    author: "admin",
    type: "单文图片",
    lable: "爬虫",
    pubilecdata: "2021-09-13",
    status: "已上架",
  },
]);
// 分页当前页数
let currentPage = ref(1)
// 显示数量
let pageSize = ref(10)
</script>

<style lang="less" scoped>
:deep(.header) {
  padding: 10px 20px;
  @media screen and (max-width: 1350px) {
    .el-form-item {
      flex-flow: column;
    }
  }
  .filter {
    display: flex;
    height: 100%;
    // align-items: center;
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