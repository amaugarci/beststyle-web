import { defineStore } from 'pinia'
import axios from 'axios'
import {i18n} from '@/i18n'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    user:null,
    token:localStorage.getItem('token'),
    ip_address:'',
    returnUrl:'training',
  }),
  getters:{
    getUser:(state)=>state.user,
    getIp:(state)=>state.ip_address,
    getToken:(state)=>state.token,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setUser(value) {
      this.user=value;
    },
    setIp(value) {
      this.ip_address=value;
      this.logout();
    },
    setToken(value) {
      this.token=value;
      localStorage.setItem('token',value);
    },
    setReturnUrl(value) {
      this.returnUrl=value;
    },
    async fetchUser () {
      try {
        const { data } = await axios.get('/user');
        this.user=data.user;
      }catch (e) {
      }
    },
    logout () {
      this.token=null;
      localStorage.removeItem('token');
    },
  },
})
