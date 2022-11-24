<template>
  <div id="contentlist">
    <MainFrameVue>
      <template #header>
        <el-form-item label="文章状态：" style="padding-top: 30px">
          <el-radio-group v-model="searchData.status">
            <el-radio label="">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="9">审核通过</el-radio>
            <el-radio :label="2">审核失败</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-col>
          <el-form-item label="关键字：">
            <el-input
              placeholder="请输入关键字"
              v-model="searchData.keyword"
            ></el-input>
          </el-form-item>
          <el-form-item label="频道列表：">
            <el-select v-model="searchData.channelId">
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
              v-model="searchData.date"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            />
          </el-form-item>
        </el-col>
      </template>
      <template #main>
        <el-card
          v-for="(item, index) in contentlist"
          @mouseenter="showEditIcon($event, index)"
          @mouseleave="hiddenEditIcon($event, index)"
          :key="item.id"
        >
          <el-image :src="item.images[0]" alt="">
            <template #error>
              <img
                class="image-slot"
                src="/src/assets/img/error/pic_nopic.6de7db9.png"
              />
            </template>
          </el-image>
          <div class="edit" v-if="item.status != 9">
            <el-icon size="20" @click="editAritcle(item.id)">
              <i-ep-Edit />
            </el-icon>
            <el-icon size="20" @click="deleteAritcle(item.id)">
              <i-ep-Delete />
            </el-icon>
          </div>
          <div class="edit" v-else>
            <el-icon
              v-if="judgeStatus(item.status, item.enable) === '已下架'"
              @click="changeArticleStatus(item.id)"
            >
              <el-icon @click="changeArticleStatus(item.id)"
                ><i-ep-Upload
              /></el-icon>
            </el-icon>
            <el-icon v-else>
              <el-icon><i-ep-Download /></el-icon>
            </el-icon>
          </div>
          <div style="padding: 10px 16px 0 17px">
            <p class="title">{{ item.title }}</p>
            <div class="desc">
              <span class="time">{{ formatTime(item.publishTime) }}</span>
              <span
                v-if="item.reason && item.status != 2"
                :class="
                  item.reason == '已发表' ? 'reason publish' : 'reason audit'
                "
                >{{ item.reason }}</span
              >
              <span :class="getClassObj(item.status, item.enable)">{{
                getOtherMessage(item.status, item.enable)
              }}</span>
            </div>
          </div>
        </el-card>
      </template>
      <template #footer>
        <PageBox :total="total" @pageChange="handlePageChange" />
      </template>
    </MainFrameVue>
  </div>
</template>

<script setup>
import { ref, reactive, onBeforeMount, computed, watch } from "vue";
import { useRouter } from "vue-router";
import MainFrameVue from "/src/components/MainFrame.vue";
import PageBox from "/src/components/PageBox.vue";
import { getChannels } from "/src/api/channel.js";
import { getContentlist, deleteArticle } from "/src/api/article.js";
import toolTips from "/src/hook/toolTips.js";
import formatTime from "/src/hook/formatTime.js";

const router = useRouter();

const channels = ref(); // 频道列表
const contentlist = ref([]); // 文章列表

const total = ref(); // 总数
const pageSize = ref(10);
const currentPage = ref(1);

const searchData = reactive({
  status: "", // 文章状态
  keyword: "", // 关键字
  channelId: "", // 频道id
  date: [], //发布日期
});

watch(
  searchData,
  async (newValue) => {
    // 更新contentlist
    getContentlistFunc();
  },
  {
    deep: true,
  }
);

// 请求文章内容
const getContentlistFunc = async () => {
  const data = { ...searchData };
  // 日期处理
  if (searchData.date.length > 0) {
    data.beginPubDate = searchData.date[0];
    data.endPubDate = searchData.date[1];
  }
  delete data.date;
  // 没有值的不传过去。
  for (const key in data) {
    if (data[key] === "" || data[key] === undefined || data[key] === null) {
      delete data[key];
    }
  }
  const res = await getContentlist({
    ...data,
    size: pageSize.value,
    page: currentPage.value,
  });
  contentlist.value = res.data;
  total.value = res.total;
};
// 判断状态
const judgeStatus = (status, enable, resource) => {
  let className = "";
  let statusName = "";
  if (status == 0) {
    statusName = "草稿";
    className = "reason draft";
  } else if (status == 9) {
    if (enable == 1) {
      statusName = "已上架";
      className = "reason audit";
    } else {
      statusName = "已下架";
      className = "reason draft";
    }
  } else if (status == 1) {
    statusName = "待审核";
    className = "reason audit";
  } else {
    statusName = "审核未通过";
    className = "reason unaudit";
  }
  if (resource == 1) {
    return className;
  } else {
    return statusName;
  }
};
// 获取文章状态样式
const getClassObj = computed(() => {
  return (status, enable) => judgeStatus(status, enable, 1);
});
// 获取文章状态
const getOtherMessage = computed(() => {
  return (status, enable) => judgeStatus(status, enable, 0);
  /**
   * 已发布 已下架：  enable 0 status 9
   * 草稿：           enable 1 status 0
   * 已发布 已上架：   enable 1 status 9
   * 审核未通过：      enable 0 status 2
   * 待审核：          enable 1  status 1
   */
});
// 页码变化
const handlePageChange = async ({ page, size }) => {
  currentPage.value = page;
  pageSize.value = size;
  getContentlistFunc();
};

// showEditIcon
const showEditIcon = (e, i) => {
  const iconEls = document.querySelectorAll(".edit");
  iconEls[i].style.display = "block";
};
const hiddenEditIcon = (e, i) => {
  const iconEls = document.querySelectorAll(".edit");
  iconEls[i].style.display = "none";
};

const deleteAritcle = async (id) => {
  const res = await deleteArticle(id);
  toolTips(res, () => {
    getContentlistFunc();
  });
};
const editAritcle = (id) => {
  router.push(`/article?id=${id}`);
};

const changeArticleStatus = (id) => {
  
};

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
  total.value = res2.total;
});
</script>

<style lang="less" scoped>
#contentlist {
  :deep(.header) {
    height: 156px;
    .el-form-item {
      display: flex;
      height: 68px;
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
    padding: 0 0 40px 30px;
    display: flex;
    flex-wrap: wrap;
    .el-card {
      width: 230px;
      height: 240px;
      margin: 30px 30px 0 0;
      border-radius: 10px;
      .el-image,
      .image-slot {
        width: 100%;
        height: 155px;
      }
      .edit {
        position: absolute;
        display: none;
        cursor: pointer;
        top: 10px;
        right: 10px;
        .el-icon {
          background-color: #fff;
          margin: 0 5px;
          width: 40px;
          height: 40px;
          border-radius: 45%;
        }
      }
      .title {
        width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        color: #20232a;
        font-weight: 600;
      }
      .desc {
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
      }
      .reason {
        padding: 3px 7px;
        border-radius: 4px;
        font-size: 13px;
      }
      .publish {
        background: #ebf7f2;
        color: #3bd396;
      }
      .audit {
        color: #3175fb;
        background: #eef4ff;
      }
      .unaudit {
        color: #ff5c5c;
        background: #ffefef;
      }
      .draft {
        color: #58637d;
        background: #f0f3f9;
      }
    }
  }
}
</style>