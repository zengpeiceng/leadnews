import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import '@wangeditor/editor/dist/css/style.css'
import "@/assets/css/base.css"
import "@/assets/css/general.less"

const app = createApp(App)

app.use(router)
app.use(ElementPlus, {
  locale: zhCn
})

app.mount('#app')
