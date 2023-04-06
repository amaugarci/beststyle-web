<template>
    <div class="absolute top-[128px] bottom-0 right-0 left-0  py-[17px]" :class="{'bg-[#F3F9FF] px-[20px]':editId==null,'bg-white px-[13px]':editId!=null}">
      <div v-if="checks.length==0">
        <div class=" flex justify-center">
          <p class="mt-[57px] font-normal">暂未开放权限</p>
        </div>
      </div>
      <div v-else-if="editId!=null">
        <div class=" flex justify-center">
          <p class="mt-[15px] font-bold mb-[25px] text-[14px]">编辑查重资料</p>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center ">
              <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</p>
              <input type="text" v-model="checks[editId].group" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">新增日期</p>
              <input type="text" v-model="checks[editId].created_at" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">业务室/组</p>
              <input type="text" v-model="checks[editId].office" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务员</p>
              <input type="text" v-model="checks[editId].salemane" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户状态</p>
              <input type="text" v-model="checks[editId].realname" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户姓名</p>
              <input type="text" v-model="checks[editId].sex" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户性别</p>
              <input type="text" v-model="checks[editId].age" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户年龄</p>
              <input type="text" v-model="checks[editId].nickname" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
          <input type="text" v-model="checks[editId].state" class="grow text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
        </div>
        <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">职业描述</p>
          <input type="text" v-model="checks[editId].job" class="grow  pl-[10px] border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="请输平台户名" autocomplete="off">
        </div>
        <div class="relative w-full mb-[30px]">
          <textarea
            v-model="checks[editId].description"
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
            placeholder=" "
            :class="{'border-t-transparent':career!=''}"
          ></textarea>
          <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
            客户描述
          </label>
        </div>
        <div class="flex flex-row items-start text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] flex-shrink-0 text-end">聊天记录</p>
          <div class="grow flex justify-center overflow-x-auto">
            <div class="w-full flex items-center gap-[17px] ">
              <div v-for="(item,index) in checks[editId].images" class="w-[85px] h-[100px] flex ju items-center relative flex-shrink-0">
                <img  :src="item.url" class="w-[77px] h-[91px]"/>
                <BIconXCircle class="text-[15px] z-10 top-0 right-0 text-[#FF0000] absolute" @click="()=>deleteImage(index)" />
              </div>
              <div @click="selectImages" class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[85px] h-[100px]">
                <BIconPlus class="text-[30px]"/>
              </div>
            </div>
            <input multiple  type="file" accept="image/*" style="display:none" ref="imageInputs" @change="uploadImages">
          </div>
        </div>
        <button @click="saveCheck" class="absolute bottom-[36px] left-0 w-full py-[10px] bg-[#0B88F9] text-white font-black text-[16px]">
          提&nbsp;&nbsp;&nbsp;&nbsp;交
        </button>
      </div>
       <div v-else v-for="(item, index) in checks" :key="checks.id" class="w-full relative bg-white px-[16px] py-[6px] mb-[15px]">
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px]  text-[#101010]">客户状态:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.state }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">昵称:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.nickname }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">姓名:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.realname }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">年龄:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.age }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">职业描述:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.job }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.created_at }}</p>
          </div>
          <div class="absolute top-[17px] right-[14px]">
             <div class="flex flex-row">
              <p class="mt-[16px] mr-[2px] text-[14px] font-normal text-[#101010]">头像:</p>
              <img :src="item.avatar" class="w-[88px] h-[91px] rounded-[8px]"> 
             </div>
             <div class="flex flex-row justify-around mt-[35px] ml-[30px] text-[#969696]">
              <p class="text-[14px] font-normal cursor-pointer" @click="()=>showDeleteCheck(index)">删除</p>
              <p class="text-[14px] font-normal cursor-pointer" @click="()=>{edit(index)}">编辑</p> 
             </div>
          </div>
       </div>
   </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPlus,BIconXCircle } from 'bootstrap-icons-vue';
import axios from 'axios'

export default defineComponent({
  name: 'usercheck',
  components: {
    BIconPlus,
    BIconXCircle
  },
  data: () => ({
    checks:[
      {
        id:1,
        state:'热聊',
        group:'微信',
        office:'超越组',
        salemane:'马超',
        sex:'男',
        description:'这个客户是3月24号在头条上加的，以前是教书的，现在退休了，没事时在家里炒股。现在已经在热聊中了，请各位兄弟们麻烦放过，以免翻车，谢谢。',
        nickname:'天马行空',
        realname:'李唯艺',
        avatar:'https://i.ibb.co/Xjwh9Rv/3.png',
        age:57,
        job:'退休炒股',
        created_at:'2023/3/24',
        images:[
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          },
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          }
        ]
      },
      {
        id:2,
        state:'热聊',
        group:'微信',
        office:'超越组',
        salemane:'马超',
        sex:'男',
        description:'这个客户是3月24号在头条上加的，以前是教书的，现在退休了，没事时在家里炒股。现在已经在热聊中了，请各位兄弟们麻烦放过，以免翻车，谢谢。',
        nickname:'天马行空',
        realname:'李唯艺',
        avatar:'https://i.ibb.co/Xjwh9Rv/3.png',
        age:57,
        job:'退休炒股',
        created_at:'2023/3/24',
        images:[
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          },
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          }
        ]
      },
      {
        id:3,
        state:'热聊',
        group:'微信',
        office:'超越组',
        salemane:'马超',
        sex:'男',
        description:'这个客户是3月24号在头条上加的，以前是教书的，现在退休了，没事时在家里炒股。现在已经在热聊中了，请各位兄弟们麻烦放过，以免翻车，谢谢。',
        nickname:'天马行空',
        realname:'李唯艺',
        avatar:'https://i.ibb.co/Xjwh9Rv/3.png',
        age:57,
        job:'退休炒股',
        created_at:'2023/3/24',
        images:[
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          },
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          }
        ]
      },
      {
        id:4,
        state:'热聊',
        group:'微信',
        office:'超越组',
        salemane:'马超',
        sex:'男',
        description:'这个客户是3月24号在头条上加的，以前是教书的，现在退休了，没事时在家里炒股。现在已经在热聊中了，请各位兄弟们麻烦放过，以免翻车，谢谢。',
        nickname:'天马行空',
        realname:'李唯艺',
        avatar:'https://i.ibb.co/Xjwh9Rv/3.png',
        age:57,
        job:'退休炒股',
        created_at:'2023/3/24',
        images:[
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          },
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          }
        ]
      },
      {
        id:5,
        state:'热聊',
        group:'微信',
        office:'超越组',
        salemane:'马超',
        sex:'男',
        description:'这个客户是3月24号在头条上加的，以前是教书的，现在退休了，没事时在家里炒股。现在已经在热聊中了，请各位兄弟们麻烦放过，以免翻车，谢谢。',
        nickname:'天马行空',
        realname:'李唯艺',
        avatar:'https://i.ibb.co/Xjwh9Rv/3.png',
        age:57,
        job:'退休炒股',
        created_at:'2023/3/24',
        images:[
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          },
          {
            'url':'https://i.ibb.co/Xjwh9Rv/3.png',
          }
        ]
      },
    ],
    editId:null,
  }),
  mounted(){
  },
  methods: {
    selectImages() {
      this.$refs.imageInputs.click()
    },
    edit(index){
      this,this.editId=index;
    },
    deleteImage(index){
      this.checks[this.editId].images.splice(index, 1);
    },
    uploadImages() {
      let files = this.$refs.imageInputs.files;
      for(let i=0;i<files.length; i++){
        this.checks[this.editId].images.push({
          id:null,
          url:'https://i.ibb.co/Xjwh9Rv/3.png'
        });
      }
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
          this.checks.splice(index,1);
          layer.close(i);
        },
      });
    },
    saveCheck(){
      this.editId=null;
    }
  }
})
</script>
