<template>
  <div class="absolute top-0 left-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left absolute">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">交易记录</div>
    </div>
    <!-- tab bar -->
    <div class="flex justify-around  bg-[#524848] h-[50px] items-center">
      <div class="h-[50px] flex items-center  border-x-0 border-t-0  border-indigo-500 border" :class="{'border-b-2':index==0,'border-b-0':index!=0}">
        <p class="p-1" @click="changeIndex(0)">全部</p>
      </div>
      <div class="h-[50px] flex items-center border-x-0 border-t-0  border-indigo-500 border" :class="{'border-b-2':index==1,'border-b-0':index!=1}">
        <p class="p-1" @click="changeIndex(1)">订单</p>
      </div>
      <div class="h-[50px] flex items-center border-x-0 border-t-0  border-indigo-500 border" :class="{'border-b-2':index==2,'border-b-0':index!=2}">
        <p class="p-1" @click="changeIndex(2)">充值</p>
      </div>
      <div class="h-[50px] flex items-center border-x-0 border-t-0  border-indigo-500 border" :class="{'border-b-2':index==3,'border-b-0':index!=3}">
        <p class="p-1" @click="changeIndex(3)">提现</p>
      </div>
    </div>
        <!-- body -->
    <div class="p-3 text-[1rem]">
      <div v-if="!histories||histories.length==0" class="flex items-center justify-center mt-[20px] text-[0.7rem]">
          暂⽆交易
        </div>
      <div class="flex flex-col bg-[#32373A] p-5 gap-2 rounded my-[15px]" v-for="(item,index) in histories" :key="item.id">
        <div class="flex justify-between items-center">
          <div v-if="item.type==3">
            订单
          </div>
          <div v-else-if="item.type>3&&item.type<7">
            结算
          </div>
          <div v-else-if="item.type==7">
            充值
          </div>
          <div v-else-if="item.type==8">
            管理员充值
          </div>
          <div v-else-if="item.type==9">
            管理员提现
          </div>
          <div v-else-if="item.type==10">
            活动赠送
          </div>
          <div v-else-if="item.type==2" class="textDanger">
            提现
          </div>
          <div v-else>
            提现
          </div>
          <div v-if="item.type==1||item.type==3||item.type==9" class="textDanger">
            -{{ Math.abs(Number(item.changebalance)) }}
          </div>
          <div v-else class="textSuccess">
            +{{ Math.abs(Number(item.changebalance)) }}
          </div>
        </div>
        <div class="flex justify-between items-center">
          <div >
            {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD hh:mm") }}
          </div>
          <div>余额: {{ item.lastbalance }}</div>
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
  name: 'transaction',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    index:0,
    histories:null
  }),
  mounted(){
    this.getTransaction();
  },
  methods: {
    moment: function () {
      return moment;
    },
    changeIndex(index){
      this.index=index;
      this.histories=null;
      this.getTransaction();
    },
    async getTransaction() {
      try {
        const response = await axios.get(`transaction/${this.index}`);
        this.histories = response.data.histories;
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