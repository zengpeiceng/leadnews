<template>
  <MainWrapperVue>
    <template #header>
      <el-row :gutter="24" align="middle" justify="center">
        <el-col :span="2">审核状态:</el-col>
        <el-col :span="22">
          <el-radio-group v-model="radioValue">
            <el-radio :label="-1">全部</el-radio>
            <el-radio :label="0">创建中</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核失败</el-radio>
            <el-radio :label="9">审核通过</el-radio>
          </el-radio-group>
        </el-col>
      </el-row>
    </template>
    <template #center>
      <div class="c-t-wrapper">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
            align="center"
            min-width="10%"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            align="center"
            min-width="20%"
          ></el-table-column>
          <el-table-column
            prop="idno"
            label="身份证号"
            align="center"
            min-width="20%"
          ></el-table-column>
          <el-table-column label="认证类型" align="center" min-width="15%"
            >实名认证</el-table-column
          >
          <el-table-column
            prop="status"
            label="状态"
            align="center"
            min-width="15%"
          >
            <template #default="scope">
              {{ getStatus(scope.row.status) }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            min-width="20%"
            class-name="operateCell"
          >
            <template #default="scope">
              <el-link href="javascript:;" @click="lookUp(scope.row)" type="primary" :underline="false"
                >查看</el-link
              >
              <el-link href="javascript:;" type="success" :underline="false" :disabled="true"
                >通过</el-link
              >
              <el-link href="javascript:;" type="danger" :underline="false" :disabled="true"
                >驳回</el-link
              >
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
        @current-change="handleCurrChange"
        @size-change="handleSizeChange"
      >
      </el-pagination>
    </template>
  </MainWrapperVue>
</template>

<script setup>
import { ref, onBeforeMount, computed, watch } from "vue";
import { useRouter } from "vue-router";
import MainWrapperVue from "@/components/general/MainWrapper.vue";
// 全部：-1, 创建中：0, 待审核：1, 审核失败：2, 审核通过：9
const radioValue = ref(-1);
const tableData = ref([]);
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

const router = useRouter()

// 侦听单选钮的变化来发送请求
watch(radioValue, () => {
  console.log(radioValue.value);
})

// 获取状态码对应的状态
const getStatus = computed(() => {
  return (status) => {
    switch (status) {
      case 0:
        return "创建中";
        break;
      case 1:
        return "待审核";
        break;
      case 2:
        return "审核失败";
        break;
      case 9:
        return "审核通过";
        break;
    }
  };
});

// 查看: 跳转到/auth/detail， 并通过query传递数据
const lookUp = (data) => {
  router.push({
    path: '/auth/detail',
    query: {
      ...data
    }
  })
}

const handleCurrChange = (val) => {
  console.log(val);
}

const handleSizeChange = (val) => {
  console.log(val);
}

onBeforeMount(() => {
  const data = {
    "host": null,
    "code": 200,
    "errorMessage": null,
    "data": [
        {
            "id": 3,
            "userId": 3,
            "name": "wangwu6666",
            "idno": "512335455602781276",
            "fontImage": "http://172.17.2.60:9000/leadnews/2021/07/09/font_image.jpg",
            "backImage": "http://172.17.2.60:9000/leadnews/2021/07/09/back_image.jpg",
            "holdImage": "http://172.17.2.60:9000/leadnews/2021/07/09/hold_image.jpg",
            "liveImage": "http://172.17.2.60:9000/leadnews/2021/07/09/live_image.jpg",
            "status": 9,
            "reason": "客观地讲，不论是从不同职业群体、不同岗位的就业稳定性和工作强度看，还是从个人身体状况、家庭需求和价",
            "createdTime": "2019-07-11T17:21:18.000+0000",
            "submitedTime": "2019-07-11T17:21:20.000+0000",
            "updatedTime": "2019-07-12T06:48:04.000+0000"
        },
        {
            "id": 5,
            "userId": 5,
            "name": "suwukong",
            "idno": "512335455602781279",
            "fontImage": "http://172.17.2.60:9000/leadnews/2021/07/09/font_image.jpg",
            "backImage": "http://172.17.2.60:9000/leadnews/2021/07/09/back_image.jpg",
            "holdImage": "http://172.17.2.60:9000/leadnews/2021/07/09/hold_image.jpg",
            "liveImage": "http://172.17.2.60:9000/leadnews/2021/07/09/live_image.jpg",
            "status": 9,
            "reason": "材料不全",
            "createdTime": "2020-08-01T11:10:31.000+0000",
            "submitedTime": "2020-08-01T11:10:34.000+0000",
            "updatedTime": "2020-08-01T11:10:36.000+0000"
        }
    ],
    "currentPage": 1,
    "size": 10,
    "total": 2
}
  tableData.value = data.data
  total.value = data.total
});
</script>

<style lang="less" scoped>
:deep(.header) {
  padding-left: 40px;
  .el-row {
    height: 100%;
  }
}
</style>