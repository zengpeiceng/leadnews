<template>
  <MainWrapperVue>
    <template #header>
      <div class="header_title">
        <div class="return" @click="back()">
          <el-icon :size="18"><i-ep-Back /></el-icon>
          <span>返回</span>
        </div>
        <div class="title">文章详情</div>
        <div class="header_status">
          <span>状态：</span>
          <span class="returnon" v-if="data.enable == 1">已上架</span>
          <span class="returnout" v-else>已下架</span>
        </div>
      </div>
    </template>
    <template #center>
      <div class="center_header">
        <div class="header_title">
          <span class="titles">文章标题</span>
          <span> {{data.title}} </span>
        </div>
        <div class="header_zuthor">
          <span class="titles">作者</span>
          <span> {{data.authorName}} </span>
        </div>
        <div class="header_updata">
          <span class="titles">发布时间</span>
          <span> {{formatTime(data.publishTime)}} </span>
        </div>
      </div>
      <div class="center_content">
        <span class="titles">正文信息</span>
        <div class="content">
          <p v-html="data.content"></p>
        </div>
      </div>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import { onBeforeMount, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import formatTime from "/src/utils/formatTime.js";
import { getArticlesById } from "../../../api/article";
import PageBox from "../../../components/page/PageBox.vue";
const route = useRoute();
const router = useRouter();
const back = () => {
  router.back();
};
let data = ref({});
onBeforeMount(async () => {
  const id = route.query.id;
  const res = await getArticlesById(id)
  data.value = res.data;
})
</script>

<style lang="less" scoped>
.titles {
  color: #58637d;
  font-size: 14px;
}
:deep(.header) {
  .header_title {
    height: 91px;
    display: flex;
    align-items: center;
    .return {
      margin-left: 30px;
      display: flex;
      align-items: center;
      &:hover span,
      &:hover i {
        color: #3a9bfb;
      }
      span {
        display: inline-block;
        margin-left: 5px;
        font-size: 14px;
        font-weight: 500;
      }
      span,
      i {
        cursor: pointer;
      }
    }
    .title {
      position: relative;
      font-size: 18px;
      font-weight: 600;
      padding-left: 20px;
      margin-left: 20px;
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        width: 2px;
        height: 18px;
        transform: translateY(-50%);
        background-color: #bbb;
      }
    }
    .header_status {
      flex: 1;
      text-align: right;
      padding-right: 20px;
      span {
        color: #58637d;
        font-size: 14px;
      }
      .returnon,
      .returnout {
        border-radius: 2px;
        padding: 3px 8px;
        width: 58px;
        height: 22px;
      }
      .returnon {
        background-color: #3a9bfb;
        color: #fff;
      }
      .returnout {
        background-color: #ffefef;
        color: #ff5c5c;
      }
    }
  }
}
:deep(.center) {
  padding: 10px 20px;
  .center_header {
    display: flex;
    & > div {
      width: 250px;
      display: flex;
      flex-flow: column;
      margin-left: 10px;
      & > span:last-of-type {
        font-size: 14px;
        margin-top: 10px;
        padding-right: 10px;
      }
    }
  }
  .center_content {
    margin-left: 10px;
    margin-top: 60px;
    display: flex;
    flex-flow: column;
    & > div {
      font-size: 14px;
      margin-top: 10px;
      padding-right: 10px;
      p {
        text-indent: 2em;
      }
    }
  }
}
:deep(.footer) {
  display: none;
}
</style>