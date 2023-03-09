import { defineStore } from 'pinia'
import axios from 'axios'
export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    user:null,
    system:null,
    token:localStorage.getItem('token'),
    returnUrl:'me',
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
