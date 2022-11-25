import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store"
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import '@/assets/css/general.less'
import '@/assets/css/reset.css'

import Testing from "/src/utils/testing";

const app = createApp(App)

app.use(router)
app.use(store);
app.use(ElementPlus, {
  locale: zhCn
})
app.use(Testing);
app.mount('#app')
