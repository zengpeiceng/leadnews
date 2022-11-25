<template>
  <div id="app-wrapper">
    <el-dialog v-model="dialogVisible" title="温馨提示" width="30%">
      <span>登录超时，请重新登录</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancle">取消</el-button>
          <el-button type="danger" @click="confirm"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();

let dialogVisible = computed(() => store.state.sysDialogShow);
const cancle = () => {
  store.commit("changeSysDialogStatus", false)
}
const confirm = () => {
  store.commit("changeSysDialogStatus", false)
  router.push("/login")
};
</script>

<style lang="less" scoped>
#app-wrapper {
  min-width: 100%;
  min-height: 100vh;
}
</style>