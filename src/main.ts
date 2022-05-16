import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import dayjs from 'dayjs'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
// dayjs 使用中文
import 'dayjs/locale/zh-cn'
import App from './App.vue'

import router from './router'

const app = createApp(App)
// Element 使用中文
app.use(ElementPlus, {
  locale: zhCn,
})
dayjs.locale('zh-cn')
app.use(createPinia())
  .use(router)
  .mount('#app')
