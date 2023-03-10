<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div>{{ name }}</div>
    </div>
    <!-- body -->
    <div class="overflow-x-hidden overflow-y-auto h-full p-3">
      <div v-if="isShow">
          <input type="text" v-model="form.name" class="form-control form-control-sm mb-3" placeholder="银行名称"  required="">
          <input type="number" v-model="form.cardnumber"  class="form-control form-control-sm mb-3"  placeholder="卡号" required="">
          <input type="text" v-model="form.address" class="form-control form-control-sm mb-3" placeholder="开户地址"  required="">
          <input type="text" v-model="form.realname"  class="form-control form-control-sm mb-3"  placeholder="真实姓名" required="">
          <input type="number" v-model="form.phonenumber" class="form-control form-control-sm mb-3" placeholder="手机号码 [8-16位数字]" required="">
          <button class="btn btn-success btn-block btn-sm" @click="sendRequest">
              确定
          </button>
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
export default defineComponent({
  name: 'bank',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    name:'充值',
    isShow:false,
    message:'',
    form:{
      name:null,
      cardnumber:null,
      address:null,
      realname:null,
      phonenumber:null,
    }
  }),
  computed:{
    ...mapState(useAuthStore, ['getUser','getReturnUrl']),
  },
  mounted(){
    if(this.getUser.bank!=null){
      this.$router.push({ name: 'me' });
    }
    else{
      this.AddBank();
    }
  },
  methods: {
    ...mapActions(useAuthStore, ['addBank']),
    back() {
      this.$router.push({ name: 'me' });
    },
    AddBank(){
      layer.config({
        skin: 'me-class'
      })
      layer.open({
        title:false,
        content: '未绑定银行卡',
        btn:['取消','确定'],
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
        yes :(index, layero)=>{
          this.$router.push({ name: 'me' });
          layer.close(index);
        },
        btn2:()=>{
          this.name='绑定银行卡';
          this.isShow=true;
        }
      });
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
                const response=await axios.post('/addbank', this.form);
                if(response.data.status==1){
                    this.addBank(response.data.bank);
                    this.$router.push({ name: this.getReturnUrl })
                }else{
                    this.message='银行存在'
                    this.showDialog();
                }
            }
            catch(error) {
                this.message='请输入姓名，真实姓名'
                this.showDialog();
            };
        }
        else{
            this.showDialog();
        }
    },
    validation(){
        if(this.form.name==null||this.form.cardnumber==null||this.form.address==null||this.form.realname==null){
          this.message='请输入所有值';
            return false;
        }
        if(this.form.phonenumber.length<8||this.form.phonenumber.length>16){
          this.message='电话号码必须为 6 -16位';
          return false;
        }
        return true;
    },
  }
})
</script>
<style>

</style>