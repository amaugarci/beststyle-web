<template>
  <div class="absolute top-0 left-0 bottom-0 right-0 flex flex-col">
    <div class="h-[2.5rem] w-full text-center bg-[#1f2029] pl-[10px] py-[8px]">
      <div class="float-left">
        <BIconChevronLeft class="text-[1.3rem] cursor-pointer mt-[3px]"/>
      </div>
      <div>资讯</div>
    </div>
  </div>
</template>


<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft } from 'bootstrap-icons-vue';
export default defineComponent({
  name: 'Information',
  components: {
    BIconChevronLeft
  },
  data: () => ({
    checked: true,

  }),
  methods: {
  }
})
</script>
<style>
body {
  background-color: #2b2f3e;
  color: #eee;
}
*{
  box-sizing: border-box;
}
</style>