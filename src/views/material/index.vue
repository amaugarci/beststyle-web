<template>
  <div class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white h-[40px]">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in items" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected[0]==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="!detail" class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  h-[40px]">
      <button v-if="items[selected[0]]" @click="()=>selectTwo(sindex)" v-for="(sitem, sindex) in items[selected[0]].children"  class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected[1]==sindex}">
        {{ sitem.name }}
      </button>
    </div>
    <div v-if="!detail">
      <div  class="bg-white px-[13px] top-[80px] absolute bottom-0 right-0 left-0 overflow-y-scroll">
        <div  class="mt-[30px] flex flex-col items-start px-[50px] gap-3 overflow-y-scroll">
          <button  v-if=" items[selected[0]].children[selected[1]]" @click="()=>godetail()" v-for="(titem, tindex) in items[selected[0]].children[selected[1]].children">
            {{(tindex+1)+". "+titem.name }}
          </button>
        </div>
      </div>
    </div>
    <div v-else class="px-[9px]">
      <div class="flex items-center py-[10px] gap-2 text-[14px] mb-[11px] bg-[#F3F9FF]">
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px] cursor-pointer" @click="goBack()"/>
          <p class="font-normal">通用</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px]" />
          <p class="font-normal text-[#0B88F9]">逛街</p>
        </div>
      </div>
      <div class="top-[80px] absolute bottom-0 right-0 left-0 overflow-y-scroll grid grid-cols-2 gap-2 px-[9px] text-[14px]">
         <div v-for="(item,index) in details" class="h-[303px] bg-[white] px-[6px] py-[5px]">
          <img src='https://i.ibb.co/Xjwh9Rv/3.png' class="w-full h-[213px]" >
          <p class="font-normal my-[10px]">昆明万达商场买鞋试穿，适合动态使用</p>
          <div class="flex justify-between items-center text-[12px] text-[#969696]">
            <p class="font-normal">图片</p>
            <p class="font-normal">2023-03-24</p>
            <div class="flex gap-1 items-center text-black">
              <p @click="showDetail" class="font-normal cursor-pointer">下载</p>
              <img @click="showDetail" src="assets/icons/download.svg" class="cursor-pointer">
            </div>
          </div>
         </div>
      </div>
    </div>
  </div>
  <div ref="dialog"  class="absolute z-[99991] top-0 right-0 left-0 bottom-0 bg-[#010101] opacity-75" v-if="showdownload">
  </div>
  <div v-if="showdownload" class="absolute z-[99991] w-[90%] h-[600px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    <img src='https://i.ibb.co/Xjwh9Rv/3.png' class="bg-[#FFFFFF] w-full h-[490px]" >
    <p class="font-normal my-[10px] text-white">家门口的超市里买东西，自己一个人，只能晚上用发给大他也如同工会人体第三方的地方都是发</p>
    <div class="flex gap-1 items-center justify-end text-white">
      <p @click="downlodFile" class="font-normal cursor-pointer">下载</p>
      <img @click="downlodFile" src="assets/icons/wdownload.svg"   class="cursor-pointer">
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft } from 'bootstrap-icons-vue';
import axios from 'axios'

export default defineComponent({
  name: 'material',
  components: {
    BIconChevronLeft
  },
  data: () => ({
    items:[
      {
        id:1,
        name:'国内生活',
        children:[
          {
            id:11,
            name:'通用',
            children:[
              {
                id:111,
                name:'开车照片',
                
                children: null,
              },
              {
                id:112,
                name:'旅游景点',
                children: null,
              }
            ]
          },
          {
            id:12,
            name:'李唯艺',
            children:[
              {
                id:121,
                name:'孩子、家人',
                children: null,
              },
              {
                id:122,
                name:'聚餐',
                children: null,
              }
            ]
          }
        ]
      },
      {
        id:2,
        name:'国内工作',
        children:[
          {
            id:21,
            name:'杨莎',
            children:[
              {
                id:211,
                name:'逛街',
                children: null,
              },
              {
                id:212,
                name:'其他',
                children: null,
              }
            ]
          },
          {
            id:22,
            name:'赵慧敏',
            children:[
              {
                id:221,
                name:'孩子、家人',
                children: null,
              },
              {
                id:222,
                name:'旅游景点',
                children: null,
              }
            ]
          }
        ]
      },
      {
        id:3,
        name:'初聊',children:[]
      },
      {
        id:4,
        name:'破冰',children:[]
      },
      {
        id:5,
        name:'故事',children:[]
      },
    ],
    showdownload:false,
    selected:[0,0],
    details:Array(10).fill(1),
    detail:false,
  }),
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods: {
    handleClickOutside(event) {
      if(this.showdownload){
        if(this.$refs.dialog.contains(event.target)){
          this.showdownload=false;
        }
      }
    },
    selectOne(index){
      this.selected[0]=index;
      this.selected[1]=0;
      this.detail=false;
    },
    selectTwo(index){
      this.selected[1]=index;
      this.detail=false;
    },
    goBack(){
      this.detail=false;
    },
    godetail(){
      this.detail=true;
    },
    showDetail(){
      this.showdownload=true;
    },
    downlodFile(){
      this.showdownload=false;
    }
  }
})
</script>
