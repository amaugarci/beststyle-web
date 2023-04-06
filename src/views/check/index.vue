<template>
   <div class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white h-[40px]" :class="{'border-b-[2px]':isadd}">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in items" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="!isadd" class="px-[20px] flex w-full justify-between items-center  bg-white h-[60px] text-[14px]">
      <div class="relative text-[#BBBBBB] w-[230px] rounded-full">
          <input :type="showPassword?'password':'text'" v-model="password"  class="rounded-full border-2 w-full py-2 text-black text-[14px] pl-10 focus:outline-none" placeholder="请输入昵称" autocomplete="off">
          <span class="absolute inset-y-0 right-2 flex items-center pr-2">
              <BIconSearch  class="text-[#B2B2B2] text-[18px]" />
          </span>
      </div>
      <div class="flex items-center cursor-pointer" @click="addCheck">
        <BIconPlus class="text-[32px]"/>
        <p class="font-normal">添加查重资料</p>
      </div>
    </div>
    <div class="absolute bottom-0 right-0 left-0 overflow-y-scroll" :class="{'bg-white px-[13px] top-[40px] ':isadd,'px-[18px] top-[100px] ':!isadd}">
      <div v-if="isdetail!=null" >
        <div class="flex items-center py-[10px] gap-2 text-[14px]">
          <div class="flex items-center">
            <img src="assets/icons/turn_round.svg" class="text-[15px] cursor-pointer" @click="goBackTwo()"/>
            <p @click="goBackTwo()" class="font-normal">返回</p>
          </div>
        </div>
        <div class="w-full h-[764px] bg-white flex flex-col px-[21px] relative pt-[18px]">
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px]  text-[#101010]">客户状态:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].state }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">昵称:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].nickname }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">姓名:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].realname }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">年龄:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].age }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">职业描述:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].job }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].created_at }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ items[selected].children[isdetail].nickname }}</p>
          </div>
          <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
          <p class="text-[14px] font-normal text-[#101010] ml-[2px] mb-[7px]">
           {{  items[selected].children[isdetail].description}}
          </p>
          <p class="text-[14px] font-normal text-[#101010]">聊天截图:</p>
          <div class="w-full flex items-center gap-[17px] ">
            <div v-for="(item,index) in items[selected].children[isdetail].images" class="w-[152px] h-[340px] flex ju items-center relative flex-shrink-0">
              <img :src="item.url" class="w-[152px] h-[340px] mt-[10px]"/>
            </div>
          </div>
          <div class="absolute top-[17px] right-[14px]">
             <div class="flex flex-row">
              <p class=" mr-[2px] text-[14px] font-normal text-[#101010]">客户头像：</p>
              <img :src="items[selected].children[isdetail].avatar" class="w-[88px] h-[91px] rounded-[8px]"> 
             </div>
          </div>
          <div class="flex absolute bottom-[13px] right-[21px] justify-end gap-[30px] items-center pt-[13px] text-[12px] text-[#969696]">
            <div class="flex gap-1 items-center">
              <BIconChatDots class="text-[12px]"/>
              <p class="font-normal">评论</p>
            </div>
            <div class="flex gap-1 items-center">
              <BIconEye class="text-[15px]"/>
              <p class="font-normal">569</p>
            </div>
            <p class="font-normal">2023-03-24</p>
          </div>
        </div>
      </div>
      <div v-else-if="isadd" >
        <div class=" flex justify-center">
          <p class="mt-[15px] font-bold mb-[25px] text-[14px]">编辑查重资料</p>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center ">
              <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</p>
              <input type="text" v-model="newCheck.group" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">新增日期</p>
              <input type="text" v-model="newCheck.created_at" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">业务室/组</p>
              <input type="text" v-model="newCheck.office" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务员</p>
              <input type="text" v-model="newCheck.salemane" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户状态</p>
              <input type="text" v-model="newCheck.realname" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户姓名</p>
              <input type="text" v-model="newCheck.sex" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户性别</p>
              <input type="text" v-model="newCheck.age" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户年龄</p>
              <input type="text" v-model="newCheck.nickname" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
          <input type="text" v-model="newCheck.state" class="grow text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
        </div>
        <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">职业描述</p>
          <input type="text" v-model="newCheck.job" class="grow  pl-[10px] border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
        </div>
        <div class="relative w-full mb-[30px]">
          <textarea
            v-model="newCheck.description"
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
              <div v-for="(item,index) in newCheck.images" class="w-[85px] h-[100px] flex ju items-center relative flex-shrink-0">
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
      <div v-else v-for="(item, index) in items[selected].children" :key="item.id" class="w-full relative bg-white px-[16px] py-[6px] mt-[15px]">
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
             <div class="flex flex-row items-center justify-end mt-[35px] ml-[30px] text-[#969696]">
                 <p @click="()=>godDetail(index)" class="font-normal cursor-pointer">查看更多</p>
                 <BIconChevronRight @click="()=>godDetail(index)"  class="text-[15px] cursor-pointer"/>
             </div>
          </div>
       </div>
    </div>
   </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPlus,BIconSearch,BIconChevronRight,BIconXCircle,BIconChatDots, BIconEye } from 'bootstrap-icons-vue';
import axios from 'axios'

export default defineComponent({
  name: 'check',
  components: {
    BIconPlus,
    BIconSearch,
    BIconChevronRight,
    BIconXCircle,
    BIconChatDots,
    BIconEye
  },
  data: () => ({
    items:[
      {
        id:1,
        name:'微信',
        children:[
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
        ]
      },
      {
        id:2,
        name:'QQ',
        children:[
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
        ]
      },
      {
        id:3,
        name:'Telegram',
        children:[
        ]
      },
      {
        id:4,
        name:'WhatAPP',
        children:[
        ]
      },
      {
        id:5,
        name:'抖音',
        children:[
        ]
      }
    ],
    selected:0,
    isadd:false,
    isdetail:null,
    newCheck:{
        state:'',
        group:'',
        office:'',
        salemane:'',
        sex:'',
        description:'',
        nickname:'',
        realname:'',
        avatar:'',
        age:57,
        job:'',
        created_at:'',
        images:[
        ]
    }
  }),
  mounted(){
  },
  methods: {
    selectImages() {
      this.$refs.imageInputs.click()
    },
    deleteImage(index){
      this.newCheck.images.splice(index, 1);
    },
    uploadImages() {
      let files = this.$refs.imageInputs.files;
      for(let i=0;i<files.length; i++){
        this.newCheck.images.push({
          id:null,
          url:'https://i.ibb.co/Xjwh9Rv/3.png'
        });
      }
    },
    selectOne(index){
      this.selected=index;
      this.isadd=false;
      this.isdetail=null;
    },
    addCheck(){
      this.isadd=true;
    },
    saveCheck(){
      this.isadd=false;
    },
    godDetail(index){
      this.isdetail=index;
    },
    goBackTwo(){
      this.isdetail=null;
    }
  }
})
</script>
