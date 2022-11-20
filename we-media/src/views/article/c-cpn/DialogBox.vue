<template>
  <div id="dialog-box">
    <el-dialog v-model="showDialog" :show-close="false" ref="dialog">
      <div class="h-selector">
        <el-switch
          v-model="isLocall"
          :width="160"
          active-text="本地上传"
          inactive-text="素材库"
          active-color="rgb(243, 244, 247)"
          inactive-color="rgb(243, 244, 247)"
        >
        </el-switch>
      </div>
      <div v-show="!isLocall">
        <el-tabs
          tab-position="left"
          @tab-change="handleTabChange"
          v-model="isCollection"
        >
          <el-tab-pane label="全部" :name="0">
            <el-card
              shadow="always"
              v-for="(item, index) in materialAll"
              :key="item.id"
              class="collection"
              @click="selectMaterial(index)"
            >
              <img :src="item.url" alt="" class="collection" />
              <img
                ref="radioIcon"
                class="radioIcon"
                :src="getCardIcon(index)"
                alt=""
              />
            </el-card>
          </el-tab-pane>
          <el-tab-pane label="收藏" :name="1">
            <el-card
              shadow="always"
              v-for="(item, index) in materialCollecton"
              :key="item.id"
              class="collection" @click="selectMaterial(index)"
            >
              <img :src="item.url" alt="" class="collection" />
              <img
                ref="radioIcon"
                class="radioIcon"
                :src="getCardIcon(index)"
                alt=""
              />
            </el-card>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div v-show="isLocall">
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="string"
          :limit="1"
          :on-exceed="handleExceed"
          :before-upload="beforeUpload"
          :http-request="uploadMaterialFunc"
          :show-file-list="true"
          :auto-upload="false"
        >
          <el-icon class="avatar-uploader-icon"><i-ep-Plus /></el-icon>
          <template #tip>
            <div class="el-upload__tip text-red">
              支持扩展名：jpg、png，jpeg文件不得大于1MB
            </div>
          </template>
        </el-upload>
        <div style="text-align: center; margin-top: 20px">
          <el-button type="primary" @click="upload.submit()"
            ><el-icon><i-ep-Upload /></el-icon> 开始上传</el-button
          >
        </div>
      </div>
      <PageBox
        v-if="total > 0 && !isLocall"
        :total="total"
        @pageChange="handlePagenation"
      ></PageBox>
      <template #footer>
        <el-button @click="handleClose('cancel')">取 消</el-button>
        <el-button type="primary" @click="handleClose('submit')"
          >确 定</el-button
        >
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import PageBox from "/src/components/PageBox.vue";
import { materialList, uploadMetarial } from "/src/api/material.js";
const emit = defineEmits(["closeDialog", "submit"]);

const dialog = ref(); // 对话框ref对象
const upload = ref(); // 文件上传
const radioIcon = ref();

let showDialog = ref(true); // 对话框显示与隐藏
let isLocall = ref(false); // 素材(true)/本地(false)
let isCollection = ref(0); // 全部(0) / 收藏(1)
let materialAll = ref([]); // 全部素材列表
let materialCollecton = ref([]); // 收藏素材列表
let currSelected = ref(0); // 当前被选中的素材

let total = ref(0); // 页码total
let page = ref(1); // 当前页
let size = ref(10); // 当前size

// 处理全部、收藏Tab点击--->展示全部素材 / 收藏素材
const handleTabChange = async (val) => {
  console.log(val);
  if (val === "false") {
    // 全部
    const result = await materialList({
      page: page.value,
      size: size.value,
    });
    materialAll.value = result.data;
    total.value = result.total;
  } else {
    // 收藏
    const result = await materialList({
      isCollection: isCollection.value,
      page: page.value,
      size: size.value,
    });
    materialCollecton.value = result.data;
    total.value = result.total;
  }
};
// 限制上传图片格式及大小
const beforeUpload = (rawFile) => {
  if (
    rawFile.type !== "image/jpeg" &&
    rawFile.type !== "image/png" &&
    rawFile.type !== "image/jpg"
  ) {
    ElMessage.error("素材图片只支持JPG、JPEG、PNG格式!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("素材图片大小不能超过2MB!");
    return false;
  }
  return true;
};
// 超出1个文件则覆盖
const handleExceed = (files) => {
  upload.value.clearFiles();
  const file = files[0];
  file.uid = genFileId();
  upload.value.handleStart(file);
};
const uploadMaterialFunc = async(rawFile) => {
  const formData = new FormData();
  formData.append("material", rawFile.file);
  const result = await uploadMetarial(formData);
  toolTips(result, () => {
    updateMaterial({
      isCollection: isCollection.value,
      page: page.value,
      size: size.value,
    });
  });
};
const getCardIcon = (index) => {
  if (index != currSelected.value) {
    return "/src/assets/img/icons/unselect.png";
  }
  return "/src/assets/img/icons/selected.png";
};
const selectMaterial = (index) => {
  currSelected.value = index
};
// 页码变化
const handlePagenation = async (data) => {
  console.log(data);
  page.value = data.page;
  size.value = data.size;
  const result = await materialList({
    isCollection: isCollection.value,
    ...data,
  });
  if (isCollection.value === 0) {
    materialAll.value = result.data;
  } else {
    materialCollecton.value = result.data;
  }
};
// 取消，确定
const handleClose = (operate) => {
  if (operate === "cancel") {
    emit("closeDialog");
  } else {
    emit("submit");
  }
};

onBeforeMount(async () => {
  const result = await materialList({
    page: 1,
    size: 10,
  });
  materialAll.value = result.data;
  total.value = result.total;
});
</script>

<style lang="less" scoped>
#dialog-box {
  .h-selector {
    text-align: center;
    margin-bottom: 20px;
    height: 40px;
    :deep(.el-switch) {
      .el-switch__label {
        width: 70px;
      }
      .el-switch__core {
        .el-switch__action {
          width: 73px;
        }
      }
      &.is-checked .el-switch__action {
        left: 3px;
        margin-left: 80px;
      }
    }
  }

  .el-tab-pane {
    display: flex;
    justify-content: left;
    flex-wrap: wrap;
    margin-left: 40px;
    .el-card {
      width: 155px;
      height: 103px;
    }
  }
  :deep(.el-dialog) {
    width: 948px;
    .el-card {
      margin-top: 0;
      margin-bottom: 20px;
    }
    .el-pagination {
      margin-top: 30px;
    }
    .el-dialog__footer {
      padding: 0;
      border-top: 1px solid #eaeaea;
      text-align: center;
    }
  }
  .radioIcon {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 33px;
  }
}
</style>