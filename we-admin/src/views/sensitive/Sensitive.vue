<template>
  <MainWrapperVue>
    <template #header>
      <div class="server_add">
        <el-form :model="formone">
          <el-form-item label="敏感词：">
            <el-input v-model="formone.serveword" placeholder="请输入敏感词" />
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
        :title="titel + '敏感词'"
        width="440px"
        @close="handleClose"
      >
        <el-form :model="subformone" :rules="rules">
          <el-form-item label="敏感词：" prop="serveword" ref="formadd">
            <el-input
              maxlength="10"
              show-word-limit
              v-model="subformone.serveword"
              placeholder="请输入敏感词"
            />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">
              确定
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- 表格 -->
      <div class="c-t-wrapper">
        <el-table :data="tableData" style="width: 100%" highlight-current-row>
          <el-table-column type="index" label="序号" min-width="16%" />
          <el-table-column prop="word" label="敏感词" />
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
                @click="opendig('编辑', scope.row.id, scope.row.word)"
                >编辑</el-button
              >
              <el-button text type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </template>
    <template #footer></template>
  </MainWrapperVue>
</template>

<script setup>
import MainWrapperVue from "@/components/general/MainWrapper.vue";
import formatTime from "@/utils/formatTime.js";
import { reactive, ref } from "vue";

const formadd = ref(null);

// 敏感词搜索
let formone = reactive({
  serveword: "",
});
// 提交的敏感词
let subformone = reactive({
  serveword: "",
});

// 对话框显示
let dialogVisible = ref(false);

// 关闭对话框
const handleClose = () => {
  subformone.serveword = "";
};

// 打开对话框
const opendig = (tit, id, word) => {
  titel.value = tit;
  if (word) subformone.serveword = word;
  dialogVisible.value = true;
  formadd.value.clearValidate();
};

// 对话框标题
const titel = ref(null);

// 表单校验
const rules = reactive({
  serveword: [{ required: true, message: "请输入", trigger: "change" }],
});
// 数据
let tableData = reactive([
  {
    id: 123,
    word: "冰毒",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
  {
    id: 123,
    word: "血腥",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
  {
    id: 123,
    word: "冰毒",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
  {
    id: 123,
    word: "冰毒",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
  {
    id: 123,
    word: "冰毒",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
  {
    id: 123,
    word: "冰毒",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
  {
    id: 123,
    word: "冰毒",
    createdTime: "2022-11-04T00:35:48.000+0000",
  },
]);
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
:deep(.footer) {
  display: none;
}
</style>