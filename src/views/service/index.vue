<template>
    <div>
        Service
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
import { BIconHouseFill,BIconClockHistory,BIconChatSquareDots,BIconCalendar4Range,BIconPersonCircle } from 'bootstrap-icons-vue';

export default defineComponent({
  name: 'service',
  components: {
    BIconHouseFill,
    BIconClockHistory,
    BIconChatSquareDots,
    BIconCalendar4Range,
    BIconPersonCircle,
  },
  data:()=>({
        checked:true,
        
    }),
  methods:{
  }
})
</script>