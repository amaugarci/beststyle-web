<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div>提现记录</div>
    </div>
    <!-- body -->
    <div class="p-3 text-[1rem]">
      <table class="table table-hover table-sm mb-0">
        <thead>
          <tr class="whitespace-nowrap text-[10px] md:text-[14px]">
            <th>帐户ID</th>
            <th>金额</th>
            <th>提现后余额</th>
            <th>时间</th>
            <th>状态</th>
          </tr>
        </thead>
        <tbody id="GoodsList">
          <tr class="text-[10px] md:text-[14px]" v-for="(item,index) in withdrawals" :key="item.id">
            <th>{{item.player.bank.name}}</th>
            <th>{{item.amount}}</th>
            <th>{{Number(item.lastprice)-Number(item.amount)*(1+Number(getSystem.withdrawPercent)/100)}}</th>
            <th>{{moment().utc(new Date(item.created_at)).local().format("MM-DD hh:mm") }}</th>
            <th v-if="item.status==1"  class="textDanger">拒绝</th>
            <th v-else-if="item.status==2"  class="textSuccess">已通过</th>
            <th v-else class="">待办的</th>
          </tr>
        </tbody>
      </table>
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