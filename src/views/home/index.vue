<template>
  <div class="bg-[#1f2029] absolute top-0 left-0 right-0 flex flex-col min-h-screen">
     <!-- slider -->
    <swiper
      class="max-h-[320px] w-full swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events"
      :loop="true" 
      :pagination="{
        clickable: true,
      }" 
      :navigation="true" 
      :autoplay='{
        "delay": 2500,
        "disableOnInteraction": true
      }'
    >
      <swiper-slide><img src="/img/index-01.png" class="w-full" data-xblocker="passed"
          style="visibility: visible;"></swiper-slide>
      <swiper-slide><img src="/img/index-03.jpg" class="w-full" data-xblocker="passed"
          style="visibility: visible;"></swiper-slide>
      <swiper-slide><img src="/img/index-02.png" class="w-full" data-xblocker="passed"
          style="visibility: visible;"></swiper-slide>
    </swiper>
    <!-- news -->
    <div>
      <div class="flex p-2 " style="background-color: #1f2029; ">
        <div class="h-[1.2rem] border-r-[1px] border-[#333] pr-[.5rem]"> <img class="h-[1.2rem]" src="/img/notice.png">
        </div>
        <div class="grow relative overflow-hidden h-[1.2rem] flex">
          <ul id="indexNoticeList" :class="{trans1:timer%4==0,trans2:timer%4==1,trans3:timer%4==2,trans4:timer%4==3}">
            <li @click="goNews" class="h-[1.2rem] ml-[.3rem] overflow-hidden text-ellipsis max-w-[200px] text-[.8rem] trans whitespace-nowrap cursor-pointer" >{{ news }}</li>
          </ul>
          <BIconChevronRight class="inline-block ml-auto cursor-pointer" />
        </div>
        <div class="clearfix"></div>
      </div>
    </div>
    <!-- title -->
    <div class="bg-[#2b2f3e]">
      <div class="flex py-2 px-3">
        <div class="grow"><small>热门产品</small></div>
        <div><small>最新</small></div>
      </div>
    </div>
    <div class="block" v-for="(item,index) in symbols" :key="item.id">
      <div @click="tradeDetail(item.id)" data-rands="0.1" class="flex p-[0.5rem] items-center relative border-b-[1px] border-[#333] bg-[#qf2029]">
        <div class="pr-[0.5rem]">
        </div>
        <div class="flex-1 items-center">
          <div class="font-bold">{{item.displayName}}
          </div>
          <div class="text-[.75rem] text-[#7e7e8a]">
            {{item.productName}}
          </div>
        </div>
        <div class="text-right pr-[0.5rem]">
          <!-- <div class="font-normal text-[0.75rem] text-[#999]">
            {{item.uid}}
          </div> -->
          <div class="text-[.75rem] text-[#7e7e8a]">
            H：
            <span class="text-[.75rem] text-[#7e7e8a]">
              {{ item.H }}
            </span>
            L：
            <span class="text-[.75rem] text-[#7e7e8a]">
             {{ item.L }}
            </span>
          </div>
        </div>
        <div class="h-full">
          <span class="inline-block h-[2rem] w-[6rem] text-center leading-8" :class="{sellBg:item.status,buyBg:!item.status}">
            {{ item.price }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronRight } from 'bootstrap-icons-vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import axios from 'axios'
import 'swiper/css';
import SwiperCore, {
  Autoplay,Pagination,Navigation
} from 'swiper/core';
SwiperCore.use([Autoplay,Pagination,Navigation]);

export default defineComponent({
  name: 'home',
  components: {
    Swiper,
    SwiperSlide,
    BIconChevronRight
  },
  data: () => ({
    news: 'Assure联合40多家项目方80家KOL共同推出了“Gas Free NFT"，持有NFT，即可免链上Gas，诚意满满，掷地有声，在整个区块链行业引起了不小的震动。',
    symbols:[],
    connection:[],
    timer : 0,
  }),
  mounted(){
    this.getSymbols();
    setInterval(function(){
        this.timer++;
    }.bind(this),2000);
  },
  methods: {
    goNews(){
      this.$router.push({ name: 'news' })
    },
    async getSymbols(){
      try{
          const response=await axios.get('/symbols');
          this.symbols=response.data.symbols;
          this.createSocket();
      }
      catch(error) {
        console.log(error);
      };
    },
    
    listenSocket(i, name){
      // console.log(import.meta.env.VITE_BINANCE_SOCKET);
      let connection = new WebSocket(`${import.meta.env.VITE_BINANCE_SOCKET+name.toLowerCase()}@aggTrade`);
      connection.onmessage = (event)=>{
        let price=JSON.parse(event.data)['p'];
        if(this.symbols[i]['price']>Number(price)){
          this.symbols[i]['status']=false;
        }else{
          this.symbols[i]['status']=true;
        }
        this.symbols[i]['price']=price.slice(0,8);
      }
      return connection;
    },
    createSocket(){
      for(let i=0;i<this.symbols.length;i++){
        // console.log(i);
        this.connection.push(this.listenSocket(i, this.symbols[i]['symbol']))
      }
    },
    tradeDetail(id){
      this.$router.push({ name: 'symbol', params: { id:id, }});
    }
  }
})
</script>

<style>
body {
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
.sellBg{
  background-color: #e91c41;
}
.buyBg{
  background-color: #40d090;
}
.trans1{
  transition-duration: 2000ms; transform: translate3d(0rem, 1.2rem, 0rem);
}
.trans2{
  transition-duration: 2000ms; transform: translate3d(0rem, 0.0rem, 0rem);
}
.trans3{
  transition-duration: 2000ms; transform: translate3d(0rem, -1.2rem, 0rem);
}
.trans4{
  transform: translate3d(0rem, -1.2rem, 0rem);
  display: none;
}
*{
  box-sizing: border-box;
}</style>