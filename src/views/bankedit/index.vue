<template>
  <div class="absolute top-0 left-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left absolute">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">{{ $t('editbank') }}</div>
    </div>
    <!-- body -->
    <div class="overflow-x-hidden overflow-y-auto h-full p-3">
      <div>
          <ul class="mt-2 list-group-item list-group-flush">
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconPersonCircle />
              <input type="text" v-model="name" class="ml-[10px] input-transparent p-1 text-[16px]" :placeholder="$t('bankname')"  required="">
            </li>
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconCardImage />
              <input type="text" v-model="cardnumber2"  class="ml-[10px] input-transparent p-1 text-[16px]"  :placeholder="$t('cardnumber')"  required="">
            </li> 
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconBank />
              <input type="text" v-model="address" class="ml-[10px] input-transparent p-1 text-[16px]" :placeholder="$t('aaddress')"  required="">
            </li> 
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconPersonCheck />
              <input type="text" v-model="realname"  class="ml-[10px] input-transparent p-1 text-[16px]"  :placeholder="$t('realname')" required="">
            </li> 
            <li class="list-group-item flex items-center px-[20px] py-[15px]">
              <BIconPhoneFill />
              <input type="number" v-model="phonenumber" class="ml-[10px] input-transparent p-1 text-[16px]" :placeholder="$t('pnumberinvalid')" required="">
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
    name:null,
    cardnumber2:null,
    address:null,
    realname:null,
    phonenumber:null,
  }),
  mounted(){
    if(this.getUser.bank==null){
      this.$router.push({ name: 'me' });
    }else{
      this.name = this.getUser.bank.name;
      this.cardnumber2 = this.getUser.bank.cardnumber.toString();
      this.address = this.getUser.bank.address;
      this.realname = this.getUser.bank.realname;
      this.phonenumber = null;
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
            var form = this.getUser.bank;
            form.name = this.name;
            form.cardnumber = this.cardnumber2;
            form.address = this.address;
            form.realname = this.realname;
            form.phonenumber = this.phonenumber;
                const response=await axios.post('/editbank', form);
                if(response.data.status==1){
                    this.addBank(response.data.bank);
                    this.$router.push({ name: 'me' });
                }else{
                    this.message=this.$t('bexist');
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
    validation(){
      const regexPattern = /^[\p{Script=Han}\p{P}\p{Z}\p{L}]+$/u;
        if(this.name==null||this.cardnumber2==null||this.address==null||this.realname==null){
          this.message=this.$t('allvalue');
            return false;
        }
        if(this.phonenumber.toString().length<8||this.phonenumber.toString().length>16){
          this.message=this.$t('pnumberinvalid');
          return false;
        }
        console.log(regexPattern.test(this.name));
        if(!regexPattern.test(this.name)){
          this.message=this.$t('bnameinvalid');
          return false;
        }
        if(!regexPattern.test(this.realname)){
          this.message=this.$t('rnameinvalid');
          return false;
        }
        return true;
    },
  }
})
</script>
<style>

</style>