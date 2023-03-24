<template>
  <div>
    <div>
      <div ref="button" class="z-[9999] absolute top-[2px] right-[15px]">
            <button class="text-white bg-[#2b2f3e] border-blue-700 border-2 font-medium rounded-lg text-sm px-2 py-1.5 text-center inline-flex items-center" type="button" @click="()=>expand=!expand">{{selectedLanguage}}</button>
            <!-- Dropdown menu -->
            <div id="dropdown" class="z-10 bg-white divide-y divide-gray-100 rounded-md shadow w-9" :class="{'hidden':!expand}">
                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200" >
                    <li  v-for="(language, index) in availableLanguages"  @click="changeLanguage(language)">
                        <div class="block py-2 hover:bg-gray-200 dark:hover:bg-gray-600 dark:hover:text-white text-center" :class="{'text-white bg-blue-700':language==selectedLanguage}">{{ language }}</div>
                    </li>
                </ul>
            </div>
        </div>
        <router-view :key="selectedLanguage"/>
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
    expand:false,
    availableLanguages: [],
    selectedLanguage: '',
  }),
  computed: {
    ...mapState(useAuthStore, ['getSystem']),
  },
  mounted(){
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
  created() {
    this.availableLanguages = Object.keys(this.$i18n.messages)
    this.selectedLanguage = this.$i18n.locale
  },
  methods:{
    handleClickOutside(event) {
        if (this.$refs.button&&this.$refs.button.contains(event.target)) {
            return;
        }
        this.expand=false;
    },
    changeLanguage(language) {
      this.expand=!this.expand;
      this.$i18n.locale = language;
      this.selectedLanguage=language;
      axios.defaults.headers['Accept-Language'] = language;
    },
  }
});
</script>

<style>
.active{
  color : #5d7ce2;
}
</style>