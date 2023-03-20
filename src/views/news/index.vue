<template>
  <div class="absolute top-0 left-0 right-0 flex flex-col">
    <!-- header -->
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left absolute">
        <BIconPersonCircle @click="back" class="text-[1.3rem] cursor-pointer mt-[3px]" />
      </div>
      <div class="font-black text-white">{{ $t('newannouncement') }}</div>
    </div>
    <!-- body -->
    <div class="overflow-y-auto overflow-x-hidden h-full">
      <div v-if="!announcement||announcement.length==0" class="flex items-center justify-center mt-[20px] text-[0.7rem]">
        {{ $t('noannouncement') }}
        </div>
      <ul v-for="(item,index) in announcement" :key="index" class="rounded-0 flex flex-col pl-0 mb-0 mt-4">
        <li @click="showdialog(index)" class="flex items-center justify-between bg-[#1f2029] cursor-pointer text-[#ddd] border-[1px] border-[#1f2029] p-[0.75rem]" >
         <div> {{item.title}}</div>
         <div> {{moment().utc(new Date(item.updated_at)).local().format("yyyy-MM-DD hh:mm:ss") }}</div>
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
import axios from 'axios'
import moment from 'moment'
export default defineComponent({
  name: 'news',
  components: {
    BIconPersonCircle
  },
  data: () => ({
    announcement:null,
  }),
  mounted(){
    this.getAnnouncement();
  },
  methods: {
    moment: function () {
      return moment;
    },
    back() {
      this.$router.push({ name: 'me' });
    },
    async getAnnouncement() {
      try {
        const response = await axios.get('/announcement');
        this.announcement = response.data.announcement;
      }
      catch (error) {
        console.log(error);
      };
    },
    showdialog(index){
      layer.open({
        title:false,
        content: this.announcement[index].description,
        btn:this.$t('ok'),
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
      });
    }
  }
})
</script>
<style>

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