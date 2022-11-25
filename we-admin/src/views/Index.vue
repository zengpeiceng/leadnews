<template>
  <div id="index-page">
    <div class="left-nav">
      <div class="l-nav-c">
        <div class="index-logo">
          <img
            src="@/assets/img/index/logo_heima_admin@2x.efa65eb.png"
            alt=""
          />
        </div>
        <el-menu
          :router="true"
          :default-active="activeRoute"
          active-text-color="#fff"
        >
          <el-menu-item index="/auth/index">
            <el-icon><i-ep-user /></el-icon>
            <span>用户审核</span>
          </el-menu-item>
          <el-menu-item index="/channel/index">
            <el-icon><i-ep-menu /></el-icon>
            <span>频道管理</span>
          </el-menu-item>
          <el-menu-item index="/news/index">
            <el-icon><i-ep-folder /></el-icon>
            <span>内容审核</span>
          </el-menu-item>
          <el-menu-item index="/news-published/index">
            <el-icon><i-ep-document /></el-icon>
            <span>内容管理</span>
          </el-menu-item>
          <el-menu-item index="/sensitive/index">
            <el-icon><i-ep-edit /></el-icon>
            <span>敏感词设置</span>
          </el-menu-item>
        </el-menu>
        <div class="login-out">
          <div class="avatar">
            <img src="@/assets/img/index/avatar.png" alt="" />
            <span>guest</span>
          </div>
          <span>|</span>
          <svg
            t="1667457619020"
            class="icon"
            viewBox="0 0 1024 1024"
            width="16"
            height="16"
            cursor="pointer"
            @click="outlogin"
          >
            <path
              d="M918.4 489.6l-160-160c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8l105.6 105.6L512 480c-19.2 0-32 12.8-32 32s12.8 32 32 32l307.2 0-105.6 105.6c-12.8 12.8-12.8 32 0 44.8 6.4 6.4 12.8 9.6 22.4 9.6 9.6 0 16-3.2 22.4-9.6l160-163.2c0 0 0-3.2 3.2-3.2C931.2 518.4 931.2 499.2 918.4 489.6z"
              fill="#8a8a8a"
            ></path>
            <path
              d="M832 736c-19.2 0-32 12.8-32 32l0 64c0 19.2-12.8 32-32 32L224 864c-19.2 0-32-12.8-32-32L192 192c0-19.2 12.8-32 32-32l544 0c19.2 0 32 12.8 32 32l0 64c0 19.2 12.8 32 32 32s32-12.8 32-32L864 192c0-54.4-41.6-96-96-96L224 96C169.6 96 128 137.6 128 192l0 640c0 54.4 41.6 96 96 96l544 0c54.4 0 96-41.6 96-96l0-64C864 748.8 851.2 736 832 736z"
              fill="#8a8a8a"
            ></path>
          </svg>
        </div>
      </div>
    </div>
    <div class="right-content">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import storage from "../utils/localStorage";
const router = useRouter()
const route = useRoute();

const activeRoute = computed(() => {
  if(route.meta.activeMenu) 
    return route.meta.activeMenu;
  return route.path;
})

// 退出登录
const outlogin = () => {
  storage.removeItem('token')
  router.push('/login')
}

</script>

<style lang="less" scoped>
#index-page {
  padding: 40px 40px 40px 0;
  min-width: 95%;
  min-height: calc(100% - 80px);
  background-color: #f3f4f7;
  background-image: url("@/assets/img/index/img_bj_zuoshang@2x.9e13090.png"),
    url("@/assets/img/index/img_bj_zuoxia@2x.6f2935e.png");
  background-size: 183px 179px, 305px 238px;
  background-position: 0 0, 107px 100%;
  background-attachment: fixed;
  background-repeat: no-repeat, no-repeat;
  .left-nav {
    float: left;
    width: 200px;
    .l-nav-c {
      position: fixed;
      min-height: 100%;
      width: 200px;
      text-align: center;
      :deep(.el-menu) {
        margin-top: 50px;
        background: none;
        border: none;
        color: #58637d;
        .el-menu-item {
          height: 40px;
          margin-top: 15px;
          padding: 0;
          justify-content: center;
          border-radius: 45px;
        }
        .is-active {
          background: linear-gradient(270deg, #3a9bfb, #3175fb);
        }
      }
      .index-logo {
        margin-top: 20px;
        img {
          width: 147px;
          height: 60px;
        }
      }
      .login-out {
        display: flex;
        position: absolute;
        left: 50px;
        align-items: center;
        justify-content: space-between;
        bottom: 70px;
        color: #666;
        height: 36px;
        width: 127px;
        line-height: 36px;
        .avatar {
          img {
            width: 36px;
            height: 36px;
          }
        }
      }
    }
  }
  .right-content {
    margin-left: 240px;
    box-shadow: 0 0 30px 30px rgb(30 30 50 / 5%);
    background-color: #fff;
    border-radius: 8px;
  }
}
</style>