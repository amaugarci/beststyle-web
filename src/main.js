import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import {i18n} from '@/i18n'
import axios from 'axios';
import pinia from './pinia'
import { layer } from 'vue3-layer';
import 'vue3-layer/dist/s3Layer.css';
import '@/plugins';
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers['Accept-Language'] = 'CN';
const app = createApp(App)
app.use(router)
   .use(i18n)
   .use(pinia)
   .mount('#app')
