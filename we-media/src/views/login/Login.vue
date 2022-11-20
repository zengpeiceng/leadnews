<template>
  <div id="loginwrapper">
    <div class="loginbox">
      <div class="left">
        <div class="title">
          <h2>欢迎使用</h2>
          <p>黑马头条自媒体人管理系统</p>
        </div>
        <img src="@/assets/img/login/welcome@2x.4e80f44.png" alt="" />
      </div>
      <div class="right">
        <img src="@/assets/img/login/logo_index@2x.40beadf.png" alt="" />
        <el-form :model="account" :rules="formRule" ref="formRef">
          <el-form-item label="用户名 / username" prop="name">
            <el-input
              v-model="account.name"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码 / password" prop="password">
            <el-input
              v-model="account.password"
              type="password"
              placeholder="请输入"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <p @click="isCheck = !isCheck">
              <el-checkbox v-model="isCheck" />
              <span>我已阅读并同意用户协议和隐私条款</span>
            </p>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              :disabled="!isCheck"
              @click="submitForm(formRef)"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { Login } from "/src/api/login.js";
import toolTips from "/src/hook/toolTips.js";
import { setItem } from "/src/hook/localStorage.js";

const router = useRouter();

const account = reactive({
  name: "admin",
  password: "admin",
});

const isCheck = ref(true);

const formRef = ref();

const formRule = reactive({
  name: {
    required: true,
    trigger: "blur",
    message: "请输入用户名",
  },
  password: {
    required: true,
    trigger: "blur",
    message: "请输入密码",
  },
});

const submitForm = (formEl) => {
  if (!formRef) return
  formEl.validate(async (valid) => {
    if(valid) {
      const result = await Login(account)
      toolTips(result, () => {
        setItem('token', result.data.token)
        router.push("/graphic/index");
      });
    }else {
      console.log('error submit');
    }
  })
};
</script>

<style lang="less" scoped>
#loginwrapper {
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: center;
  background-image: url("@/assets/img/login/login_bg@2x.8929380.png");
  background-size: cover;
  background-repeat: no-repeat;
  .loginbox {
    width: 1020px;
    height: 586px;
    .left {
      display: flex;
      float: left;
      flex-direction: column;
      justify-content: space-around;
      padding-left: 100px;
      width: 60%;
      height: 100%;
      background: linear-gradient(180deg, #597ef7, #3175fb);
      border-radius: 18px 0 0 18px;
      .title {
        color: #fff;
        h2 {
          font-size: 50px;
          font-weight: normal;
        }
        p {
          font-size: 30px;
          font-weight: bold;
        }
      }
      img {
        width: 313px;
        height: 239px;
      }
    }
    .right {
      float: right;
      text-align: center;
      width: 40%;
      height: 100%;
      background-color: #fff;
      border-radius: 0 18px 18px 0;
      box-shadow: 0 0 30px 30px rgb(30 30 50 / 5%);
      img {
        margin-top: 60px;
        width: 172px;
        height: 48px;
      }
      .el-form {
        padding: 0 50px;
        margin: 0 auto;
      }
      .el-form-item {
        display: block;
        text-align: center;
        :deep(.el-form-item__label) {
          font-size: 16px;
          margin: 20px 0;
          color: #bac0cd;
        }
      }
      :deep(.el-form-item__content) {
        display: block;
        color: #bac0cd;
        cursor: pointer;
        .el-checkbox {
          margin-right: 10px;
        }

        .el-form-item__error {
          width: 100%;
          text-align: center;
        }
      }
      .el-input,
      .el-input__inner,
      .el-button {
        width: 300px;
        height: 50px;
        border-radius: 45px;
      }
      :deep(.el-input__inner) {
        text-align: center;
      }
      :deep(.el-input__wrapper) {
        border-radius: 45px;
      }
    }
  }
}
</style>