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
          <span class="returnon" v-if="data.status === 9">已上架</span>
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
          <span class="titles">更新时间</span>
          <span> {{formatTime(data.publishTime)}} </span>
        </div>
      </div>
      <div class="center_content">
        <span class="titles">正文信息</span>
        <div class="content">
          <p v-html="newconten"></p>
        </div>
      </div>
    </template>
    <template #footer> </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import { onMounted, onBeforeMount, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import formatTime from "/src/utils/formatTime.js";
const route = useRoute();
const router = useRouter();
const back = () => {
  router.back();
};
let data = ref(null);
data.value = {
    id: 6468,
    userId: 1102,
    title: "文章发布体验1",
    content:
      '[{\"type\":\"text\",\"value\":\"（观察者网讯）联合国人权理事会第47届会议正在召开中，在美国的唆使下，加拿大日前挑头发起新疆调查，中国代表当场与之展开激烈交锋并在后续连续出击。29日，中国代表团再次点名美英等国，就其严重现代奴役和贩卖人口现象表示严重关切。\"},{\"type\":\"text\",\"value\":\"据中国常驻联合国日内瓦办事处和瑞士其他国际组织代表团网站29日消息，中国代表团在人权理事会第47届会议与贩卖人口问题特别报告员互动对话时发言，全文如下：\"},{\"type\":\"text\",\"value\":\"主席女士：\"},{\"type\":\"text\",\"value\":\"贩卖人口严重侵犯人权，各国应严厉打击，并向受害者提供保护。中国对美国、英国等国存在严重现代奴役和贩卖人口现象表示严重关切。过去5年，每年被贩卖至美国从事强迫劳动的人口多达10万人，其中一半被贩卖到“血汗工厂”或遭受家庭奴役。据报道，2018年约有136,000人被贩卖到英国，不少被贩卖者包括妇女和儿童因交通工具条件恶劣等原因死亡。国际社会应关注美国、英国的贩卖人口问题，敦促其采取有效措施加以解决。\"},{\"type\":\"text\",\"value\":\"中方对特别报告员基于虚假信息和拙劣谎言，对中国无端指责表示坚决反对。希望特别报告员摒弃对中国偏见，以负责任的态度公正、客观履职。\"},{\"type\":\"text\",\"value\":\"谢谢主席女士。\"},{\"type\":\"text\",\"value\":\"中国常驻联合国日内瓦办事处和瑞士其他国际组织代表团网站截图\"},{\"type\":\"text\",\"value\":\"此前一天（6月28日），在与跨国公司和人权问题工作组对话时，中国常驻联合国日内瓦代表团蒋端公使就表示，中方坚决反对美国等以人权为借口，肆意抹黑中国企业，不择手段制裁打压，企图压制中国企业发展，维护美国科技垄断地位和不正当商业利益。\"},{\"type\":\"text\",\"value\":\"美国有关行径明显违反其自我标榜的公平竞争原则。美国自身强迫劳动现象严重。每年被贩卖至美国从事强迫劳动的人员多达10万人，其中一半被贩卖到血汗工厂，或遭受家庭奴役。强迫劳动在美国家政、农业、种植等20多个行业尤为突出。中方敦促人权理事会关注美国强迫劳动问题。\"}]',
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
  }
  let jsonp = JSON.parse(data.value.content)
  let newconten = ''
  jsonp.forEach(element => {
    if(element.type === 'text') newconten += `<p>${element.value}</p><br/>` 
  });
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