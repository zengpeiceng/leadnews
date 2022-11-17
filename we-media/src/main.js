import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import "@/assets/css/base.css"
import "@/assets/css/general.less"

const app = createApp(App)

app.use(router)

app.mount('#app')
