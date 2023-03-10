<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconChevronLeft @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div  class="font-black text-white">资讯</div>
    </div>
    <!-- listview -->
  <div class="overflow-y-auto overflow-x-hidden h-full p-[1rem]">
    <div v-if="!news.length" class="flex items-center justify-center mt-[20px] text-[0.7rem]">
          暂⽆订单
        </div>
    <div v-for="(item,index) in news" :key="item.id">
      <div class="border-[1px] border-[#1f2029]" >
          <div class="bg-[#1f2029] p-[0.75rem] text-[#999]">
            {{moment().utc(new Date(item.updated_at)).local().format("yyyy-MM-DD hh:mm:ss") }}
          </div>
          <div class="p-[1rem]">
            <div class="text-[#ccc] pb-[0.7rem]">{{ item.title }}</div>
            <div class="text-[0.75rem] text-justify	w-full text-ellipsis overflow-hidden" :class="{scrollup:!downs[index],scrolldown:downs[index]}">
              {{ item.description }}
            </div>
            <div @click="down(index)" class="text-center p-[0.1rem] text-[0.7rem] text-[#999] mt-[3px] cursor-pointer">
              查看更多
              <BIconCaretDownFill v-if="downs[index]" class="inline-block mb-[3px]"/>
              <BIconCaretUpFill v-else class="inline-block mb-[3px]"/>
            </div>
          </div>
      </div>
    </div>
  </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import {BIconChevronLeft,BIconCaretDownFill,BIconCaretUpFill } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'Information',
  components: {
    BIconChevronLeft,
    BIconCaretDownFill,
    BIconCaretUpFill
  },
  data: () => ({
    news:[
    ],
    downs:[]
  }),
  mounted(){
    this.getNews();
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getNews() {
      try {
        const response = await axios.get('/news');
        this.news = response.data.news;
        this.news.forEach(item => {
          this.downs.push(true);
        });
      }
      catch (error) {
        console.log(error);
      };
    },
    back() {
      this.$router.push({ name: 'me' });
    },
    down(index) {
      this.downs[index]=!this.downs[index];
    },
  }
})
</script>
<style>
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