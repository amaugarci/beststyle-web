<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div>充值</div>
    </div>
    <!-- body -->
    <div class="overflow-x-hidden overflow-y-auto h-full p-3">
      <div>
        <input type="number" v-model="form.amount" class="form-control form-control-sm mb-3" placeholder="充值金额"  required="">
        <input type="text" v-model="form.accountid"  class="form-control form-control-sm mb-3"  placeholder="帐户ID" required="">
        <input type="number" v-model="form.password" style="-webkit-text-security: disc;" class="form-control form-control-sm mb-3" placeholder="安全密码 [6位数字]" required="">
        <div class="relative w-full min-w-[200px]">
          <textarea v-model="form.detail"
            class="text-black  peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-500 bg-white px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-500 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          ></textarea>
          <label class="text-black  before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-grey-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            细节
          </label>
        </div>
        <button
          class="btn btn-success btn-block btn-sm" @click="sendRequest">确定</button>
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle } from 'bootstrap-icons-vue';
import axios from 'axios'
layer.config({
  skin: 'error-class'
})
export default defineComponent({
  name: 'recharge',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    form:{
      password:null,
      amount:null,
      accountid:null,
      detail:''
    }
  }),
  methods: {
    back() {
      this.$router.push({ name: 'me' });
    },
    showDialog(){
      layer.open({
          type:1,
          offset:'b',
          title:false,
          content: '信息不正确',
          closeBtn: 0,
          shadeClose:1,
      });
    },
    async sendRequest(){
      if(this.validation()){
            try{
                const response=await axios.post('/recharge', this.form);
                if(response.data.status==1){
                    layer.open({
                        type:1,
                        offset:'b',
                        title:false,
                        content: 'success',
                        closeBtn: 0,
                        shadeClose:1,
                    });
                }else{
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
        if(this.form.accountid==null||this.form.amount==null||this.form.password<6){
            return false;
        }
        return true;
    },
  }
})
</script>
<style>
body {
  background-color: #2b2f3e;
  color: #eee;
  line-height: 1.5;
}

.scrolldown {
  max-height: 5.5rem;
  -webkit-line-clamp: 5;
}

.scrollup {
  max-height: unset;
  -webkit-line-clamp: unset;
}
form-control-sm {
    height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.form-control {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 0.85rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.btn-block {
    display: block;
    width: 100%;
}
.btn-group-sm>.btn, .btn-sm {
    padding: 0.25rem 0.5rem;
    font-size: .875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}
.btn-success {
    color: #fff;
    background-color: #28a745;
    border-color: #28a745;
}
.btn-info {
    color: #fff;
    background-color: #17a2b8;
    border-color: #17a2b8;
}
hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
}
*{
  box-sizing: border-box;
}
body .error-class{ border-radius: 5px; width: 100%;margin: 0px;}
body .error-class .layui-layer-content{ color:#000; width: 100%; text-align: center;padding: 20px 30px}
body .error-class .layui-layer-btn{ padding: 0px;height:50px;display:flex; align-items: center;}
</style>