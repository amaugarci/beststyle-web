<template>
    <div class="min-h-screen justify-center flex flex-col">
        <div ref="button" class="absolute top-[2px] right-[15px]">
            <button class="text-white bg-[#2b2f3e] border-blue-700 border-2 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button" @click="()=>expand=!expand">{{selectedLanguage}}</button>
            <!-- Dropdown menu -->
            <div id="dropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-9" :class="{'hidden':!expand}">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" >
                    <li  v-for="(language, index) in availableLanguages"  @click="changeLanguage(language)">
                        <div class="block py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white text-center" :class="{'text-white bg-blue-700':language==selectedLanguage}">{{ language }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <!-- <div class="absolute top-[15px] right-[15px]">
            <select class="block px-[3px] py-[1px] appearance-none text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-15  focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="selectedLanguage" @change="changeLanguage">
                <option v-for="language in availableLanguages" :value="language">{{ language }}</option>
            </select>
        </div> -->
        <h6 class="pb-3 mx-auto">
            <span class="text-base px-[20px] font-bold uppercase">{{$t('login')}}</span> 
            <span class="text-base px-[20px] font-bold uppercase">{{$t('signup')}}</span>
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
                        <h3 class="text-2xl font-bold text-center text-[#c4c3ca]">{{$t('signup')}}</h3>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconPersonCircle class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="text" v-model="signUp.name" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('accountnumberlimit')" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconLock class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="password" v-model="signUp.password" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('loginpasswordlimit')" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconLockFill class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="password" v-model="signUp.resetPassword" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('reloginpassword')" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconShieldCheck class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="number" v-model="signUp.securitynumber" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('securitycodelimit')" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[10px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconBrush class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="text" v-model="signUp.realname" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('realname')" autocomplete="off">
                        </div>
                        <button @click="creatAccount" class=" px-[30px] py-[10px] bg-[#ffeba7] mt-[10px] rounded-md text-[14px] text-[#102770] font-bold" id="LoginSubmit">{{ $t('register') }}</button>
                    </div>
                </div>
                <div class="card-back rotate180 ">
                    <div class="px-8 pt-[50px] text-left flex flex-col items-center">
                        <h3 class="text-2xl font-bold text-center text-[#c4c3ca]">{{$t('login')}}</h3>
                        <div class="relative text-gray-600 w-full mt-[40px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconPersonCircle class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input type="text" v-model="username" class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('accountid')" autocomplete="off">
                        </div>
                        <div class="relative text-gray-600 w-full mt-[40px]">
                            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                                <BIconLock class="text-[#ffeba7] text-[18px]"/>
                            </span>
                            <input :type="showPassword?'password':'text'" v-model="password"  class=" w-full py-3 text-[#c4c3ca] text-[14px] bg-[#1f2029] rounded-md pl-10 focus:outline-none" :placeholder="$t('password')" autocomplete="off">
                            <span class="absolute inset-y-0 right-2 flex items-center pl-2">
                                <BIconEye v-if="!showPassword" class="text-[#ffeba7] text-[18px]" @click="()=>showPassword=!showPassword"/>
                                <BIconEyeSlash v-else class="text-[#ffeba7] text-[18px]" @click="()=>showPassword=!showPassword"/>
                            </span>
                        </div>
                        <button @click="login" class=" px-[30px] py-[10px] bg-[#ffeba7] mt-[30px] rounded-md text-[14px] text-[#102770] font-bold" id="LoginSubmit">{{ $t('login') }}</button>
                        <button class="mt-[30px] text-[#c4c3ca] rounded-md text-[14px] font-bold" @click="openService">{{ $t('forgotpassword') }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row mx-auto mt-[50px]">
            <img src="/img/mark.png" width="20">
            <p class="ml-[10px]">
                {{ $t('certificatedhk') }}
            </p>
        </div>
        <div class="flex flex-row mx-auto mt-[5px]">
            <img src="/img/beian.png" width="20">
            <p>
                {{ $t('Beijingno') }}
            </p>
        </div>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle,BIconLock,BIconLockFill,BIconShieldCheck,BIconBrush,BIconArrowUpLeft,BIconEyeSlash,BIconEye } from 'bootstrap-icons-vue';
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
    BIconArrowUpLeft,
    BIconEye,
    BIconEyeSlash
  },
  mounted(){
    this.getUrl();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  data:()=>({
    expand:false,
    availableLanguages: [],
    selectedLanguage: '',
    url:'',
    message:'',
    checked:true,
    username:'',
    password:'',
    showPassword:true,
    signUp:{
        name:'',
        password:'',
        resetPassword:'',
        securitynumber:'',
        realname:''
    }
  }),
  created() {
    this.availableLanguages = Object.keys(this.$i18n.messages)
    this.selectedLanguage = this.$i18n.locale
  },

  computed:{
    ...mapState(useAuthStore, ['getUser','getReturnUrl']),
  },
  methods:{
    handleClickOutside(event) {
        if (this.$refs.button&&this.$refs.button.contains(event.target)) {
            return;
        }
        this.expand=false;
    },
    changeLanguage(language) {
      this.expand=!this.expand;
      this.$i18n.locale = language;
      this.selectedLanguage=language;
      axios.defaults.headers['Accept-Language'] = language;
    },
    openService(){
        window.open(this.url, '_blank');
    },
    async getUrl(){
      try{
          const response=await axios.get('/url');
          this.url=response.data.url;
      }
      catch(error) {
        console.log(error);
      };
    },
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
                    this.message=this.$t('invalidcredential');
                    this.showDialog();
                }
            }
            catch(error) {
                this.message=this.$t('invalidcredential');
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
                    this.username=this.signUp.name;
                    this.password=this.signUp.password;
                    this.login();
                    // layer.open({
                    //     type:1,
                    //     offset:'b',
                    //     title:false,
                    //     content: '成功',
                    //     closeBtn: 0,
                    //     shadeClose:1,
                    // });
                }else{
                    this.message=this.$t('existaccount');
                    this.showDialog();
                }
            }
            catch(error) {
                this.message=this.$t('neterror');
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
            this.message=this.$t('invalidvalues');
            return false;
        }
        if(this.password.length<6){
            this.message=this.$t('passsix');
            return false;
        }
        return true;
    },
    signUpvalidation(){
        if(this.signUp.name.length<6||this.signUp.name.length>16){
            this.message=this.$t('accountnumberlimit');
            return false;
        }
        if(this.signUp.password.length<6||this.signUp.password.length>16){
            this.message=this.$t('passsix');
            return false;
        }
        if(this.signUp.password!=this.signUp.resetPassword){
            this.message=this.$t('cpassincorrect')
            return false;
        }
        if(this.signUp.realname==""){
            this.message=this.$t('invalidrealname');
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
