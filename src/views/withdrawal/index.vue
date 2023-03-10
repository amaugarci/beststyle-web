<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">提现</div>
    </div>
    <!-- card -->
    <div class="m-3 bg-[#DC3545] p-4 flex flex-row">
      <div class="rounded-full w-[48px] h-[48px] text-center justify-center flex items-center bg-[#FF8792] mr-[10px]">
        <p>{{ getUser.bank.name.slice(0,1) }}</p>
      </div>
      <div class="flex flex-col justify-evenly">
        <p>{{getUser.bank.name}}</p>
        <p>{{`${getUser.bank.cardnumber.toString().slice(0,3)} **** **** **** **** ${getUser.bank.cardnumber.toString().slice(0,3)}`}}</p>
      </div>
    </div>
    <p class="px-3">
      余额：{{ getUser.cash_amount }} 
    </p>
    <!-- body -->
    <div class="overflow-x-hidden p-3">
      <div>
        <ul class="mt-2 list-group-item list-group-flush">
          <li class="list-group-item flex items-center px-[20px] py-[15px]">
            <BIconLifePreserver class="bi-life-preserver"/>
            <input type="number" name="money" placeholder="提现金额" v-model="form.amount" class="input-transparent p-1 text-[16px]" id="CashMoney">
          </li> 
          <li class="list-group-item flex items-center px-[20px] py-[15px]">
            <BIconShieldExclamation class="bi-shield-exclamation" />
            <input type="password" name="money" placeholder="安全密码" v-model="form.security" class="input-transparent p-1 text-[16px]" id="CashSafePawd">
          </li> 
        </ul>
        <button
          class="my-2 btn btn-success btn-block btn-sm " style="padding:0.75rem" @click="sendRequest">确定</button>
      </div>
    </div>
    <div class="px-3 flex">
      <p >
        {{ `最小提现金额:${getSystem.minwithdrawal}` }}
      </p>
      <p class="ml-4">
        {{`手续费：${getSystem.withdrawPercent}%`}}
      </p>
  </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle,BIconLifePreserver,BIconShieldExclamation } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
layer.config({
  skin: 'error-class'
})
export default defineComponent({
  name: 'withdrawal',
  components: {
    BIconPersonCircle,
    BIconLifePreserver,
    BIconShieldExclamation 
  },
  data: () => ({
    message:'',
    form:{
      bank_id:null,
      amount:null,
      security:null,
    }
  }),
  computed:{
    ...mapState(useAuthStore, ['getUser','getSystem']),
  },
  methods: {
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
      this.form.bank_id=this.getUser.bank.id;
      if(this.validation()){
            try{
                const response=await axios.post('/withdrawal', this.form);
                if(response.data.status==1){
                  this.form.amount=null;
                  this.form.security=null;
                    layer.open({
                        type:1,
                        offset:'b',
                        title:false,
                        content: '成功',
                        closeBtn: 0,
                        shadeClose:1,
                    });
                }else{
                  this.message=response.data.message;
                    this.showDialog();
                }
            }
            catch(error) {
                this.showDialog();
            };
        }
        else{
            this.showDialog();
        }
    },
    validation(){
        if(this.form.amount==null||this.form.security==null){
            this.message='请输入所有值';
            return false;
        }
        if(this.form.security<6){
            this.message='安全密码必须为6位或更长';
            return false;
        }
        if(Number(this.getSystem.minwithdrawal)>this.form.amount||Number(this.getSystem.maxwithdrawal)<this.form.amount){
            this.message='取款金额超出范围';
            return false;
        }
        if(Number(this.getUser.cash_amount)<this.form.amount){
            this.message='您的账户余额不足';
            return false;
        }
        return true;
    },
  }
})
</script>
<style>
</style>