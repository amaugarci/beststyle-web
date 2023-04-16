<template>
    <div class="absolute top-[128px] bottom-0 right-0 left-0  py-[17px]" :class="{'bg-[#F3F9FF] px-[20px]':check==null,'bg-white px-[13px]':editId!=null}">
      <div v-if="check!=null&&checks.length==0">
        <div class=" flex justify-center">
          <p class="mt-[57px] font-normal">暂未开放权限</p>
        </div>
      </div>
      <div v-else-if="check!=null" class="px-2" >
        <div class=" flex justify-center">
          <p class="mt-[15px] font-bold mb-[25px] text-[14px]">编辑查重资料</p>
        </div>
        <p class="font-black mr-[17px] top-[50px] right-[75px] absolute">头像：</p>
        <div @click="selectImage" class="w-[85px] h-[100px] top-[10px] right-[10px] absolute">
          <div v-if="check.photo" class=" relative">
            <img :src="VITE_BACKEND_URL+check.photo" class="w-[85px] h-[100px]"/>
          </div>
          <div v-else class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[85px] h-[100px]">
            <BIconPlus class="text-[30px]" />
          </div>
          <input type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
        </div>
        <div class="mt-[10px] flex flex-row items-center ">
          <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</p>
          <SelectBox placeholder="选择平台"  :groups="platforms" :group="check.platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{check.platform_id=value}"/>
        </div>
        <div class="mt-[15px]  flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户姓名</p>
              <input type="text" placeholder="输入客户姓名"  v-model="check.client_name" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">新增日期</p>
              <input type="date" v-model="check.added_date" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">部门</p>
              <SelectBox placeholder="选择部门"  :groups="departments" :group="check.department_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{check.department_id=value}"/>
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务室/组</p>
              <SelectBox placeholder="选择业务室"  :groups="groups" :group="check.group_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{check.group_id=value}"/>
            </div>
            <!-- <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务员</p>
              <input type="text" v-model="check.salemane" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div> -->
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务员</p>
              <input type="text" v-model="check.sale_man" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="输入业务员" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户状态</p>
              <SelectBox placeholder="选择状态"  :groups="statuses" :group="check.client_status_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{check.client_status_id=value}"/>
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户性别</p>
              <SelectBox placeholder="选择性别"  :groups="sexes" :group="check.client_sex" class="w-[100px] h-[31px] "  @onchange="(value)=>{check.client_sex=value}"/>
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户年龄</p>
              <input type="number" v-model="check.client_age" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入年龄" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
          <input type="text" v-model="check.platform_nickname" class="grow text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台账号" autocomplete="off">
        </div>
        <!-- <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">职业描述</p>
          <input type="text" v-model="check.job" class="grow  pl-[10px] border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
        </div> -->
        <!-- <div class="relative w-full mb-[30px]">
          <textarea
            v-model="check.comment"
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
            placeholder=" "
            :class="{'border-t-transparent':check.comment!=''}"
          ></textarea>
          <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
            客户描述
          </label>
        </div> -->
        <button @click="saveCheck" class="absolute bottom-[36px] left-0 w-full py-[10px] bg-[#0B88F9] text-white font-black text-[16px]">
          提&nbsp;&nbsp;&nbsp;&nbsp;交
        </button>
      </div>
       <div v-else v-for="(item, index) in checks" :key="item.id" class="w-full relative bg-white px-[16px] py-[6px] mb-[15px]">
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px]  text-[#101010]">客户状态:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_status.name }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">昵称:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platform_nickname }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">姓名:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_name }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">年龄:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_age }}</p>
          </div>
          <!-- <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">职业描述:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.job }}</p>
          </div> -->
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">
              {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}
            </p>
          </div>
          <div class="absolute top-[17px] right-[14px]">
             <div class="flex flex-row">
              <p class="mt-[16px] mr-[2px] text-[14px] font-normal text-[#101010]">头像:</p>
              <img :src="VITE_BACKEND_URL+item.photo" class="w-[88px] h-[91px] rounded-[8px]"> 
             </div>
             <div class="flex flex-row justify-around mt-[25px] ml-[30px] text-[#969696]">
              <p class="text-[14px] font-normal cursor-pointer leading-4" @click="()=>showDeleteCheck(index)">删除</p>
              <p class="text-[14px] font-normal cursor-pointer leading-4" @click="()=>{edit(index)}">编辑</p> 
             </div>
          </div>
       </div>
   </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPlus,BIconXCircle } from 'bootstrap-icons-vue';
import SelectBox from '@/components/SelectBox.vue'
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;

export default defineComponent({
  name: 'usercheck',
  components: {
    BIconPlus,
    BIconXCircle,
    SelectBox
  },
  data: () => ({
    sexes:[
      {
        id:1,
        name:'男'
      },
      {
        id:2,
        name:'女'
      },
    ],
    VITE_BACKEND_URL,
    checks:[],
    check:null,
    departments:[],
    platforms:[],
    statuses:[],
  }),
  watch:{
    'check.department_id':function(newVal, oldVal) {
      if(this.check!=null){
        for(let i=0;i<this.departments.length;i++){
          if(this.departments[i].id==this.check.department_id){
            this.groups=this.departments[i].group;
            for(let i=0;i<this.departments.length;i++){
              if(this.groups[i].id==this.check.group_id){
                return;
              }
            }
            this.check.group_id='';
            return;
          }
        }
      }
    }
  },
  mounted(){
    this.getChecks();
  },
  methods: {
    moment: function () {
        return moment;
    },
    async getChecks() {
      try {
        this.checks=null;
        const response = await axios.get(`/checks`);
        if(response.data.status==1){
          this.checks = response.data.checks;
          this.departments = response.data.departments;
          this.platforms = response.data.platforms;
          this.statuses = response.data.statuses;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    edit(index){
      this.check=this.checks[index];
      this.check.department_id=this.check.group.department_id;
    },
    showDeleteCheck(index){
      layer.config({
        skin: ''
      })
      layer.open({
        title:`删除查重`,
        content: `<i class="layui-layer-ico layui-layer-ico3 "></i><span class='ml-[40px]'>删除后无法恢复</span>`,
        btn:['确定','取消'],
        closeBtn: 0,
        shadeClose: 1,
        yes: (i, layero) => {
          this.deletecheck(index);
          layer.close(i);
        },
      });
    },
    saveCheck(){
      this.checkEdit();
    },
    createValidation(){
        if(this.check.platform_id==''){
            this.message='平台是必需的';
            return false;
        }
        else if(this.check.added_date==''){
          this.message='新增日期是必需的';
            return false;
        }
        else if(this.check.department_id==''){
          this.message='部门是必需的';
            return false;
        }
        else if(this.check.group_id==''){
          this.message='业务室/组是必需的';
            return false;
        }
        else if(this.check.sale_man==''){
          this.message='业务员是必需的';
            return false;
        }
        else if(this.check.client_status_id==''){
          this.message='客户状态员是必需的';
            return false;
        }
        else if(this.check.client_name==''){
          this.message='客户姓名是必需的';
            return false;
        }
        else if(this.check.client_sex==''){
          this.message='客户性别是必需的';
            return false;
        }
        else if(this.check.client_age==''){
          this.message='客户年龄';
            return false;
        }
        else if(this.check.platform_nickname==''){
          this.message='客户描述';
            return false;
        }
        else if(this.check.photo==null){
          this.message='头像';
            return false;
        }
        return true;
    },
    async checkEdit(){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      try{
        const response=await axios.post(`/editcheck/${this.check.id}`, {
            platform_id:this.check.platform_id,
            added_date:this.check.added_date,
            group_id:this.check.group_id,
            sale_man:this.check.sale_man,
            client_status_id:this.check.client_status_id,
            client_name:this.check.client_name,
            client_sex:this.check.client_sex,
            client_age:this.check.client_age,
            platform_nickname:this.check.platform_nickname,
            photo:this.check.photo,
        });
        if(response.status==422){
          this.message='网络错误';
          this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.check=null;
          this.getChecks();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    async deletecheck(index) {
      try {
        const response = await axios.get(`/deletecheck/${this.checks[index].id}`);
        if(response.data.status==1){
          layer.config({
            skin: ''
          })
          layer.msg("操作成功");
          this.checks.splice(index,1);
        }else{
          this.message='网络错误';
          this.showDialog();
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    selectImage() {
      this.$refs.imageInput.click()
    },
    async uploadImage() {
      this.loading=true;
      let file = this.$refs.imageInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try{
        const response=await axios.post(`/uploadfile`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.check.photo=response.data.image;
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }
      finally{
        this.loading=false;
      };
    },
    showDialog(){
        layer.config({
          skin: 'login-class'
        })
        layer.open({
            type:1,
            offset:'b',
            title:false,
            content: this.message,
            closeBtn: 0,
            shadeClose:1,
        });
    },
    showSucss(){
      layer.config({
        skin: 'success-class'
      })
      layer.open({
        title:false,
        content: '成功',
        btn:'确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
      });
    },
  }
})
</script>
