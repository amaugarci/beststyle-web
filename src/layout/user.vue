<template>
  <div>
    <div class="fixed w-full z-[9999] bg-white">
      <img src="/assets/bg/bg2.png"  class="w-full h-[48px]">
      <div class="flex flex-row h-[39px] items-center px-[19px]" >
        <BIconChevronLeft @click="back()" class="cursor-pointer"/>  
        <p @click="back()" class="text-[14px] font-semibold text-[#101010] pl-[2px] cursor-pointer">返回主页</p>
      </div>
      <div class="flex w-full justify-around items-center text-[14px]  bg-white border-b-[1px] h-[40px] font-black border-[#817b7b]">
          <router-link to="usertraining"  class=" text-center mt-[0.9rem] " active-class="active">
              <p class="px-[2px]">培训中心</p>
          </router-link>
          <router-link to="usercheck"  class=" text-center mt-[0.9rem] " active-class="active">
              <p class="px-[2px]">客户查重</p>
          </router-link>
          <router-link to="usermaterial"  class=" text-center mt-[0.9rem] " active-class="active">
              <p class="px-[2px]">素材中心</p>
          </router-link>
          <router-link to="usercharacter"  class=" text-center mt-[0.9rem] " active-class="active">
              <p class="px-[2px]">人物包装</p>
          </router-link>
      </div>
    </div>
    <div>
        <router-view :key="selectedLanguage"/>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import {BIconChevronLeft  } from 'bootstrap-icons-vue';
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
    BIconChevronLeft,
    Content
  },
  data:()=>({
  }),
  computed: {
  },
  mounted(){
  },
  methods:{
    back(){
      this.$router.push({ name: 'training' })
    }
  }
});
</script>