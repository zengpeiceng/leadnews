import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import '@wangeditor/editor/dist/css/style.css'
import "@/assets/css/base.css"
import "@/assets/css/general.less"

// 事件管理
import 'default-passive-events'

import Testing from "/src/utils/testing";
const app = createApp(App);

app.use(router);
app.use(store);
app.use(ElementPlus, {
  locale: zhCn
})
app.use(Testing);
app.mount('#app')
