<template>
  <div id="g-detail">
    <MainFrameVue>
      <template #header>
        <el-page-header @back="toBack">
          <template #content>
            <h5>文章数据详情</h5>
          </template>
          <template #extra>
            <DateSelectorVue />
          </template>
        </el-page-header>
      </template>
      <template #main>
        <div class="datascreen" v-for="i in 4">
          <DataScreen />
        </div>
        <div class="chartPart">
          <div class="desc">
            <h3>阅读来源分析</h3>
            <h3>阅读完成度分析</h3>
          </div>
          <div class="chart_analysis">
            <div id="pie_origin" style="width: 300px; height: 400px"></div>
            <div id="pie_completion" style="width: 300px; height: 400px"></div>
          </div>
        </div>
      </template>
    </MainFrameVue>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import MainFrameVue from "/src/components/MainFrame.vue";
import DataScreen from "./DataScreen.vue";
import DateSelectorVue from "./DateSelector.vue";
import drawChart from "/src/utils/drawCharts";
import { useRouter } from "vue-router";

const router = useRouter();

const drawChartFnuc = () => {
  const leftContainer = document.getElementById("pie_origin");
  const rightContainer = document.getElementById("pie_completion");
  drawChart("pie", leftContainer);
  drawChart("pie", rightContainer);
};

const toBack = () => {
  router.back();
};
onMounted(() => {
  drawChartFnuc();
});
</script>

<style lang="less" scoped>
#g-detail {
  :deep(.header) {
    display: flex;
    align-items: center;
    .el-page-header {
      width: 100%;
    }
    .el-page-header__extra {
      display: flex;
      align-items: center;
    }
  }
  .datascreen {
    float: left;
    margin: 20px 0 0 20px;
  }
  .el-row {
    margin-left: 20px;
  }
  .chartPart {
    clear:left;
    margin-left: 20px;
    padding-top: 20px;
  }
  .desc {
    display: flex;
    justify-content: flex-start;
    margin: 30px 0;
    h3 {
      flex: 1;
      position: relative;
      padding-left: 20px;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 0;
        width: 5px;
        height: 20px;
        border-radius: 5px;
        background-color: #3175fb;
      }
    }
  }
  .chart_analysis {
    margin-right: 40px;
    display: flex;
    flex-wrap: nowrap;
    div {
      flex: 1;
    }
  }
}
</style>