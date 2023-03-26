<template>
  <div class="absolute top-0 left-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left absolute">
        <BIconChevronLeft @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">{{ $t('language') }}</div>
    </div>
    <div class="p-5 pb-[50px] text-[1rem]">
      <div class="py-3 flex justify-between items-center" @click="change(2)" >
        <p>简本中文</p>
        <BIconCheck :class="{'hidden':$i18n.locale=='EN'}" class="text-[2rem] cursor-pointer mt-[3px]" fill="#f30000" />
      </div>
      <div class="py-3 flex justify-between items-center" @click="change(1)">
        <p>EngLish</p>
        <BIconCheck  :class="{'hidden':$i18n.locale=='CN'}" class="text-[2rem] cursor-pointer mt-[3px]" fill="#f30000" />
      </div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft, BIconCheck} from 'bootstrap-icons-vue';
import axios from 'axios'
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import moment from 'moment'
import './app.css'
export default defineComponent({
  name: 'position',
  components: {
    BIconCheck,
    BIconChevronLeft
  },
  data:()=>({
  }),
  mounted(){
  },
  computed: {
    ...mapState(useAuthStore, ['getUser']),
  },
  methods:{
    back() {
      this.$router.push({ name: 'me' });
    },
    change(index){
      console.log(index);
      if(index==1){
        this.$i18n.locale = 'EN';
      }else{
        this.$i18n.locale = 'CN';
      }
      axios.defaults.headers['Accept-Language'] = this.$i18n.locale;
      this.setLangauge(index);
    },
    moment: function () {
      return moment;
    },
    async setLangauge(index){
      try{
          const response=await axios.post('/setlang', {
               id:index
          });
      }
      catch(error) {
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