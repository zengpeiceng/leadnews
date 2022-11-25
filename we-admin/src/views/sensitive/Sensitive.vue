<template>
  <MainWrapperVue>
    <template #header>
      <div class="server_add">
        <el-form :model="formone">
          <el-form-item label="敏感词：">
            <el-input v-model="formone.name" placeholder="请输入敏感词" />
          </el-form-item>
        </el-form>
        <el-button type="primary" class="addword" @click="opendig('新增')">
          <el-icon><i-ep-CirclePlus /></el-icon>
          <span>新建</span>
        </el-button>
      </div>
    </template>
    <template #center>
      <!-- 对话框 -->
      <el-dialog
        class="dialog"
        v-model="dialogVisible"
        :title="title + '敏感词'"
        width="440px"
        @close="handleClose"
      >
        <el-form :model="subformone" :rules="rules">
          <el-form-item label="敏感词：" prop="name" ref="formadd">
            <el-input
              maxlength="10"
              show-word-limit
              v-model="subformone.name"
              placeholder="请输入敏感词"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="submit"> 确定 </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 表格 -->
      <div class="c-t-wrapper">
        <el-table :data="tableData" style="width: 100%" highlight-current-row>
          <el-table-column type="index" label="序号" min-width="16%" />
          <el-table-column prop="name" label="敏感词" />
          <el-table-column prop="createdTime" label="创建时间">
            <template #default="scope">
              <span>{{ formatTime(scope.row.createdTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button
                text
                type="primary"
                @click="opendig('编辑', scope.row.id, scope.row.name)"
                >编辑</el-button
              >
              <el-button text type="danger" @click="delSensitive(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
          <template #empty>
            <img src="/src/assets/img/empty/img_nodata@2x.26d7c6a.png" alt="" />
          </template>
        </el-table>
      </div>
    </template>
    <template #footer>
      <PageBox :total="total" @pageChange="handlePageChange" />
    </template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "/src/components/general/MainWrapper.vue";
import formatTime from "/src/utils/formatTime.js";
import PageBox from "../../components/page/PageBox.vue";
import { reactive, ref, onBeforeMount } from "vue";
import { getSensitives, updateSensitive, addSensitive, deleteSensitive } from "/src/api/sensitive.js";
import checkSuccess from "/src/utils/checkSuccess.js";

const formadd = ref(null);
const title = ref();
// 敏感词搜索
let formone = reactive({
  name: "",
});
// 提交的敏感词
let subformone = reactive({
  id: "",
  name: "",
});
// 对话框显示
let dialogVisible = ref(false);
watch(
  formone,
  () => {
    getNewest();
  },
  {
    deep: true,
  }
);
// 关闭对话框
const handleClose = () => {
  subformone.name = "";
  subformone.id = "";
};

// 打开对话框
const opendig = (tit, id, name) => {
  title.value = tit;
  if (name) subformone.name = name;
  if (id) subformone.id = id;
  dialogVisible.value = true;
  formadd.value?.clearValidate();
};
// 表单校验
const rules = reactive({
  name: [{ required: true, message: "请输入", trigger: "change" }],
});
// 数据
let tableData = ref();
let total = ref();
let pageSize = ref(10);
let currentPage = ref(1);

const submit = async () => {
  const { id, name } = subformone;
  let res;
  if (id) {
    res = await updateSensitive({ id, name });
  } else {
    res = await addSensitive({ name });
  }
  dialogVisible.value = false;
  checkSuccess(res);
  getNewest();
};
const delSensitive = async (id) => {
  const res = await deleteSensitive(id);
  checkSuccess(res);
  getNewest();
}
const getNewest = async () => {
  const res = await getSensitives({
    page: currentPage.value,
    size: pageSize.value,
    ...formone,
  });
  tableData.value = res.data;
  total.value = res.total;
};
const handlePageChange = ({ page, size }) => {
  currentPage.value = page;
  pageSize.value = size;
  getNewest();
};
onBeforeMount(async () => {
  const res = await getSensitives({ page: 1, size: 10 });
  tableData.value = res.data;
  total.value = res.total;
});
</script>

<style lang="scss" scoped>
:deep(.header) {
  height: 100%;
  .server_add {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .el-form {
      width: 300px;
      .el-form-item {
        margin: 0 0 0 20px;
      }
    }
    .addword {
      margin: 0px 60px 0px 0;
      background-color: #3175fb;
      .el-icon {
        color: #fff;
      }
    }
  }
}
:deep(.center) {
  .dialog {
    padding: 20px;
    border-radius: 6px;
    .el-form-item {
      height: 40px;
      margin: 0;
      .el-form-item__label {
        height: 100%;
        line-height: 40px;
      }
      .el-input__inner {
        height: 40px;
      }
    }
  }
  .c-t-wrapper {
    padding: 40px 15px 20px 15px;
    .cell {
      text-align: center;
    }
    .el-table__row {
      height: 60px;
    }
  }
}
</style>