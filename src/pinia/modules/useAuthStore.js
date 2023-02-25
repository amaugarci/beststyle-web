import { defineStore } from 'pinia'

export const useAuthStore = defineStore('useAuthStore', {
  state: () => ({
    user:null,
    returnUrl:'home',
  }),
  getters:{
    getUser:(state)=>state.user,
    getReturnUrl:(state)=>state.returnUrl,
  },
  actions: {
    setUser(value) {
      this.user=value;
    },
    setReturnUrl(value) {
      this.returnUrl=value;
    },
  },
})
