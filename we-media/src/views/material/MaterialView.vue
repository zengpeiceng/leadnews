<template>
  <MainFrameVue>
    <template #header>
      <div class="header">
        <el-switch
          v-model="isCollection"
          active-color="rgb(243, 244, 247)"
          inactive-color="rgb(243, 244, 247)"
          width="138"
          active-text="收藏"
          inactive-text="全部"
        />
        <div>
          <span>已上传89张图片</span>
          <el-button type="primary">
            <el-icon><i-ep-Upload /></el-icon>
            上传图片
          </el-button>
        </div>
      </div>
    </template>
    <template #main>
      <div class="center">
        <el-card>
          <img src="" class="image" />
          <div>
            <span>Yummy hamburger</span>
            <div class="bottom"></div>
          </div>
        </el-card>
      </div>
    </template>
    <template #footer>
      <PageBox :total="20" @pageChange="handlePagenation"></PageBox>
    </template>
  </MainFrameVue>
</template>

<script setup>
import { ref, reactive, onBeforeMount } from "vue";
import MainFrameVue from "@/components/MainFrame.vue";
import PageBox from "@/components/PageBox.vue";
// 收藏(true) / 全部(false)
const isCollection = ref(false);

const total = ref(0);

const materials = reactive([]);

const handlePagenation = (data) => {
  console.log(data);
}

onBeforeMount(() => {});
</script>

<style lang="less" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 40px;
  height: 100%;
  span {
    color: #666;
    padding: 0 10px;
    font-size: 14px;
  }
  :deep(.el-switch) {
    .is-active span {
      color: #000;
      font-weight: 600;
    }
    .el-switch__core {
      height: 40px;
      border-radius: 4px;
      .el-switch__action {
        height: 32px;
        border-radius: 4px;
        width: 63px;
        left: 2px;
        top: 3px;
      }
    }
    .el-switch__label {
      transition: 0.2s;
      display: inline-block;
      position: absolute;
      text-align: center;
      width: 63px;
      height: 32px;
      line-height: 32px;
      color: #444;
      z-index: 9;
    }
    .el-switch__label--left {
      left: 3px;
    }
    .el-switch__label--right {
      right: 3px;
    }
  }
  :deep(.is-checked) {
    .el-switch__action {
      margin-left: 68px;
    }
  }
}
.center {
  padding-left: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;
}
</style>