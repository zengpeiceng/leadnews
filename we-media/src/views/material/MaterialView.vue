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
          <span>已上传{{total}}张图片</span>
          <el-button type="primary" @click="dialogVisible = true">
            <el-icon><i-ep-Upload /></el-icon>
            上传图片
          </el-button>
          <el-dialog v-model="dialogVisible" width="70%" :show-close="false">
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
            <template #footer>
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogVisible = false"
                >确 定</el-button
              >
            </template>
          </el-dialog>
        </div>
      </div>
    </template>
    <template #main>
      <div class="center" v-show="!isCollection">
        <el-card shadow="always" v-for="item in materialAll">
          <img :src="item.url" class="all" />
          <div class="operate">
            <div
              style="cursor: pointer"
              @click="toCollect(item.id)"
              v-show="!item.isCollection"
            >
              <el-icon><i-ep-Star /></el-icon>
              <span>收藏</span>
            </div>
            <div
              style="cursor: pointer"
              @click="toCancelCollect(item.id)"
              v-show="item.isCollection"
            >
              <el-icon><i-ep-StarFilled /></el-icon>
              <span>已收藏</span>
            </div>
            <div style="cursor: pointer" @click="toDelete(item.id)">
              <el-icon><i-ep-Delete /></el-icon><span>删除</span>
            </div>
          </div>
        </el-card>
      </div>
      <div class="center" v-show="isCollection">
        <el-card shadow="always" v-for="item in materialCollecton">
          <img :src="item.url" class="collection" />
        </el-card>
      </div>
    </template>
    <template #footer>
      <PageBox v-if="total > 0" :total="total" @pageChange="handlePagenation"></PageBox>
    </template>
  </MainFrameVue>
</template>

<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { genFileId } from "element-plus";
import MainFrameVue from "@/components/MainFrame.vue";
import PageBox from "@/components/PageBox.vue";
import {
  materialList,
  collectMaterial,
  cancelCollect,
  deleteMaterial,
  uploadMetarial,
} from "@/api/material.js";
import toolTips from "@/hook/toolTips.js";
// 收藏(true) / 全部(false)
let isCollection = ref(false);

let total = ref(0);
let page = ref(1);
let size = ref(10);
let materialAll = ref([]);

let dialogVisible = ref(false);
let upload = ref();
let fileList = ref([]);
const materialCollecton = ref([]);

watch(isCollection, () => {
  updateMaterial({
    isCollection: isCollection.value,
    page: page.value,
    size: size.value,
  });
});

// 提交上传
const uploadMaterialFunc = async (rawFile) => {
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

// 更新素材
const updateMaterial = async (data) => {
  const result = await materialList({ ...data });
  if (data.isCollection) {
    materialCollecton.value = result.data;
  } else {
    materialAll.value = result.data;
  }
  total.value = result.total
};
// 收藏素材
const toCollect = async (id) => {
  const result = await collectMaterial(id);
  toolTips(result, () => {
    updateMaterial({
      isCollection: isCollection.value,
      page: page.value,
      size: size.value,
    });
  });
};
// 取消收藏素材
const toCancelCollect = async (id) => {
  const result = await cancelCollect(id);
  toolTips(result, () => {
    updateMaterial({
      isCollection: isCollection.value,
      page: page.value,
      size: size.value,
    });
  });
};
// 删除素材
const toDelete = async (id) => {
  const result = await deleteMaterial(id);
  toolTips(result, () => {
    updateMaterial({
      isCollection: isCollection.value,
      page: page.value,
      size: size.value,
    });
  });
};
// 页码变化
const handlePagenation = async (data) => {
  page.value = data.page;
  size.value = data.size;
  updateMaterial({ isCollection: isCollection.value, ...data });
};

onBeforeMount(async () => {
  const result = await materialList({ page: 1, size: 10 });
  materialAll.value = result.data;
  total.value = result.total
});
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
  .el-dialog__header {
    display: none;
  }
  :deep(.el-dialog__footer) {
    text-align: center;
    border-top: 1px solid #eaeeea;
    .el-button {
      margin: 10px 20px 0 0;
    }
  }
}
.center {
  padding-left: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: left;

  .el-card {
    width: 184px;
    height: 184px;
    border: none;
    margin: 30px 30px 0 0;
    :deep(.el-card__body) {
      padding: 0;
      width: 100%;
      height: 100%;
      .all {
        width: 100%;
        height: 124px;
      }
      .collection {
        width: 100%;
        height: 100%;
      }
    }
    .operate {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      height: 57px;
      span {
        padding: 0 10px;
      }
    }
  }
}
</style>