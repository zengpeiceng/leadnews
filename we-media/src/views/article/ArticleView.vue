<template>
  <div id="article-view">
    <MainFrameVue>
      <template #main>
        <el-form :model="formData" :rules="rules" ref="articleForm">
          <el-form-item prop="title" class="title">
            <el-input
              v-model="formData.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div id="wangEditor" style="border: 1px solid #ccc">
              <Toolbar
                style="border-bottom: 1px solid #ccc"
                :editor="editor"
                :defaultConfig="toolbarConfig"
              />
              <Editor
                style="height: 350px; overflow-y: hidden"
                v-model="formData.content"
                :defaultConfig="editorConfig"
                mode="default"
                @onCreated="onCreated"
              />
            </div>
          </el-form-item>
          <!-- 标签、频道、日期 -->
          <el-form-item>
            <el-row :gutter="20" justify="start">
              <el-col :span="6">
                <el-form-item label="标签：" prop="labels">
                  <el-input
                    v-model="formData.labels"
                    placeholder="请输入标签"
                    maxlength="20"
                    show-word-limit
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="频道：" prop="channelId">
                  <el-select
                    v-model="formData.channelId"
                    placeholder="请选择频道"
                  >
                    <el-option
                      v-for="item in channels"
                      :key="item?.id"
                      :label="item?.name"
                      :value="item?.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="定时：" prop="publishTime">
                  <el-date-picker
                    type="datetime"
                    placeholder="请选择日期"
                    v-model="formData.publishTime"
                    :disabled-date="disabledDate"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form-item>
          <!-- 单图、三图、无图、自动 -->
          <el-form-item label="封面：" prop="images">
            <el-radio-group v-model="formData.type">
              <el-radio label="1" name="type">单图</el-radio>
              <el-radio label="3" name="type">三图</el-radio>
              <el-radio label="0" name="type">无图</el-radio>
              <el-radio label="-1" name="type">自动</el-radio>
            </el-radio-group>
            <!-- 封面 -->
            <div class="coverList">
              <template v-if="formData.type != '-1' && formData.type != '0'">
                <div
                  v-for="i in Number(formData.type)"
                  :key="i"
                  class="coverItem"
                  @click="selectCover(i)"
                >
                  <el-image :src="formData.images[i - 1]" alt="">
                    <template #error>
                      <div class="image-slot">
                        <svg
                          class="icon"
                          viewBox="0 0 1024 1024"
                          width="32"
                          height="32"
                        >
                          <path
                            d="M853.344 341.344C853.344 294.4 814.944 256 768 256s-85.344 38.4-85.344 85.344 38.4 85.344 85.344 85.344 85.344-38.4 85.344-85.344z"
                            fill="#707070"
                          ></path>
                          <path
                            d="M0 85.344v853.344h512v-85.344H85.344V742.4l256-256L512 657.056l59.744-59.744-230.4-230.4-256 256V170.656h853.344v298.656l85.344 85.344V85.312z"
                            fill="#707070"
                          ></path>
                          <path
                            d="M951.456 840.544L1011.2 780.8l-200.544-200.544-200.544 200.544 59.744 59.744L768 742.4v238.944h85.344V742.4z"
                            fill="#707070"
                          ></path>
                        </svg>
                        <p>上传图片</p>
                      </div>
                    </template>
                  </el-image>
                </div>
              </template>
            </div>
            <div v-if="showDialog">
              <dialog-box
                @closeDialog="showDialog = false"
                @submit="setimages"
              />
            </div>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <el-button @click="submitForm(0, articleForm)">
          <i style="padding-right: 5px">
            <svg class="icon" viewBox="0 0 1024 1024" width="14" height="14">
              <path
                d="M700.864 240v168.144a25.6 25.6 0 0 1-25.6 25.6h-320.96a25.6 25.6 0 0 1-25.6-25.6V240H256v549.568h517.568V240h-72.704z m-48 0h-276.16v145.744h276.16V240zM224 192h581.568a16 16 0 0 1 16 16v613.568a16 16 0 0 1-16 16H224a16 16 0 0 1-16-16V208a16 16 0 0 1 16-16z m346.432 89.04h16a16 16 0 0 1 16 16v32a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-32a16 16 0 0 1 16-16z"
              ></path>
            </svg>
          </i>
          <span>存入草稿</span>
        </el-button>
        <el-button type="primary" @click="submitForm(1, articleForm)">
          <i class="el-icon-upload2"></i>
          <span>提交审核</span>
        </el-button>
      </template>
    </MainFrameVue>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import MainFrameVue from "/src/components/MainFrame.vue";
import DialogBox from "./c-cpn/DialogBox.vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { getChannels } from "/src/api/channel.js";
import { publishArticle, getArticleById } from "/src/api/article.js";
import toolTips from "/src/hook/toolTips.js";

const router = useRouter();
const route = useRoute();
const articleForm = ref();

let channels = ref([]); // 频道列表

// 只能选今天及以后
const disabledDate = (time) => {
  return time.getTime() < Date.now() - 8.64e7;
};
const validateimages = (rule, value, callback) => {
  // 选择无图/自动
  if (formData.value.type != "-1" && formData.value.type != "0") {
    // 选择三图而未上传三张图
    if (formData.value.type === "3" && value.length < 3) {
      callback(new Error("文章封面未设置"));
    } else if (value.length === 0) {
      // 选择单图，未上传图片
      callback(new Error("文章封面未设置"));
    } else callback();
  } else callback();
};
const rules = reactive({
  title: {
    required: true,
    min: 4,
    message: "文章标题不能小于4个字符",
    trigger: "blur",
  },
  labels: {
    required: true,
    message: "内容标签不能为空",
    trigger: "change",
  },
  channelId: { required: true, message: "请选择频道", trigger: "blur" },
  publishTime: {
    type: "date",
    required: true,
    message: "请选择日期时间",
    trigger: "change",
  },
  images: { validator: validateimages },
});
let formData = ref({
  title: "", // 标题
  content: "", // 正文
  labels: "", // 标签
  channelId: "", // 所选频道
  type: "1", // 单图、三图、无图、自动
  publishTime: "",
  images: [], // 封面
  status: 1,
});

let editor = ref(null);
let toolbarConfig = ref({
  excludeKeys: ["group-video", "fullScreen", "group-image", "insertLink"],
  insertKeys: {
    index: 21,
    keys: ["uploadImage"],
  },
});
let editorConfig = ref({
  MENU_CONF: {
    uploadImage: {
      // 自定义上传
      customUpload(file, insertFn) {
        insertFn(URL.createObjectURL(file), "", "");
      },
    },
  },
});

let showDialog = ref(false); // 是否显示对话框
let currCover = ref(0); // 当前的封面

// 初始化editor
const onCreated = (e) => {
  editor.value = Object.seal(e);
};
// 设置封面值
const setimages = (url) => {
  showDialog.value = false;
  formData.value.images[currCover.value - 1] = url;
};
// 选择当前设置封面
const selectCover = (i) => {
  showDialog.value = true;
  currCover.value = i;
};
// 提交表单
const submitForm = async (operate, articleForm) => {
  if (!articleForm) return;
  await articleForm.validate(async (valid, fields) => {
    if (valid) {
      switch (formData.value.type) {
        case "1":
          formData.value.images.splice(1, 2);
          break;
        case "0":
        case "-1":
          formData.value.images = [];
          break;
      }
      const result = await publishArticle(operate, formData.value);
      toolTips(result, () => {
        router.push("/contentlist");
      });
    } else {
      console.log("error submit!", fields);
    }
  });
};
// 获取频道列表 / query
onBeforeMount(async () => {
  const result = await getChannels();
  channels.value = result.data;

  if (route.query.id) {
    const res = await getArticleById(route.query.id);
    formData.value = { ...res.data[0] };
    console.log(formData.value.type);
  }
});
</script>

<style lang="less" scoped>
#article-view {
  :deep(header) {
    display: none;
  }
  :deep(main) {
    padding: 30px;
    border-bottom: 2px solid #eaeaea;
    .title {
      margin-bottom: 0;
      height: 60px;
      .el-input__wrapper {
        box-shadow: none;
      }
      .el-input__inner {
        font-size: 16px;
        border: none;
      }
    }
    .el-row {
      align-items: center;
      .el-input {
        width: 140px;
        .el-input__inner {
          height: 30px;
        }
      }
      .el-date-editor.el-input,
      .el-date-editor.el-input__inner {
        width: 220px;
      }
    }
    .coverList {
      display: flex;
      .coverItem {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 278px;
        height: 180px;
        border: 2px dashed #d8dde3;
        .el-image,
        .el-image__inner {
          width: 100%;
          height: 100%;
        }
        .image-slot {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          cursor: pointer;
          &:hover {
            color: #3175fb;
            path {
              fill: #3175fb;
            }
          }
          p {
            height: 15px;
            line-height: 15px;
            font-size: 8x;
          }
        }
      }
    }
    .el-form {
      .el-form-item__content {
        display: block;
      }
    }
  }
  :deep(footer) {
    padding-left: 30px;
    line-height: 90px;
  }
}
</style>