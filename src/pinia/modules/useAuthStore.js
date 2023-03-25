import { defineStore } from 'pinia'
import axios from 'axios'
import {i18n} from '@/i18n'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    user:null,
    system:null,
    token:localStorage.getItem('token'),
    returnUrl:'home',
  }),
  getters:{
    getUser:(state)=>state.user,
    getSystem:(state)=>state.system,
    getToken:(state)=>state.token,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setUser(value) {
      this.user=value;
    },
    setSystem(value) {
      this.system=value;
    },
    setToken(value) {
      this.token=value;
      localStorage.setItem('token',value);
    },
    setReturnUrl(value) {
      this.returnUrl=value;
    },
    addBank(value) {
      this.user.bank=value;
    },
    changeBalance(value) {
      this.user.cash_amount-=value;
    },
    async fetchUser () {
      try {
        const { data } = await axios.get('/user');
        this.user=data.user;
        console.log(axios.defaults.headers['Accept-Language']);
        i18n.global.locale = this.user.localization.name;
        axios.defaults.headers['Accept-Language'] = this.user.localization.name;
        this.system=data.system;
        document.title=this.system.title;
      }catch (e) {
      }
    },
    logout () {
      this.token=null;
      localStorage.removeItem('token');
    },
  },
})
