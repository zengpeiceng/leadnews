<template>
  <div id="graphic">
    <MainFrameVue>
      <template #header>
        <DateSelectorVue />
      </template>
      <template #main>
        <div class="datascreen" v-for="i in 4">
          <DataScreen />
        </div>
        <div class="c-t-wrapper">
          <el-table
            :data="tableData"
            style="width: 98%"
            highlight-current-row
            ref="singleTable"
          >
            <el-table-column
              prop="num"
              type="index"
              label="序号"
              min-width="10%"
              align="center"
            />
            <el-table-column
              prop="name"
              label="文章名称"
              align="left"
              min-width="30%"
              show-overflow-tooltip
            />
            <el-table-column
              prop="readeNum"
              label="阅读"
              align="center"
              min-width="10%"
            />
            <el-table-column
              prop="commentNum"
              label="评论量"
              align="center"
              min-width="10%"
            />
            <el-table-column
              prop="collectNum"
              label="收藏量"
              align="center"
              min-width="10%"
            />
            <el-table-column
              prop="forwardNum"
              label="转发量"
              align="center"
              min-width="10%"
            />
            <el-table-column label="操作" min-width="18%" align="center">
              <template #default="scope">
                <el-button
                  @click="showDetails(scope.row)"
                  type="primary"
                  :text="true"
                  size="small"
                  >详细分析</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </template>
      <template #footer>
        <PageBox :total="7" @pageChange="handlePageChange" />
      </template>
    </MainFrameVue>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import MainFrameVue from "/src/components/MainFrame.vue";
import DataScreen from "./DataScreen.vue";
import DateSelectorVue from "./DateSelector.vue";
import PageBox from "/src/components/PageBox.vue";

const router = useRouter();

let tableData = ref([]);
let singleTable = ref();

const handlePageChange = () => {};
const showDetails = (id) => {
  console.log(id);
  router.push(`/graphic/detail?id=${id}`);
};
onBeforeMount(() => {
  tableData.value = [
    {
      num: "1",
      name: "没想到，拼多多竟然想用AI种草莓给我吃",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
    {
      num: "2",
      name: "项目管理感悟",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
    {
      num: "3",
      name: "项目管理感悟",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
    {
      num: "4",
      name: "项目管理感悟",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
    {
      num: "3",
      name: "项目管理感悟",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
    {
      num: "3",
      name: "项目管理感悟",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
    {
      num: "3",
      name: "项目管理感悟",
      readeNum: 150,
      commentNum: 150,
      collectNum: 10,
      forwardNum: 150,
    },
  ];
});
</script>

<style lang="less" scoped>
#graphic {
  :deep(.header) {
    display: flex;
    align-items: center;
  }
  :deep(.main) {
    .datascreen {
      float: left;
      margin: 20px 0 0 20px;
    }
  }
}
</style>