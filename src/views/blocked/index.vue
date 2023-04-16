<template v-if="true">
  <div class="flex items-center justify-center flex-col min-h-screen">
    <p class="text-[30px] mb-[80px]">{{ getIp }}不允许</p>
    <button @click="()=>{$router.push({name:'login'})}" class="px-[10px] shrink-0 py-[3px] rounded-full text-[13px] bg-gradient-to-r from-blue-700 to-blue-400 text-white">
      回登录
    </button>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'

export default defineComponent({
  name: 'blocked',
  components: {
  },
  computed: {
      ...mapState(useAuthStore, ['getIp']),
  },
})
</script>