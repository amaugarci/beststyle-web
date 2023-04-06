<template>
  <div class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white border-b-[1px] h-[40px] border-[#817b7b]">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in items" class="px-[10px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'bg-gradient-to-r from-blue-700 to-blue-400 text-white':selected[0]==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="subdetail">
      <div class="flex items-center py-[10px] gap-2 text-[14px]">
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px] cursor-pointer" @click="goBackTwo()"/>
          <p class="font-normal">方法</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px] cursor-pointer" @click="goBack()"/>
          <p class="font-normal">方法</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px]" />
          <p class="font-normal text-[#0B88F9]">最新养号方法...</p>
        </div>
      </div>
      <div class="w-full h-[457px] bg-white flex flex-col items-center px-[21px] relative">
        <p class="font-black py-[17px]">最新养号方法</p>
        <p class="font-normal">上号前必须关闭手机定位（必须检查手机定位是否关闭检查网络是否有连错。1.快手、抖音、西瓜视频上号后必须刷视频完播率（完播率是指一个视频播放完，必须手动下滑到下一个视频），刷1个小时以上，每天刷两三个小时。第一天不允许修改任何资料，第二天设置一下头像和昵称，并且发一个作品（作品发风景、物品、美食等，禁止发美女和带有色情等违规作品），作品不能频繁发，其它资料再后期一天一天慢慢修改一点。（前三五天每天都要刷一个小时以上，后期可以下班吃饭时间挂着刷直播）前7天不能私聊所以也不要去挂住别人，可以评论和点赞。好养好后每天私聊不能超过3个（并且不能在同一时间新同时新增私聊）。快手抖音上号后需要设置关闭自己喜欢的作品、关闭允许查看关注的人和粉丝。</p>
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
    <div v-else>
      <div class="pl-[20px] flex gap-[40px] w-full overflow-x-scroll items-center  bg-white h-[50px]">
        <button v-if="items[selected[0]]" @click="()=>selectTwo(sindex)" v-for="(sitem, sindex) in items[selected[0]].children" class="shrink-0 px-[30px] py-[3px] rounded-[4px] text-[13px]" :class="{'bg-gradient-to-r from-blue-700 to-blue-400 text-white':selected[1]==sindex}">
          {{ sitem.name }}
        </button>
      </div>
      <div  v-if="!items[selected[0]]||!items[selected[0]].children[selected[1]]" class=" flex justify-center">
        <p class="mt-[57px] font-normal">暂未开放权限</p>
      </div>
      <div v-if="!detail" class="mt-[30px] flex flex-col items-start px-[50px] gap-3 overflow-y-scroll">
        <button  v-if=" items[selected[0]].children[selected[1]]" @click="()=>godetail()" v-for="(titem, tindex) in items[selected[0]].children[selected[1]].children">
          {{(tindex+1)+". "+titem.name }}
        </button>
      </div>
      <div v-if="detail" class="mx-[18px] absolute top-[90px] bottom-0 right-0 left-0 overflow-y-scroll">
        <div v-for="(item,index) in details" class="mt-[13px] cursor-pointer" @click="()=>goSubDetail()">
        <div class="h-[100px] w-full bg-white rounded-[9px] px-[14px] py-[13px] relative">
          <div class="w-[228px]">
            <p class="font-normal mb-[13px]">最新养号方法</p>
            <p class="font-normal text-[12px]">上号前要把定位关闭，IG份额我还哦IG何物很尬iu额好哇...</p>
          </div>
          <img src='https://i.ibb.co/Xjwh9Rv/3.png' class="absolute w-[63px] h-[77px] top-[12px] right-[12px]" >
        </div>
        <div class="flex justify-end gap-[30px] items-center pt-[13px] text-[12px] text-[#969696]">
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
    </div>

  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft,BIconChatDots, BIconEye } from 'bootstrap-icons-vue';
import axios from 'axios'

export default defineComponent({
  name: 'training',
  components: {
    BIconChatDots,
    BIconChevronLeft,
    BIconEye
  },
  data: () => ({
    items:[
      {
        id:1,
        name:'养号',
        children:[
          {
            id:11,
            name:'方法',
            children:[
              {
                id:111,
                name:'关注/持续评论',
                
                children: null,
              },
              {
                id:112,
                name:'把自己的可见作品包装好（需要检查）',
                children: null,
              }
            ]
          },
          {
            id:12,
            name:'目标',
            children:[
              {
                id:121,
                name:'咨询对方专业问题',
                children: null,
              },
              {
                id:122,
                name:'说对方像自己朋友',
                children: null,
              }
            ]
          }
        ]
      },
      {
        id:2,
        name:'加粉',children:[
          {
            id:21,
            name:'方法',
            children:[
              {
                id:211,
                name:'关注/持续评论',
                children: null,
              },
              {
                id:212,
                name:'把自己的可见作品包装好（需要检查）',
                children: null,
              }
            ]
          },
          {
            id:22,
            name:'目标',
            children:[
              {
                id:221,
                name:'咨询对方专业问题',
                children: null,
              },
              {
                id:222,
                name:'说对方像自己朋友',
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
    selected:[0,0],
    details:Array(10).fill(1),
    detail:false,
    subdetail:false,
  }),
  mounted(){
  },
  methods: {
    godetail(){
      this.detail=true;
    },
    goSubDetail(){
      this.subdetail=true;
    },
    selectOne(index){
      this.selected[0]=index;
      this.selected[1]=0;
      this.subdetail=false;
      this.detail=false;
    },
    selectTwo(index){
      this.selected[1]=index;
      this.subdetail=false;
      this.detail=false;
    },
    goBack(){
      this.subdetail=false;
    },
    goBackTwo(){
      this.detail=false;
      this.subdetail=false;
    }
  }
})
</script>
