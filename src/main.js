import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import i18n from '@/i18n'
import pinia from './pinia'

const app = createApp(App)

app.use(router)
   .use(i18n)
   .use(pinia)
   .mount('#app')
