<template>
  <div>
    <img src="assets/bg/bg2.png"  class="w-full h-[48px]">
    <div class="flex flex-row h-[39px] items-center justify-between px-[19px]">
      <div class="flex flex-row">
        <p class="text-[14px] font-semibold text-[#101010]">ID：</p>
        <p class="text-[14px] font-semibold text-[#101010] ml-[2px]">{{ userId }}</p>
      </div>
      <button @click="goUserPage" class="bg-gradient-to-r from-blue-700 to-blue-400 px-[10px] py-[3px] rounded-full text-white text-[13px]">
        我的发布
      </button>
    </div>
    <div class="flex w-full justify-around items-center text-[14px]  bg-white border-b-[1px] h-[40px] font-black border-[#817b7b]">
        <router-link to="training"  class=" text-center mt-[0.9rem] " active-class="active">
            <p class="px-[2px]">培训中心</p>
        </router-link>
        <router-link to="check"  class=" text-center mt-[0.9rem] " active-class="active">
            <p class="px-[2px]">客户查重</p>
        </router-link>
        <router-link to="material"  class=" text-center mt-[0.9rem] " active-class="active">
            <p class="px-[2px]">素材中心</p>
        </router-link>
        <router-link to="character"  class=" text-center mt-[0.9rem] " active-class="active">
            <p class="px-[2px]">人物包装</p>
        </router-link>
    </div>
    <div>
        <router-view :key="selectedLanguage"/>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconAlarm, BIconHouseFill,BIconClockHistory,BIconChatSquareDots,BIconCalendar4Range,BIconPersonCircle } from 'bootstrap-icons-vue';
import Content from './components/Content/index.vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'
import axios from 'axios'

export default defineComponent({
  name: 'layout',
  metaInfo: {
    title: 'My New Site Title'
  },
  components: {
    BIconHouseFill,
    BIconAlarm,
    BIconClockHistory,
    BIconChatSquareDots,
    BIconCalendar4Range,
    BIconPersonCircle,
    Content
  },
  data:()=>({
    userId:'tmxk0001'
  }),
  computed: {
  },
  mounted(){
  },
  methods:{
    goUserPage(){
      this.$router.push({ name: 'usertraining' })
    }
  }
});
</script>