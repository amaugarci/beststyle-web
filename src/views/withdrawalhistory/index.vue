<template>
  <div class="absolute top-0 left-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left absolute">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">提现记录</div>
    </div>
    <!-- body -->
    <div class="p-3 text-[1rem]">
      <div v-if="!withdrawals||withdrawals.length==0" class="flex items-center justify-center mt-[20px] text-[0.7rem]">
          暂⽆提现
      </div>
      <div class="flex flex-col bg-[#32373A] p-5 gap-2 rounded my-[15px]" v-for="(item,index) in withdrawals" :key="item.id">
        <div class="flex justify-between items-center">
          <div v-if="item.bank">{{item.bank.name}}</div>
          <diV v-else>管理员</diV>
          <div v-if="item.bank" class="text-green-500">{{item.bank.address}}</div>
        </div>
        <div class="flex justify-between items-center">
          <div>
            提现金额: {{item.amount}}
          </div>
          <div>
            提现后金额: {{Number(item.lastprice)-Number(item.amount)*(1+Number(getSystem.withdrawPercent)/100)}}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div >
            提现时间: {{moment().utc(new Date(item.created_at)).local().format("MM-DD hh:mm") }}
          </div>
          <div v-if="item.status==1"  class="textDanger">状态: 取消</div>
          <div v-else-if="item.status==2||item.status==4"  class="textSuccess">状态: 已通过</div>
          <div v-else class="">状态: 审核中</div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
import moment from 'moment'
import './app.css'
import { number } from 'echarts';
export default defineComponent({
  name: 'withdrawalhistory',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    withdrawals:null
  }),
  mounted(){
    this.getWithdrawal();
  },
  computed:{
    ...mapState(useAuthStore, ['getUser','getSystem']),
  },
  methods: {
    moment: function () {
      return moment;
    },
    async getWithdrawal() {
      try {
        const response = await axios.get('/withdrawal');
        this.withdrawals = response.data.withdrawals;
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