<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconChevronLeft @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div>资讯</div>
    </div>
    <!-- listview -->
  <div class="overflow-y-auto overflow-x-hidden h-full p-[1rem]">
    <div v-for="(item,index) in datas" :key="item.id">
      <div class="border-[1px] border-[#1f2029]" >
          <div class="bg-[#1f2029] p-[0.75rem] text-[#999]">2023-02-24 13:18:11</div>
          <div class="p-[1rem]">
            <div class="text-[#ccc] pb-[0.7rem]">{{ item.title }}</div>
            <div class="text-[0.75rem] text-justify	w-full text-ellipsis overflow-hidden" :class="{scrollup:!item.down,scrolldown:item.down}">
              {{ item.value }}
            </div>
            <div @click="down(index)" class="text-center p-[0.1rem] text-[0.7rem] text-[#999] mt-[3px] cursor-pointer">
              查看更多
              <BIconCaretDownFill v-if="item.down" class="inline-block mb-[3px]"/>
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
import { BIconChevronLeft,BIconCaretDownFill,BIconCaretUpFill } from 'bootstrap-icons-vue';
export default defineComponent({
  name: 'Information',
  components: {
    BIconChevronLeft,
    BIconCaretDownFill,
    BIconCaretUpFill
  },
  data: () => ({
    datas:[
      {
        id:'7421908',
        title:'加密做市商Folkvang因半數股權與FTX掛鉤而損失巨大，但仍計劃繼續運營',
        value:'加密貨幣做市商Folkvang創始人Mike van Rossum針對“FTX倒閉後該公司面臨的現狀”表示：“我們的股權減半，因此失去了很多在2021年取得的收益。這就是風險，但很高興我們還能繼續運營。” Rossum透露該公司一半的股權與FTX掛鉤，並表示：“我們能夠生存下來，但由於我們是非常活躍的借款人，我們不得不自掏腰包償還貸款。” 在FTX上損失了大約50%的交易股權後，Folkvang仍然相信，即使需要5到8年的時間，部分資金將會得到回報。Rossum還稱：“Alameda投資了我們，所以他們在我們的投資表上，我們投資了FTX，所以這一切都是混合在一起了。然後我們把錢放在那裏，所以情況非常混亂。我們在心裏已經把這筆投資減記爲零了。” 據悉，Folkvang在FTX的前50名債權人名單上，在2021年巔峯時期，Folkvang管理約4億美元的資產，包括股權和貸款。在上一個牛市期間，它曾經在一個交易日內完成了80億美元的交易量。',
        down:true
      },
      {
        id:'7421908',
        title:'加密做市商Folkvang因半數股權與FTX掛鉤而損失巨大，但仍計劃繼續運營',
        value:'加密貨幣做市商Folkvang創始人Mike van Rossum針對“FTX倒閉後該公司面臨的現狀”表示：“我們的股權減半，因此失去了很多在2021年取得的收益。這就是風險，但很高興我們還能繼續運營。” Rossum透露該公司一半的股權與FTX掛鉤，並表示：“我們能夠生存下來，但由於我們是非常活躍的借款人，我們不得不自掏腰包償還貸款。” 在FTX上損失了大約50%的交易股權後，Folkvang仍然相信，即使需要5到8年的時間，部分資金將會得到回報。Rossum還稱：“Alameda投資了我們，所以他們在我們的投資表上，我們投資了FTX，所以這一切都是混合在一起了。然後我們把錢放在那裏，所以情況非常混亂。我們在心裏已經把這筆投資減記爲零了。” 據悉，Folkvang在FTX的前50名債權人名單上，在2021年巔峯時期，Folkvang管理約4億美元的資產，包括股權和貸款。在上一個牛市期間，它曾經在一個交易日內完成了80億美元的交易量。',
        down:true
      },
      {
        id:'7421908',
        title:'加密做市商Folkvang因半數股權與FTX掛鉤而損失巨大，但仍計劃繼續運營',
        value:'加密貨幣做市商Folkvang創始人Mike van Rossum針對“FTX倒閉後該公司面臨的現狀”表示：“我們的股權減半，因此失去了很多在2021年取得的收益。這就是風險，但很高興我們還能繼續運營。” Rossum透露該公司一半的股權與FTX掛鉤，並表示：“我們能夠生存下來，但由於我們是非常活躍的借款人，我們不得不自掏腰包償還貸款。” 在FTX上損失了大約50%的交易股權後，Folkvang仍然相信，即使需要5到8年的時間，部分資金將會得到回報。Rossum還稱：“Alameda投資了我們，所以他們在我們的投資表上，我們投資了FTX，所以這一切都是混合在一起了。然後我們把錢放在那裏，所以情況非常混亂。我們在心裏已經把這筆投資減記爲零了。” 據悉，Folkvang在FTX的前50名債權人名單上，在2021年巔峯時期，Folkvang管理約4億美元的資產，包括股權和貸款。在上一個牛市期間，它曾經在一個交易日內完成了80億美元的交易量。',
        down:true
      }
    ]
  }),
  methods: {
    back() {
      this.$router.push({ name: 'me' });
    },
    down(index) {
      this.datas[index].down=!this.datas[index].down;
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