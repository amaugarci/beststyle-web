<template>
  <div v-if="this.symbol" class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconChevronLeft @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div v-if="symbol">{{ symbol.displayName + ' / ' + symbol.productName }}</div>
    </div>
    <div v-if="symbol">
      <div class="order-price-ex">
        <div class="order-price-now">
          <h3 id="charts-now" :class="{ sellColor: !symbol.status, buyColor: symbol.status  }">{{ symbol.price }}</h3>
          <p id="charts-margin" :class="{ sellColor: !symbol.status, buyColor: symbol.status }">DIFF：{{ symbol.DIFF.toString().slice(0, 6) }}</p>
        </div>
        <div class="order-price-hls">
          <p>H：<span id="charts-highest" class="charts-price">{{ symbol.H }}</span></p>
          <p>L：<span id="charts-lowest" class="charts-price">{{ symbol.L }}</span></p>
          <p>V：<span id="charts-sales" class="charts-price">{{ symbol.V }}</span></p>
        </div>
        <div style="padding-left: 1rem" class="order-price-btn"> 
          <button @click="riseDialog" class="buy-bg order-upbtn" style="margin-bottom: .3rem">买涨</button> 
          <button @click="lowDialog" class="sell-bg order-dowbtn">买跌</button> 
        </div>
      </div>
    </div>
    <div class="buttons-tab flex">
      <span class="tab-link button my-kendtrend">
        <article>
          <span @click="changeType(1)" :class="{ active: type == 1 }" data-ctype="k">
            K线
          </span>
          <span @click="changeType(2)" data-ctype="l" :class="{ active: type == 2 }">
            走势
          </span>
        </article>
      </span>
      <span @click="changePeriod('1m')" class="tab-link button tab-time" :class="{ active: period == '1m' }" data-int="1">
        1M
      </span>
      <span @click="changePeriod('5m')" class="tab-link button tab-time" :class="{ active: period == '5m' }" data-int="5">
        5M
      </span>
      <span @click="changePeriod('15m')" class="tab-link button tab-time" :class="{ active: period == '15m' }"
        data-int="15">
        15M
      </span>
      <span @click="changePeriod('1h')" class="tab-link button tab-time" :class="{ active: period == '1h' }"
        data-int="60">
        1H
      </span>
      <span @click="changePeriod('1d')" class="tab-link button tab-time" :class="{ active: period == '1d' }" data-int="d">
        1D
      </span>
    </div>
    <VueEcharts v-if="option" :option="option" :key="reRender" class="tradingView"></VueEcharts>
    <!-- dialog -->
    <div :class="{block:showDialog}" class="order-setbox-lay" @click="()=>showDialog=false"></div>
    <div  class="order-setbox" :class="{block:showDialog}">
      <header> {{form.title }} <div @click="()=>showDialog=false" class="order-setbox-close">X</div>
      </header>
      <div class="order-setbox-body">
        <p class="order-setbox-title">结算时间</p>
        <div v-if="form.profit" class="order-setbox-settime">
          <div :class="{active:form.time==180}" @click="()=>{form.time=180; form.benefit=0}" data-setime="180" id="GoodsOrderOne">
            <p class="a"><span class="aa">180</span><span class="tiny">秒</span></p>
            <p v-if="form.dir" class="b">盈亏<span class="bb">{{ form.profit[0] }}</span>%</p>
            <p v-else class="b">盈亏<span class="bb">{{ form.loss[0] }}</span>%</p>
          </div>
          <div :class="{active:form.time==300}" @click="()=>{form.time=300;form.benefit=1}" data-setime="300" id="GoodsOrderToo">
            <p class="a"><span class="aa">300</span><span class="tiny">秒</span></p>
            <p v-if="form.dir" class="b">盈亏<span class="bb">{{ form.profit[1] }}</span>%</p>
            <p v-else class="b">盈亏<span class="bb">{{ form.loss[1] }}</span>%</p>
          </div>
          <div :class="{active:form.time==600}" @click="()=>{form.time=600;form.benefit=2}" data-setime="600" id="GoodsOrderThree">
            <p class="a"><span class="aa">600</span><span class="tiny">秒</span></p>
            <p v-if="form.dir" class="b">盈亏<span class="bb">{{ form.profit[2] }}</span>%</p>
            <p v-else class="b">盈亏<span class="bb">{{ form.loss[2] }}</span>%</p>
          </div>
        </div>
        <p class="order-setbox-title">投资金额</p>
        <div class="order-setbox-setmoney">
          <div :class="{active:form.money==1000}" @click="changeMoney(1000)">1000</div>
          <div :class="{active:form.money==5000}" @click="changeMoney(5000)">5000</div>
          <div :class="{active:form.money==10000}" @click="changeMoney(10000)">10000</div>
          <div :class="{active:form.all}" class="all-in" @click="changeMoney(-1)">全部</div>
          <div :class="{active:form.custom}" class="other" @click="changeMoney(-2)">其它</div>
        </div>
        <div class="order-setbox-info">
          <div>余额：<span class="order-user-money">{{ form.money }}</span></div>
          <div style="flex: 1;text-align: center;"> 手续费：
            <span v-if="form.dir" class="buy-color order-fee">
              {{ form.profit[form.benefit] }}
            </span>
            <span v-else class="buy-color order-fee">
              {{ form.profit[form.benefit] }}
            </span>
            % </div>
          <div>实际支付： <span class="buy-color order-truemoney">{{ form.money }}</span> </div>
        </div>
        <table class="order-table">
          <thead>
            <tr class="text-center">
              <th>商品名称</th>
              <th>方向</th>
              <th>现价</th>
              <th>金额</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><span class="goods-order-name">{{ symbol.name + ' / ' + symbol.productName }}</span></td>
              <td class="order-setbox-direction" :class="{ sellColor: !form.dir, buyColor: form.dir }">买涨</td>
              <td class="order-setbox-nowprice" :class="{ sellColor: !symbol.status, buyColor: symbol.status }">{{symbol.price}}</td>
              <td class="order-setbox-money">1000</td>
            </tr>
          </tbody>
        </table> <button @click="orderDialog" class="btn btn-success btn-block btn-sm order-setbox-submit">确认下单</button>
      </div>
    </div>
    <div class="number-keyboard" :class="{block:form.keyboard}">
      <header> 金额：<b class="number-money">{{ form.keyValue }}</b> </header>
      <table class="number-keyboard-table">
        <tbody>
          <tr>
            <td @click="keyPress(1)">1</td>
            <td @click="keyPress(2)">2</td>
            <td @click="keyPress(3)">3</td>
            <td @click="keyPress(-4)">退格</td>
          </tr>
          <tr>
            <td @click="keyPress(4)">4</td>
            <td @click="keyPress(5)">5</td>
            <td @click="keyPress(6)">6</td>
            <td @click="keyPress(-3)">清空</td>
          </tr>
          <tr>
            <td @click="keyPress(7)">7</td>
            <td @click="keyPress(8)">8</td>
            <td @click="keyPress(9)">9</td>
            <td @click="keyPress(-2)">关闭</td>
          </tr>
          <tr>
            <td @click="keyPress(10)">.</td>
            <td @click="keyPress(0)">0</td>
            <td colspan="2" @click="keyPress(-1)">确认</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script>
layer.config({
  skin: 'symbol-class'
})
import { defineComponent, getCurrentInstance } from 'vue'
import { BIconChevronLeft } from 'bootstrap-icons-vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { VueEcharts } from "vue3-echarts";
import * as echarts from 'echarts';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'
import moment from 'moment'
import "echarts/lib/chart/candlestick";
import "echarts/lib/component/title";
import './app.css'
const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
export default defineComponent({
  name: 'symbol',
  components: {
    BIconChevronLeft,
    VueEcharts,
  },
  data() {
    return {
      form:{
        dir:true,
        title:'订单确认',
        time:180,
        benefit:0,
        money:1000,
        keyboard:false,
        custom:false,
        all:false,
        keyValue:'',
        profit:null,
        loss:null,
      },
      socketClose:true,
      showDialog:false,
      connection: null,
      type: 1,
      period: '1m',
      symbol: null,
      dates: [],
      data: [],
      volumes: [],
      option: null,
      reRender: false,
      current: {
        time: null,
        price: 0
      }
    };
  },
  computed:{
    ...mapState(useAuthStore, ['getUser']),
  },
  mounted() {
    this.getCurrentChart(this.$route.params.id);
  },
  methods: {
    calculateMA(dayCount, data) {
      var result = [];
      for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += +data[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    back() {
      this.$router.push({ name: 'home' });
    },
    changePeriod(during) {
      this.period = during;
      this.connection.close();
      this.socketClose=true;
    },
    changeType(type) {
      this.type = type;
      if(type==1){
        this.option.series=[
            {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                color: '#7fbe9e'
              },
              data: this.volumes
            },
            {
              type: 'candlestick',
              name: '日K',
              data: this.data,
              markLine: {
                symbol: ['none'],
                data: [
                  {
                    yAxis: 0,
                    label: {
                      show: true,
                      position: 'end',
                      color: 'red'
                    },
                    lineStyle: {
                      normal: {
                        type: 'dashed',
                        color: 'red',
                      }
                    }
                  }
                ]
              },
              itemStyle: {
                color: '#ef232a',
                color0: '#14b143',
                borderColor: '#ef232a',
                borderColor0: '#14b143'
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: this.calculateMA(5, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: this.calculateMA(10, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: this.calculateMA(20, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: this.calculateMA(30, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            }
          ];
      }else{
        this.option.series = [
        {
          data: [...this.data.map(item => item[0])],
          type: 'line',
          lineStyle: { color: 'yellow' },
          colorBy: 'black',
          areaStyle: {
            color: '#2B2B2B'
          }
        }
      ]
      }
      this.reRender = !this.reRender;
    },
    async getCurrentChart(id) {
      try {
        const response = await axios.get(`/chart/${id}?period=${this.period}`);
        this.symbol = response.data.symbol;
        this.form.profit=[...this.symbol.profitRatio.split(',')];
        this.form.loss=[...this.symbol.lossRatio.split(',')];
        let charts = response.data.charts;
        charts.forEach(element => {
          this.dates.push(moment.utc(new Date(element[0])).local().format('hh:mm'));
          this.data.push([Number(element[1]), Number(element[4]), Number(element[3]), Number(element[2]), Number(element[5])]);
          this.volumes.push(Number(element[5]));
        });
        this.option = {
          animation: false,
          color: colorList,
          barMinWidth: '30%',
          barMaxWidth: '60%',
          xAxis: [
            {
              type: 'category',
              data: this.dates,
              boundaryGap: false,
              axisTick: { show: false },
              axisLine: { lineStyle: { color: '#595959' } },
              // axisLabel: {
              //   formatter: function (value) {
              //     return echarts.format.formatTime('MM-dd', value);
              //   }
              // },
              min: 'dataMin',
              max: 'dataMax',
              axisPointer: {
                show: true
              }
            },
            {
              type: 'category',
              gridIndex: 1,
              data: this.dates,
              boundaryGap: false,
              min: 'dataMin',
              max: 'dataMax',
              splitLine: { show: false },
              axisLabel: { show: false },
              axisTick: { show: false },
              axisLine: { lineStyle: { color: '#777' } },
            }
          ],
          yAxis: [
            {
              position: 'right',
              scale: true,
              splitNumber: 10,
              axisLine: { lineStyle: { color: '#595959' } },
              splitLine: { show: true, lineStyle: { color: '#292929' } },
              axisTick: { show: false },
              axisLabel: {
                inside: false,
                formatter: '{value}\n'
              }
            },
            {
              scale: true,
              gridIndex: 1,
              splitNumber: 2,
              axisLabel: { show: false },
              axisLine: { show: false },
              axisTick: { show: false },
              splitLine: { show: false }
            }
          ],
          grid: [
            {
              left: 20,
              right: 60,
              top: 0,
              height: 600
            },
            {
              left: 20,
              right: 60,
              height: 40,
              top: 630
            }
          ],
          // dataZoom: [
          //   {
          //     type: 'inside',
          //     xAxisIndex: [0, 1],
          //     start: 10,
          //     end: 100
          //   },
          //   {
          //     show: true,
          //     xAxisIndex: [0, 1],
          //     type: 'inside',
          //     bottom: 10,
          //     start: 10,
          //     end: 100
          //   }
          // ],
          series: [
            {
              name: 'Volume',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              itemStyle: {
                color: '#7fbe9e'
              },
              data: this.volumes
            },
            {
              type: 'candlestick',
              name: '日K',
              data: this.data,
              markLine: {
                symbol: ['none'],
                data: [
                  {
                    yAxis: 0,
                    label: {
                      show: true,
                      position: 'end',
                      color: 'red'
                    },
                    lineStyle: {
                      normal: {
                        type: 'dashed',
                        color: 'red',
                      }
                    }
                  }
                ]
              },
              itemStyle: {
                color: '#ef232a',
                color0: '#14b143',
                borderColor: '#ef232a',
                borderColor0: '#14b143'
              }
            },
            {
              name: 'MA5',
              type: 'line',
              data: this.calculateMA(5, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            },
            {
              name: 'MA10',
              type: 'line',
              data: this.calculateMA(10, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            },
            {
              name: 'MA20',
              type: 'line',
              data: this.calculateMA(20, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            },
            {
              name: 'MA30',
              type: 'line',
              data: this.calculateMA(30, this.data),
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 1
              }
            }
          ]
        };
        this.createSocket();
      }
      catch (error) {
        console.log(error);
      };
    },
    createSocket() {
      this.connection = new WebSocket(`${import.meta.env.VITE_BINANCE_SOCKET + this.symbol['symbol'].toLowerCase()}@kline_${this.period}`);
      this.socketClose=false;
      this.connection.onmessage = (event) => {
        let price = JSON.parse(event.data)['k']['c'];
        this.symbol['DIFF'] = (this.symbol['price'] - Number(price));
        if (this.symbol['price'] == 0) {
          this.symbol['DIFF'] = 0.2;
        }
        if (this.symbol['DIFF']) {
          this.symbol['status'] = false;
        } else {
          this.symbol['status'] = true;
        }
        this.symbol['price'] = price.slice(0, 8);
        let value = JSON.parse(event.data)['k'];
        let date = moment.utc(new Date(value['t'])).local().format('hh:mm');
        this.current.price = Number(price);
        this.current.time = JSON.parse(event.data)['E'];
        if (this.type != 2) {
          this.option.series[1].markLine.data[0].yAxis = Number(price);
        }
        if (date == this.dates.slice(-1)) {
          let len = this.dates.length;
          this.dates[len - 1] = date;
          this.data[len - 1] = ([Number(value['o']), Number(value['c']), Number(value['l']), Number(value['h']), Number(value['v'])]);
          this.volumes[len - 1] = (Number(value['v']));
        } else {
          this.dates.push(date);
          this.data.push([Number(value['o']), Number(value['c']), Number(value['l']), Number(value['h']), Number(value['v'])]);
          this.volumes.push(Number(value['v']));
        }
        this.reRender = !this.reRender;
      }
      this.connection.onclose=()=>{
        this.data=[];
        this.dates=[];
        this.volumes=[];
        this.option={};
        this.getCurrentChart(this.$route.params.id);
      }
    },
    riseDialog(){
      this.form.dir=true;
      this.showDialog=true;
    },
    lowDialog(){
      this.form.dir=false;
      this.showDialog=true;
    },
    changeMoney(value){
      switch(value){
        case 1000:this.form.money=1000; this.form.keyboard=false; this.form.custom=false; this.form.all=false; break;
        case 5000:this.form.money=5000; this.form.keyboard=false; this.form.custom=false; this.form.all=false; break;
        case 10000:this.form.money=10000; this.form.keyboard=false; this.form.custom=false; this.form.all=false; break;
        case -1:this.form.money=this.getUser.cash_amount; this.form.keyboard=false; this.form.custom=false; this.form.all=true; break;
        default :this.form.money=0; this.form.custom=true; this.form.keyboard=true; this.form.all=false; break;
      }
    },
    keyPress(val){
      switch(val){
        case -1: this.form.money=Number(this.form.keyValue); this.form.keyboard=false; break;
        case -2: this.form.keyboard=false;   break;
        case -3: this.form.keyValue='';  break;
        case -4: this.form.keyValue=this.form.keyValue.slice(0,-1); break;
        case 10: if(this.form.keyValue.indexOf('.')==-1){this.form.keyValue+='.';}  break;
        default : this.form.keyValue+=val.toString();break;
      }
    },
    orderDialog(){
      layer.config({
        skin: 'symbol-class'
      });
      layer.open({
        title:false,
        content: '请输入金额',
        btn:'确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
        yes :(index, layero)=>{
          layer.close(index);
          this.showDialog=false;
          this.orderApi();
        }
      });
    },
    errorDialog(){
      layer.config({
        skin: 'login-class'
      })
      layer.open({
          type:1,
          offset:'b',
          title:false,
          content: 'Invalid money',
          closeBtn: 0,
          shadeClose:1,
      });
    },
    ...mapActions(useAuthStore, ['changeBalance']),
    async orderApi(){
      if(this.form.money>this.getUser.cash_amount){
        this.errorDialog();
      }
      try{
          const response=await axios.post('/order', {
              symbolid:this.$route.params.id,
              time:this.current.time,
              price:this.current.price,
              dir:this.form.dir,
              during:this.form.time,
              money:this.form.money,
          });
          if(response.data.status==1){
            console.log(response);
            this.changeBalance(this.form.money);
          }
      }
      catch(error) {
          // this.showDialog();
      };
    },
  }
})
</script>
<style>
body {
  background-color: #2b2f3e;
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

* {
  box-sizing: border-box;
}</style>

<style>
  .echarts {
    width: 100%;
    height: 400px;
  }
  #candleChart> :first-child :first-child {
    width: 100% !important;
  }
  #candleChart> :first-child {
    width: 100% !important;
  }
  * {
    box-sizing: border-box;
  }
  body .symbol-class{ border-radius: 5px; width: 90%; max-width: 640px; }
  body .symbol-class .layui-layer-content{ color:#000;text-align: center;}
  body .symbol-class .layui-layer-btn{ padding: 0px;height:50px}
  body .symbol-class .layui-layer-btn .layui-layer-btn0{display: flex; align-items: center; justify-content: center;  background-color: #F2F2F2;border:none;margin:0px; border-top: 1px solid #D0D0D0; color: #40AFFE; width: 100%; height: 100%;}
</style>
