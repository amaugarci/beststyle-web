<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
      <!-- header -->
      <div class="h-[2.5rem] w-full text-center  pl-[10px] py-[8px]">
        <div>订单记录</div>
      </div>
      <div class="p-3 text-[1rem]">
        <table class="table table-hover table-sm mb-0">
          <thead>
            <tr class="whitespace-nowrap text-[10px] md:text-[14px]">
              <th>商品</th>
              <th>方向</th>
              <th>买入金额</th>
              <th>买后余额</th>
              <th>建仓价格</th>
              <th>平仓价格</th>
              <th>平仓时间</th>
              <th>结果</th>
            </tr>
          </thead>
          <tbody id="GoodsList">
            <tr class="text-[10px] md:text-[14px]" v-for="(item,index) in orders" :key="item.id">
              <th>{{item.symbol.name}}</th>
              <th v-if="item.dir" class="textDanger">买涨</th>
              <th v-else class="textSuccess">买跌</th>
              <th>{{item.money}}</th>
              <th>{{Number(item.totalBalance)-Number(item.money)}}</th>
              <th class="textSuccess">{{item.price}}</th>
              <th v-if="item.lastprice!='-'"  class="textDanger">{{Number(item.lastprice).toFixed(2)}}</th>
              <th v-else class="">-</th>
              <th>{{moment().utc(new Date(Number(item.lasttime))).local().format("MM-DD hh:mm:ss") }}</th>
              <th v-if="item.status==1&&item.during==180" class="textDanger">-{{0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[0])}}</th>
              <th v-else-if="item.status==1&&item.during==300" class="textDanger">-{{0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[1])}}</th>
              <th v-else-if="item.status==2&&item.during==600" class="textDanger">-{{0.01*Number(item.money)*Number(item.symbol.lossRatio.split(',')[2])}}</th>
              <th v-else-if="item.status==2&&item.during==180" class="textSuccess">{{0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[0])}}</th>
              <th v-else-if="item.status==2&&item.during==300" class="textSuccess">{{0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[1])}}</th>
              <th v-else-if="item.status==2&&item.during==600" class="textSuccess">{{0.01*Number(item.money)*Number(item.symbol.profitRatio.split(',')[2])}}</th>
              <th v-else-if="item.status==3" class="textSuccess">0</th>
              <th v-else>-</th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconHouseFill,BIconClockHistory,BIconChatSquareDots,BIconCalendar4Range,BIconPersonCircle } from 'bootstrap-icons-vue';
import axios from 'axios'
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