<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left absolute">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">银行编辑</div>
    </div>
    <!-- body -->
    <div class="overflow-x-hidden overflow-y-auto h-full p-3">
      <div>
          <ul class="mt-2 list-group-item list-group-flush">
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconPersonCircle />
              <input type="text" v-model="form.name" class="ml-[10px] input-transparent p-1 text-[16px]" placeholder="银行名称"  required="">
            </li>
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconCardImage />
              <input type="number" v-model="form.cardnumber"  class="ml-[10px] input-transparent p-1 text-[16px]"  placeholder="卡号" required="">
            </li> 
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconBank />
              <input type="text" v-model="form.address" class="ml-[10px] input-transparent p-1 text-[16px]" placeholder="开户地址"  required="">
            </li> 
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconPersonCheck />
              <input type="text" v-model="form.realname"  class="ml-[10px] input-transparent p-1 text-[16px]"  placeholder="真实姓名" required="">
            </li> 
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconPhoneFill />
              <input type="number" v-model="form.phonenumber" class="ml-[10px] input-transparent p-1 text-[16px]" placeholder="手机号码 [8-16位数字]" required="">
            </li> 
          </ul>        
          <button class="my-2 btn btn-success btn-block btn-sm" style="padding:0.75rem" @click="sendRequest">
              确定
          </button>
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle,BIconCardImage,BIconBank, BIconPersonCheck,BIconPhoneFill } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
export default defineComponent({
  name: 'bankedit',
  components: {
    BIconPersonCircle,
    BIconCardImage,
    BIconBank,
    BIconPersonCheck,
    BIconPhoneFill
  },
  data: () => ({
    message:'',
    form:{
      name:null,
      cardnumber:null,
      address:null,
      realname:null,
      phonenumber:null,
    }
  }),
  mounted(){
    if(this.getUser.bank==null){
      this.$router.push({ name: 'me' });
    }else{
      this.form=this.getUser.bank;
    }
  },
  computed:{
    ...mapState(useAuthStore, ['getUser','getReturnUrl']),
  },
  methods: {
    ...mapActions(useAuthStore, ['addBank']),
    back() {
      this.$router.push({ name: 'me' });
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
    async sendRequest(){
      if(this.validation()){
          try{
                const response=await axios.post('/editbank', this.form);
                if(response.data.status==1){
                    this.addBank(response.data.bank);
                    this.$router.push({ name: this.getReturnUrl })
                }else{
                    this.message='银行存在'
                    this.showDialog();
                }
            }
            catch(error) {
                this.message='网络错误，请稍候再试'
                this.showDialog();
            };
        }
        else{
            this.showDialog();
        }
    },
    validation(){
      const regexPattern = /^[\p{Script=Han}\p{P}\p{Z}\p{L}]+$/u;
        if(this.form.name==null||this.form.cardnumber==null||this.form.address==null||this.form.realname==null){
          this.message='请输入所有值';
            return false;
        }
        if(this.form.phonenumber.toString().length<8||this.form.phonenumber.toString().length>16){
          this.message='电话号码必须为 6 -16位';
          return false;
        }
        console.log(regexPattern.test(this.form.name));
        if(!regexPattern.test(this.form.name)){
          this.message='银行名称是不正确的';
          return false;
        }
        if(!regexPattern.test(this.form.realname)){
          this.message='真实姓名是不正确的';
          return false;
        }
        return true;
    },
  }
})
</script>
<style>

</style>