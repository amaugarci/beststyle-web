<template>
  <div>
    <div>
        <div class="absolute top-[6px] right-[15px] z-[9999]">
          <select class="block px-[3px] py-[1px] appearance-none text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm w-15  focus:outline-none focus:ring-primary-500 focus:border-primary-500" v-model="selectedLanguage" @change="changeLanguage">
              <option v-for="language in availableLanguages" :value="language">{{ language }}</option>
          </select>
        </div>
        <router-view />
    </div>
    <div class="flex fixed w-full bottom-0 bg-[#1f2029] h-[3.5rem] z-[9999] text-[#ffeba7] border-t-[1px] border-[#333]">
        <router-link to="home"  class="grow text-center text-[.7rem] mt-[0.5rem]" active-class="active">
            <BIconHouseFill class="mx-[auto] text-[25px] mb-[3px]"/>
            <p>{{ $t('home') }}</p>
        </router-link>
        <router-link to="position" class="grow text-center text-[.7rem] mt-[0.5rem]" active-class="active">
            <BIconCalendar4Range class="mx-[auto] text-[25px] mb-[3px]"/>
            <p>{{ $t('position') }}</p>
        </router-link>
        <router-link to="service"  class="grow text-center text-[.7rem] mt-[0.5rem]" active-class="active">
            <BIconChatSquareDots class="mx-[auto] text-[25px] mb-[3px]"/>
            <p>{{ $t('service') }}</p>
        </router-link>
        <router-link to="information" class="grow text-center text-[.7rem] mt-[0.5rem]" active-class="active">
            <BIconAlarm class="mx-[auto] text-[25px] mb-[3px]"/>
            <p>{{ $t('news') }}</p>
        </router-link>
        <router-link to="me" class="grow text-center text-[.7rem] mt-[0.5rem]" active-class="active">
            <BIconPersonCircle class="mx-[auto] text-[25px] mb-[3px]"/>
            <p>{{ $t('profile') }}</p>
        </router-link>
    </div>
  </div>
</template>

<style>
.index-menu div {
  flex-grow: 1;
  text-align: center;
  font-size: .7rem;
}
</style>

<script>

import { defineComponent } from 'vue'
import {BIconAlarm, BIconHouseFill,BIconClockHistory,BIconChatSquareDots,BIconCalendar4Range,BIconPersonCircle } from 'bootstrap-icons-vue';
import Content from './components/Content/index.vue';
import {useAuthStore} from '@/pinia/modules/useAuthStore';
import { mapState,mapActions  } from 'pinia'

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
    availableLanguages: [],
    selectedLanguage: '',
  }),
  computed: {
    ...mapState(useAuthStore, ['getSystem']),
  },
  created() {
    this.availableLanguages = Object.keys(this.$i18n.messages)
    this.selectedLanguage = this.$i18n.locale
  },
  methods:{
    changeLanguage() {
      this.$i18n.locale = this.selectedLanguage
    },
  }
});
</script>

<style>
.active{
  color : #5d7ce2;
}
</style>