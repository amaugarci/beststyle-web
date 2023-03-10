<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">充值记录</div>
    </div>
        <!-- body -->
    <div class="p-3 text-[1rem]">
      <div v-if="!recharges.length" class="flex items-center justify-center mt-[20px] text-[0.7rem]">
          暂⽆订单
        </div>
      <div class="flex flex-col bg-[#32373A] p-5 gap-2 rounded my-[15px]" v-for="(item,index) in recharges" :key="item.id">
        <div class="flex justify-between items-center">
          <div>{{item.player.bank.name}}</div>
          <div class="text-green-500">{{item.player.bank.address}}</div>
        </div>
        <div class="flex justify-between items-center">
          <div>
            充值金额: {{item.amount}}
          </div>
          <div>
            充值后金额: {{Number(item.lastprice)+Number(item.amount)}}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div >
            充值时间: {{moment().utc(new Date(item.created_at)).local().format("MM-DD hh:mm") }}
          </div>
          <div v-if="item.status==1"  class="textDanger">状态: 拒绝</div>
          <div v-else-if="item.status==2&&item.status==4"  class="textSuccess">状态: 已通过</div>
          <div v-else class="">状态: 待办的</div>
        </div>
        
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
import './app.css'

export default defineComponent({
  name: 'rechargehistory',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    recharges:null
  }),
  mounted(){
    this.getRecharge();
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getRecharge() {
      try {
        const response = await axios.get('/recharge');
        this.recharges = response.data.recharges;
      }
      catch (error) {
        console.log(error);
      };
    },
    back() {
      this.$router.push({ name: 'me' });
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