<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
      <!-- header -->
      <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
        <div class="font-black text-white">订单记录</div>
      </div>
      <div class="p-3 text-[1rem]">
        <div v-if="!orders||orders.length==0" class="flex items-center justify-center mt-[20px] text-[0.7rem]">
          暂⽆订单
        </div>
        <div v-for="(item,index) in orders" :key="item.id" class="flex flex-col bg-[#32373A] p-5 gap-2 rounded my-[15px]">
          <div class="flex justify-between items-center">
            <div>{{item.symbol.displayName}} [<span v-if="item.dir" class="textDanger"> 买涨 </span> <span v-else class="textSuccess"> 买跌 </span>]</div>
            <div  v-if="item.status==0" class="text-red-500">未平仓</div>
            <div  v-else class="text-green-500">已平仓</div>
          </div>
          <div class="flex justify-between items-center">
            <div>
              买入金额: {{item.money}}
            </div>
            <div>
              盈亏:
              <span v-if="item.status==1&&item.during==180" class="textDanger"> -{{Number(0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[0])).toFixed(2)}}</span>
              <span v-else-if="item.status==1&&item.during==300" class="textDanger"> -{{Number(0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[1])).toFixed(2)}}</span>
              <span v-else-if="item.status==2&&item.during==600" class="textDanger"> -{{Number(0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[2])).toFixed(2)}}</span>
              <span v-else-if="item.status==2&&item.during==180" class="textSuccess"> {{Number(0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[0])).toFixed(2)}}</span>
              <span v-else-if="item.status==2&&item.during==300" class="textSuccess"> {{Number(0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[1])).toFixed(2)}}</span>
              <span v-else-if="item.status==2&&item.during==600" class="textSuccess"> {{Number(0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[2])).toFixed(2)}}</span>
              <span v-else-if="item.status==3" class="textSuccess">0</span>
              <span v-else>-</span>
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div  v-if="item.lastprice!='-'">
              建仓价格: {{item.price}} - {{Number(item.lastprice).toFixed(2)}}
            </div>
            <div  v-else>
              建仓价格: {{item.price}} - ?
            </div>
            <div>
              收费: {{getSystem.bettingPercent}}
            </div>
          </div>
          <div class="flex justify-between items-center">
            <div >
              建仓时间: {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD hh:mm:ss") }}
            </div>

          </div>
        </div>
      </div>
    </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconHouseFill,BIconClockHistory,BIconChatSquareDots,BIconCalendar4Range,BIconPersonCircle } from 'bootstrap-icons-vue';
import axios from 'axios'
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import moment from 'moment'
import './app.css'
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
    orders:null
  }),
  mounted(){
    this.getOrders();
  },
  computed: {
    ...mapState(useAuthStore, ['getSystem']),
  },
  methods:{
    moment: function () {
      return moment;
    },
    async getOrders() {
      try {
        const response = await axios.get('/orders');
        this.orders = response.data.orders;
      }
      catch (error) {
        console.log(error);
      };
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