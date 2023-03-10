<template>
    <div class="min-h-screen justify-center flex flex-col">
        <h6 class="pb-3 mx-auto">
            <span class="text-base px-[20px] font-bold uppercase">登陆</span> 
            <span class="text-base px-[20px] font-bold uppercase">开户</span>
        </h6>
        <div class="w-[100px] h-[30px] mx-auto relative">
            <div @click="changeChecked" class="absolute mx-[15px] mt-[8px] w-[60px] mx-auto bg-[#ffeba7] h-[18px] rounded-full">
            </div>
            <div @click="changeChecked"  class="absolute w-[35px] mx-auto bg-[#102770] h-[35px] rounded-full justify-center flex flex-col buttontransaction" :class="{buttonrotate:!checked}">
                <BIconArrowUpLeft class="font-black text-[#ffeba7] text-[16px] mx-auto "/>
            </div>
        </div>
        <div class="card-3d-wrap xm:w-[400px] xm:mx-auto mx-[10%]" >
            <div class="card-3d-wrapper" :class="{ mrotate180:checked }">
                <div class="card-front">
                    <div class="px-8 pt-[10px] text-left flex flex-col items-center">
                        <h3 class="text-2xl font-bold text-center text-[#c4c3ca]">sign Up</h3>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconPersonCircle class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="text" v-model="signUp.name" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="帐号 [6-16位英文开头和数字]" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconLock class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="password" v-model="signUp.password" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="登陆密码 [6~16位]" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconLockFill class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="password" v-model="signUp.resetPassword" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="再次输入密码" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconShieldCheck class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="number" v-model="signUp.securitynumber" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="安全密码 [6位数字]" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconBrush class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="text" v-model="signUp.realname" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="真实姓名" autocomplete="off">
                        </div>
                        <button @click="creatAccount" class=" px-[30px] py-[10px] bg-[#ffeba7] mt-[10px] rounded-md text-[14px] text-[#102770] font-bold" id="LoginSubmit">登陆</button>
                    </div>
                </div>
                <div class="card-back rotate180 ">
                    <div class="px-8 pt-[50px] text-left flex flex-col items-center">
                        <h3 class="text-2xl font-bold text-center text-[#c4c3ca]">Login</h3>
                        <div class="relative text-gray-600 w-full mt-[40px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconPersonCircle class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="text" v-model="username" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="您的帐号" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[40px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconLock class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="password" v-model="password"  class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" placeholder="登陆密码" autocomplete="off">
                        </div>
                        <button @click="login" class=" px-[30px] py-[10px] bg-[#ffeba7] mt-[30px] rounded-md text-[14px] text-[#102770] font-bold" id="LoginSubmit">登陆</button>
                        <button class="mt-[30px] text-[#c4c3ca] rounded-md text-[14px] font-bold" id="LoginSubmit">忘记密码？</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row mx-auto mt-[50px]">
            <img src="/img/mark.png" width="20">
            <p class="ml-[10px]">
                香港网络安全局认证
            </p>
        </div>
        <div class="flex flex-row mx-auto mt-[5px]">
            <img src="/img/beian.png" width="20">
            <p>
                京公网安备11010202000001号
            </p>
        </div>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle,BIconLock,BIconLockFill,BIconShieldCheck,BIconBrush,BIconArrowUpLeft } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
layer.config({
  skin: 'login-class'
})
export default defineComponent({
  name: 'login',
  components: {
    BIconPersonCircle,
    BIconLock,
    BIconLockFill,
    BIconShieldCheck,
    BIconBrush,
    BIconArrowUpLeft
  },
  data:()=>({
    message:'帐号或密码错误',
    checked:true,
    username:'player',
    password:'player',
    signUp:{
        name:'',
        password:'',
        resetPassword:'',
        securitynumber:'',
        realname:''
    }
  }),
  computed:{
    ...mapState(useAuthStore, ['getUser','getReturnUrl']),
  },
  methods:{
    changeChecked () {
       this.checked=!this.checked;
    },
    ...mapActions(useAuthStore, ['setUser','setToken','fetchUser']),
    async login(){
        if(this.validation()){
            try{
                const response=await axios.post('/login', {
                    name:this.username,
                    password:this.password
                });
                if(response.data&&response.data.token){
                    this.setToken(response.data.token);
                    await this.fetchUser();
                    this.$router.push({ name: this.getReturnUrl })
                }else{
                    this.message='帐号或密码错误';
                    this.showDialog();
                }
            }
            catch(error) {
                this.message='帐号或密码错误';
                this.showDialog();
            };
        }
        else{
            this.showDialog();
        }
    },
    async creatAccount(){
        if(this.signUpvalidation()){
            try{
                const response=await axios.post('/register', {
                   ...this.signUp
                });
                if(response.data.status==1){
                    layer.open({
                        type:1,
                        offset:'b',
                        title:false,
                        content: '成功',
                        closeBtn: 0,
                        shadeClose:1,
                    });
                }else{
                    this.message='出现意想不到的问题'
                    this.showDialog();
                }
            }
            catch(error) {
                this.message='出现意想不到的问题'
                this.showDialog();
            };
        }
        else{
            this.showDialog();
        }
    },
    showDialog(){
        layer.open({
                type:1,
                offset:'b',
                title:false,
                content: this.message,
                closeBtn: 0,
                shadeClose:1,
            });
    },
    validation(){
        if(this.username==''||this.password==''){
            this.message='请输入所有值'
            return false;
        }
        if(this.password.length<6){
            this.message='密码必须为6位或更长。'
            return false;
        }
        return true;
    },
    signUpvalidation(){
        if(this.signUp.name.length<6||this.signUp.name.length>16){
            this.message='帐号必须为 6 -16位'
            return false;
        }
        if(this.signUp.password.length<6||this.signUp.password.length>16){
            this.message='密码必须为 6 -16位'
            return false;
        }
        if(this.signUp.password!=this.signUp.resetPassword){
            this.message='确认密码不正确'
            return false;
        }
        if(this.signUp.realname==""){
            this.message='请输入真实姓名'
            return false;
        }
        return true;
    }
  }
})
</script>

<style>
    .card-3d-wrapper {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        transition: all 600ms ease-out;
    }
    .buttonrotate{
        transform:translate(50px, 0px) rotate(-270deg) ;
    }
    .buttontransaction{
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        transition: all 600ms ease-out;
    }
    .card-front, .card-back {
        width: 100%;
        height: 100%;
        background-color: #2a2b38;
        background-image: url(/img/pat.svg);
        background-position: bottom center;
        background-repeat: no-repeat;
        background-size: 300%;
        position: absolute;
        border-radius: 6px;
        left: 0;
        top: 0;
        -webkit-transform-style: preserve-3d;
        transform-style: preserve-3d;
        -webkit-backface-visibility: hidden;
        -moz-backface-visibility: hidden;
        -o-backface-visibility: hidden;
        backface-visibility: hidden;
    }
    .rotate180 {
        transform: rotateY(180deg);
    }
    .mrotate180 {
        transform: rotateY(-180deg);
    }
    .card-3d-wrap {
        position: relative;
        max-width: 100%;
        height: 400px;
        perspective: 800px;
        margin-top: 30px;
    }
    body .login-class{ border-radius: 5px; width: 100%;margin: 0px;}
    body .login-class .layui-layer-content{ color:#000; width: 100%; text-align: center;padding: 20px 30px}
    body .login-class .layui-layer-btn{ padding: 0px;height:50px;display:flex; align-items: center;}
</style>
