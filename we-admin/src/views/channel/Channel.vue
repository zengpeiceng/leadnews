<template>
  <MainWrapperVue>
    <template #header>
      <el-row type="flex" justify="space-between" :gutter="20">
        <el-col :span="16">
          <div class="form-el">
            <span>频道名称：</span>
            <el-input v-model="accountState.name"></el-input>
          </div>
          <div class="form-el">
            <span>账号状态：</span>
            <el-select v-model="accountState.status">
              <el-option
                v-for="item in options"
                :key="item.status"
                :label="item.name"
                :value="Number(item.status)"
              >
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="4">
          <el-button
            type="primary"
            @click="
              () => {
                title = '新增频道';
                showDialog = true;
                currtableData = null;
              }
            "
          >
            <el-icon><i-ep-CirclePlus /></el-icon>
            <span>新建</span>
          </el-button>
        </el-col>
      </el-row>
    </template>
    <template #center>
      <div class="c-t-wrapper" ref="tableWrapper">
        <el-table
          ref="tableRef"
          :data="tableData"
          style="width: 100%"
          highlight-current-row
        >
          <el-table-column
            type="index"
            label="序号"
            min-width="6%"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="name"
            label="频道名称"
            show-overflow-tooltip
            min-width="13%"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="description"
            label="描述"
            show-overflow-tooltip
            min-width="17%"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="isDefault"
            label="是否默认频道"
            min-width="13%"
            align="center"
            ><template #default="scope">
              {{ scope.row.isDefault ? "是" : "否" }}
            </template></el-table-column
          >
          <el-table-column
            prop="status"
            label="状态"
            min-width="8%"
            align="center"
            ><template #default="scope">
              {{ scope.row.status ? "启用" : "禁用" }}
            </template></el-table-column
          >
          <el-table-column
            prop="ord"
            label="排序"
            min-width="9%"
            align="center"
          ></el-table-column>
          <el-table-column
            prop="createdTime"
            label="创建时间"
            min-width="10%"
            align="center"
          >
            <template #default="scope">
              {{ formatTime(scope.row.createdTime) }}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            min-width="24%"
            align="center"
            class-name="operateCell"
          >
            <template #default="scope">
              <el-link
                type="primary"
                :underline="false"
                href="javascript:;"
                @click="opreteClick('编辑', scope.row)"
                >编辑</el-link
              >
              <el-link
                type="success"
                :underline="false"
                :disabled="scope.row.status === 1"
                href="javascript:;"
                @click="opreteClick('启用', scope.row)"
                >启用</el-link
              >
              <el-link
                type="warning"
                :underline="false"
                :disabled="scope.row.status === 0"
                href="javascript:;"
                @click="opreteClick('禁用', scope.row)"
                >禁用</el-link
              >
              <el-link
                type="warning"
                :underline="false"
                href="javascript:;"
                @click="opreteClick('删除', scope.row.id)"
                >删除</el-link
              >
            </template>
          </el-table-column>
          <template #empty>
            <div>
              <img
                src="/src/assets/img/empty/img_nodata@2x.26d7c6a.png"
                alt=""
              />
            </div>
          </template>
        </el-table>
      </div>
      <template v-if="showDialog">
        <AddChannel
          :title="title"
          :currtableData="currtableData"
          @handle-dialog-close="handleDialogClose"
        />
      </template>
    </template>
    <template #footer>
      <PageBoxVue :total="total" @pageChange="handlePageChange" />
    </template>
  </MainWrapperVue>
</template>

<script setup>
import { ref, onBeforeMount, computed } from "vue";
import formatTime from "@/utils/formatTime";
import checkSuccess from "@/utils/checkSuccess";
import {
  queryChannel,
  deleteChannelById,
  editeChannel,
} from "/src/api/channel.js";
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import AddChannel from "./c-cpn/AddChannel.vue";
import PageBoxVue from "../../components/page/PageBox.vue";

// --------------- data --------------------
// 当前选中的option
const accountState = ref({
  name: "",
  status: -1,
});
// 表格数据
let tableData = ref([]);
// 当前被选择的表格行数据
let currtableData = ref(null);
// 全部、启用、禁用
let options = ref([]);
// 当前页
const currentPage = ref(1);
const pageSize = ref(10);
// 总条数
let total = ref(0);
// 是否显示增加频道/编辑频道对话框
let showDialog = ref(false);
// 对话框标题
let title = ref("新增频道");

// ---------------侦听 ----------------------
watch(
  accountState,
  () => {
    queryChannelFunc({
      ...accountState.value,
      page: currentPage.value,
      size: pageSize.value,
    });
  },
  { deep: true }
);

// --------------- 请求方法 ------------------
const queryChannelFunc = async (data) => {
  if (data.status === -1) {
    delete data.status;
  }
  const result = await queryChannel(data);
  tableData.value = result?.data;
  total.value = result?.total;
};

// -------------- 事件 ------------------
// 根据频道名称请求
const opreteClick = async (operate, data) => {
  switch (operate) {
    case "编辑":
      title.value = "编辑频道";
      currtableData.value = data;
      showDialog.value = true;
      break;
    case "启用":
      const data1 = { ...data };
      data1.status = 1;
      const res1 = await editeChannel(data1);
      // 操作结果提示
      checkSuccess(res1);
      // 更新数据
      queryChannelFunc({ page: currentPage.value, size: pageSize.value });
      break;
    case "禁用":
      const data2 = { ...data };
      data2.status = 0;
      const res = await editeChannel(data2);
      // 操作结果提示
      checkSuccess(res);
      // 更新数据
      queryChannelFunc({ page: currentPage.value, size: pageSize.value });
      break;
    case "删除":
      const result = await deleteChannelById(data);
      if (result?.status === 200) {
        ElMessage({
          message: "操作成功!",
          type: "success",
        });
      }
      queryChannelFunc({
        ...accountState.value,
        page: currentPage.value,
        size: pageSize.value,
      });
      break;
  }
};
// 当前行变化
const handleCurrChange = (newRow) => {
  console.log(newRow);
};
// 页码变化 
const handlePageChange = async ({ page, size }) => {
  currentPage.value = page;
  pageSize.value = size;
  queryChannelFunc({page: currentPage.value, size: pageSize.value, ...accountState.value})
};
const handleDialogClose = () => {
  showDialog.value = false;
  queryChannelFunc({
    page: currentPage.value,
    size: pageSize.value,
 });
};
onBeforeMount(() => {
  // 请求数据
  options.value = [
    {
      status: -1,
      name: "全部",
    },
    {
      status: 1,
      name: "启用",
    },
    {
      status: 0,
      name: "禁用",
    },
  ];
  queryChannelFunc({ page: 1, size: 10 });
});
</script>

<style lang="less" scoped>
:deep(.header) {
  padding-left: 40px;
  .form-el {
    display: inline-block;
    width: 260px;
  }
  .el-input,
  .el-input__inner {
    width: 160px;
  }
  .el-row {
    height: 100%;
    align-items: center;
  }
}
</style>