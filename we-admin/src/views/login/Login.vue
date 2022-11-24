<template>
  <div id="login">
    <div class="login_view">
      <div class="view_left">
        <span>欢迎使用</span>
        <span>黑马头条后台管理系统</span>
        <img src="@/assets/img/login/welcome@2x.ab9fc73.png" />
      </div>
      <div class="view_right">
        <!-- logo -->
        <img
          class="view_logo"
          src="@/assets/img/login/logo_index@2x.40beadf.png"
        />
        <!-- 用户名和密码 -->
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="300px"
          class="demo-ruleForm"
          :hide-required-asterisk="true"
          validate-on-rule-change
          @validate="judeg"
        >
          <el-form-item label="用户名 / user name" prop="name">
            <el-input placeholder="请输入用户名" v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="密码 / password" prop="password">
            <el-input placeholder="请输入密码" type="password" v-model="ruleForm.password" />
          </el-form-item>
        </el-form>
        <!-- 用户协议 -->
        <el-checkbox
          v-model="checked"
          label="我已阅读并同意用户协议和隐私条款"
          size="large"
          @change="judegbug"
        />
        <!-- 登录按钮 -->
        <el-button type="primary" round size="large" :disabled="islogo" @click="loginin">登 录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { login } from '/src/api/login/login.js'
import { useRouter } from "vue-router";
import { ElMessage } from 'element-plus';
const router = useRouter()
// 表单信息
const ruleForm = reactive({
  name: "guest",
  password: "guest",
});
// 表单验证
const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "change" }],
  password: [{ required: true, message: "请输入密码", trigger: "change" }],
});
// 是否确定协议
const checked = ref(true)
// 是否禁用登录按钮
const islogo = ref(false)
// 判断密码与用户是否输入
const ruleFormRef = ref(null)
// 判断是否符合登录
const judegbug = () => {
    ruleFormRef.value.validate(config => {
        if( checked.value === true && config === true ){
            islogo.value = false
            return true
        }else{
            islogo.value = true
            return false
        }
    })
}
// 判断是否禁用登录
const judeg = (prop, isValid, message) => {
  if( checked.value === true &&  isValid === true && ruleForm.name && ruleForm.password ){
    return islogo.value = false
  }
  islogo.value = true
}
// 登录
const loginin = async () => {
  try{
    const res = await login(ruleForm)
    const token = res.data.token;
    window.localStorage.setItem('token',token)
    router.push('/')
  }catch(err){
    ElMessage.error('登录失败！！！')
  }
}
</script>

<style lang="less" scoped>
#login {
  display: flex;
  padding: 20px 0;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: url("@/assets/img/login/login_bg@2x.af1f9e7.png") no-repeat;
  background-size: 100%;
  .login_view {
    display: flex;
    box-sizing: border-box;
    width: 1070px;
    height: 600px;
    background-color: #fff;
    border-radius: 20px;
    .view_left {
      box-sizing: border-box;
      padding-left: 121px;
      display: flex;
      flex-flow: column;
      width: 642px;
      border-radius: 20px 0 0 20px;
      background-color: #eef4ff;
      & > span:nth-child(1) {
        font-size: 40px;
        font-weight: 100;
        color: #474849;
        display: inline-block;
        margin: 60px 0 10px 0;
      }
      & > span:nth-child(2) {
        font-size: 40px;
        font-weight: 600;
        color: #3175fb;
      }
      img {
        margin-top: 40px;
        width: 305px;
        height: 305px;
      }
    }
    .view_right {
      align-items: center;
      flex: 1;
      display: flex;
      flex-flow: column;
      img {
        margin: 86px auto 0;
        width: 172px;
        height: 48px;
      }
      ::v-deep .el-form {
        margin: 40px auto 0;
        .el-form-item {
          text-align: center;
          display: flex;
          flex-flow: column;
          .el-form-item__label {
            align-items: center;
            justify-content: center;
            font-size: 16px;
            font-weight: 400;
            color: #bac0cd;
          }
          .el-form-item__error{
            left: 50%;
            transform: translateX(-50%);
          }
          .el-input__wrapper{
            border-radius: 200px;
          }
          .el-input__inner{
            height: 50px;
            text-align: center;
          }
        }
      }
      ::v-deep .el-checkbox{
        margin-top: 20px;
        .el-checkbox__label{
            font-size: 14px;
            color: #bac0cd;
            font-weight: 400;
        }
      }
      .el-button{
        margin-top: 14px;
        width: 300px;
        height: 60px;
        border-radius: 200px;
        font-size: 18px;
        font-weight: 400;
      }
    }
  }
}
</style>