<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div>新闻公告</div>
    </div>
    <!-- body -->
    <div class="overflow-y-auto overflow-x-hidden h-full">
      <ul v-for="(item,index) in news" :key="index" class="rounded-0 flex flex-col pl-0 mb-0 mt-4">
        <li @click="showdialog(index)" class="bg-[#1f2029] cursor-pointer text-[#ddd] border-[1px] border-[#1f2029] p-[0.75rem]" >
          {{item}}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
layer.config({
  skin: 'news-class'
})
import { defineComponent } from 'vue'
import { BIconPersonCircle } from 'bootstrap-icons-vue';
export default defineComponent({
  name: 'news',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    news:[
      'Assure联合40多家项目方80家KOL共同推出了“Gas Free NFT"，持有NFT，即可免链上Gas，诚意满满，掷地有声，在整个区块链行业引起了不小的震动。',
      'Assure联合40多家项目方80家KOL共同推出了“Gas Free NFT"，持有NFT，即可免链上Gas，诚意满满，掷地有声，在整个区块链行业引起了不小的震动。',
      'Assure联合40多家项目方80家KOL共同推出了“Gas Free NFT"，持有NFT，即可免链上Gas，诚意满满，掷地有声，在整个区块链行业引起了不小的震动。'
    ]
  }),
  methods: {
    back() {
      this.$router.push({ name: 'me' });
    },
    showdialog(index){
      layer.open({
        title:false,
        content: this.news[index],
        btn:'确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,

      });
    }
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
body .news-class{ border-radius: 5px; width: 90%; max-width: 640px; }
body .news-class .layui-layer-content{ color:#000}
body .news-class .layui-layer-btn{ padding: 0px;height:50px}
body .news-class .layui-layer-btn .layui-layer-btn0{display: flex; align-items: center; justify-content: center;  background-color: #F2F2F2;border:none;margin:0px; border-top: 1px solid #D0D0D0; color: #40AFFE; width: 100%; height: 100%;}
* {
  box-sizing: border-box;
}</style>