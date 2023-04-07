<template>
  <div class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white h-[60px]">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in items" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected==index}">
        {{ item.name }}
      </button>
    </div>
    <div  class="p-[13px] top-[40px] absolute bottom-0 right-0 left-0 overflow-y-scroll">
        <div  class="mt-[30px] flex flex-col items-start px-[20px] gap-3 overflow-y-scroll">
          <button  v-if=" items[selected].children" @click="()=>godetail()" v-for="(sitem, sindex) in items[selected].children">
            {{(sindex+1)+". "+sitem.name }}
          </button>
        </div>
      </div>
  </div>  
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronRight } from 'bootstrap-icons-vue';
import axios from 'axios'

export default defineComponent({
  name: 'character',
  components: {
  },
  data: () => ({
    items:[
      {
        id:1,
        name:'通用',
        children:[
          {
            id:11,
            name:'关注/持续评论',
            
            children: null,
          },
          {
            id:12,
            name:'把自己的可见作品包装好（需要检查）',
            children: null,
          }
        ]
      },
      {
        id:2,
        name:'李唯艺',
        children:[
              {
                id:21,
                name:'咨询对方专业问题',
                children: null,
              },
              {
                id:22,
                name:'说对方像自己朋友。',
                children: null,
              }
        ]
      },
      {
        id:3,
        name:'杨莎',children:[]
      },
      {
        id:4,
        name:'赵慧敏',children:[]
      }
    ],
    selected:0,
  }),
  mounted(){
  },
  methods: {
    selectOne(index){
      this.selected=index;
    },
    godetail(){
      
    }
  }
})
</script>
