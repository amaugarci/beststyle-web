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
const app = createApp(App)
app.use(router)
   .use(pinia);
axios.get('/localization')
 .then(response => {
   response.data.forEach(localeObj => {
     const locale = Object.keys(localeObj)[0]
     const translations = localeObj[locale]
     i18n.global.setLocaleMessage(locale, translations)
   });

   app.use(i18n)
      .mount('#app')
 })
 .catch(error => {
   console.log(error)
 })
