<template>
  <el-dialog
    v-model="showDialog"
    :title="prop.title"
    width="350px"
    :before-close="handleClose"
  >
    <el-form ref="ruleFormRef" :model="channelData" :rules="channelDataRule">
      <el-form-item label="频道名称：" prop="name">
        <el-input
          v-model="channelData.name"
          placeholder="请输入频道名称"
          maxlength="10"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="频道描述：" prop="description">
        <el-input
          v-model="channelData.description"
          placeholder="请输入频道描述"
          maxlength="16"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="是否启动：">
        <el-radio-group v-model="channelData.status">
          <el-radio :label="true">启动</el-radio>
          <el-radio :label="false">禁用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="排序方式：">
        <div class="ord">
          <el-button
            class="btn-l"
            @click="channelData.ord--"
            :disabled="channelData.ord <= 1"
            >-</el-button
          ><el-input
            v-model="channelData.ord"
            placeholder="请输入排序方式"
            @change="ordInputChange"
          ></el-input
          ><el-button class="btn-r" @click="channelData.ord++">+</el-button>
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size="small" @click="handleClose()">取消</el-button>
      <el-button type="primary" size="small" @click="submitForm(ruleFormRef)"
        >确定</el-button
      >
    </template>
  </el-dialog>
</template>

<script setup>
import { handleError, ref, onBeforeMount } from "vue";
import { editeChannel, addChannel } from "/src/api/channel.js";
import checkSuccess from "/src/utils/checkSuccess";
const prop = defineProps(["title", "currtableData"]);
const emit = defineEmits(["handleDialogClose"]);
// 对话框显示
let showDialog = ref(true);
// 绑定提交表单数据
const channelData = ref({
  name: "",
  description: "",
  status: true,
  ord: 1,
});
// 表单校验
const channelDataRule = ref({
  name: { required: true, message: "请输入", trigger: "blur" },
  description: { required: true, message: "请输入", trigger: "blur" },
});
// 表单ref
const ruleFormRef = ref();
// 提交表单行为
const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate(async (valid, fields) => {
    if (valid) {
      if (prop.title === "编辑频道") {
        const res = await editeChannel(channelData.value);
        // 操作结果提示
        checkSuccess(res);
      } else {
        const res = await addChannel(channelData.value);
        // 操作结果提示
        checkSuccess(res);
      }
      emit("handleDialogClose", channelData.value);
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 校验排序ord小于1都为1
const ordInputChange = () => {
  if (channelData.value.ord < 1) {
    channelData.value.ord = 1;
  }
};
// 关闭
const handleClose = () => {
  emit("handleDialogClose");
};
onBeforeMount(() => {
  if (prop.currtableData != null) {
    channelData.value = { ...prop.currtableData };
  }
});
</script>

<style lang="less" scoped>
:deep(.el-input__wrapper) {
  box-shadow: none;
  background-color: #f3f4f7;
  .is-focus {
    box-shadow: none;
  }
  .el-input__count-inner {
    background-color: #f3f4f7;
  }
}
:deep(.el-form-item.is-error .el-input__wrapper) {
  box-shadow: none;
}
.ord {
  display: flex;
  justify-content: center;
  :deep(.el-input__inner) {
    text-align: center;
  }
  :deep(.el-button) {
    background-color: #d8dde3;
    font-size: 20px;
    font-weight: 200;
  }
  .btn-l {
    border-radius: 3px 0 0 3px;
  }
  .btn-r {
    border-radius: 0 3px 3px 0;
  }
}
</style>
