<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
      <!-- header -->
      <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
        <div>订单记录</div>
      </div>
      <div class="p-3 text-[1rem]">
        暂无记录
      </div>
    </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconHouseFill,BIconClockHistory,BIconChatSquareDots,BIconCalendar4Range,BIconPersonCircle } from 'bootstrap-icons-vue';

export default defineComponent({
  name: 'position',
  components: {
    BIconHouseFill,
    BIconClockHistory,
    BIconChatSquareDots,
    BIconCalendar4Range,
    BIconPersonCircle,
  },
  data:()=>({
        checked:true,
        
    }),
  methods:{
  }
})
</script>

<style>body {
  background-color: #2b2f3e;
  color: #eee;
  line-height: 1.5;
}
.scrolldown{
  max-height: 5.5rem;
  -webkit-line-clamp: 5;
}
.scrollup{
  max-height: unset;
  -webkit-line-clamp: unset;
}

*{
  box-sizing: border-box;
}</style>