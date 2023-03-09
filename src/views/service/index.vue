<template>
    <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col bg-[#fff]">
      <!-- header -->
      <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
        <div @click="back" class="float-left">
          <BIconPersonCircle class="text-[1.3rem] cursor-pointer mt-[3px] inline-block mb-[7px]" />
          返回
        </div>
        <div>客服</div>
      </div>
      <!-- body -->
      <iframe v-if="url" src="https://im.8713987.top/im.html#137_cpTO7uZHYzk9W8GR" class="w-full h-full"></iframe>
    </div>
</template>
<script>

import { defineComponent } from 'vue'
import { BIconPersonCircle} from 'bootstrap-icons-vue';
import axios from 'axios'
export default defineComponent({
  name: 'service',
  components: {
    BIconPersonCircle
  },
  data:()=>({
    checked:true,
    url:null
  }),
  mounted(){
    this.getUrl();
  },
  methods:{
    async getUrl() {
      try {
        const response = await axios.get('/url');
        this.url = response.data.url
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

<style>body {
  background-color: #fff;
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