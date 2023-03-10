<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div  class="font-black text-white">修改密码</div>
    </div>
    <!-- body -->
    <div class="overflow-x-hidden overflow-y-auto h-full p-3">
      <p class="mt-[0.3rem] text-[1rem] pb-[1rem]">登陆密码</p>
      <div>
        <input type="password" class="form-control form-control-sm mb-3" v-model="password.old"
          name="password" placeholder="原密码" required="">
        <input type="password" class="form-control form-control-sm mb-3"  v-model="password.new"
          name="newpassword" placeholder="登陆密码 [6~16位]" required="">
        <input type="password" class="form-control form-control-sm mb-3"  v-model="password.double" name="repassword" placeholder="再次输入密码" required="">
        <button
          class="btn btn-success btn-block btn-sm" @click="sendPassword">确定</button>
      </div>
      <hr>
      <p class="mt-[0.3rem] text-[1rem] pb-[1rem]">安全密码</p>
      <div>
        <input type="password"
          class="form-control form-control-sm mb-3 " name="safepawd"  v-model="securitynumber.old" placeholder="原密码" required="">
        <input type="password"
          class="form-control form-control-sm mb-3 " name="newsafepawd"  v-model="securitynumber.new" placeholder="安全密码 [6位数字]" required="">
        <input
          type="password" class="form-control form-control-sm mb-3 "  v-model="securitynumber.double" name="resafepawd" placeholder="再次输入密码"
          required=""><button class="btn btn-info btn-block btn-sm" @click="sendSecurity">确定</button>
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
  name: 'changepassword',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    password:{
      old:'',
      new:'',
      double:''
    },
    securitynumber:{
      old:'',
      new:'',
      double:''
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
          content: this.message,
          closeBtn: 0,
          shadeClose:1,
      });
    },
    async sendPassword(){
      if(this.validation(this.password)){
          try{
              const response=await axios.post('/changepassword', this.password);
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
    async sendSecurity(){
      if(this.validation(this.securitynumber)){
          try{
              const response=await axios.post('/changesecurity', this.securitynumber);
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
    validation(value){
        if(value.old==null||value.new==null){
          this.message='请输入所有值'
          return false;
        }
        if(value.new.length<6||value.old.length<6){
          this.message='密码必须为6位或更长。'
          return false;
        }
        if(value.double!=value.new){
          this.message='确认密码不正确'
          return false;
        }
        
        return true;
    },
  }
})
</script>
<style>

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