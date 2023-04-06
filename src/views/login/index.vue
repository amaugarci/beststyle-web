<template>
    <div class=" flex flex-col items-center">
        <img src="assets/bg/bg1.png"  class="w-full h-[198px]">
        <img src="assets/images/mark.png"  class="absolute top-[151px]  w-[70px] h-[98px]">
        <p class="text-[33px] font-semibold text-[#2D96F5] mt-[101px]">Sign In</p>
        <div class="w-full px-[49px]">
            <div class="relative text-[#BBBBBB] w-full mt-[40px]">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <BIconPersonFill class="text-[#B2B2B2] text-[18px]"/>
                </span>
                <input type="text" v-model="username" class="border-2 w-full py-3 text-black text-[14px] rounded-md pl-10 focus:outline-none" placeholder="请输入用户名" autocomplete="off">
            </div>
            <div class="relative text-[#BBBBBB] w-full mt-[40px]">
                <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                    <BIconLockFill class="text-[#B2B2B2] text-[18px]"/>
                </span>
                <input :type="showPassword?'password':'text'" v-model="password"  class="border-2 w-full py-3 text-black text-[14px] rounded-md pl-10 focus:outline-none" placeholder="请输入密码" autocomplete="off">
                <span class="absolute inset-y-0 right-2 flex items-center pl-2">
                    <BIconEye v-if="!showPassword" class="text-[#B2B2B2] text-[18px]" @click="()=>showPassword=!showPassword"/>
                    <BIconEyeSlash v-else class="text-[#B2B2B2] text-[18px]" @click="()=>showPassword=!showPassword"/>
                </span>
            </div>
        </div>
        <button class="mt-[50px] rounded-fill w-[200px] h-[44px] relative flex justify-center items-center">
            <img src="assets/images/button.png" @click="login"  class="absolute rounded-fill w-[200px] h-[44px]">
            <p class="text-[20px] z-10 font-semibold text-white">登 录</p>
        </button>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPersonFill,BIconLockFill ,BIconEyeSlash,BIconEye } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
export default defineComponent({
  name: 'login',
  components: {
    BIconPersonFill,
    BIconLockFill,
    BIconEye,
    BIconEyeSlash
  },
  data:()=>({
    message:'',
    username:'',
    password:'',
    showPassword:false,
    signUp:{
        name:'',
        password:'',
        resetPassword:'',
        securitynumber:'',
        realname:''
    }
  }),

  computed:{
  },
  methods:{
    login(){
        this.$router.push({ name: 'training' })
    },
  }
})
</script>
