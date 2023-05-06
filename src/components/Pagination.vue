<template>
    <div class="pagination mt-[24px] flex items-center justify-center">
        <!-- <p class="mr-[13px]">共1条</p> -->
        <!-- pagination -->
        <vue-awesome-paginate v-if="index<totalItems"
            :total-items="totalItems"
            v-model="computedcurrentPage"
            :items-per-page="index"
            :max-pages-shown="3"
            paginate-buttons-class="h-[20px] w-[20px] border-none m-[5px] cursor-pointer pagination-bg"
            active-page-class="pagination-active-bg  text-white"
            :on-click="onClick"
        />
    </div>
</template>
  
<script>
import { defineComponent } from 'vue'

export default defineComponent({
    name:'Pagination',
    props: {
        index:Number,
        currentPage:Number,
        totalItems:Number,
    },
    components: {

    },
    computed:{
        computedcurrentPage: {
            get() {
                return this.currentPage;
            },
            set(value) {
            }
        }
    },
    data() {
    },
    methods: {
        onClick(event) {
            this.$emit('onClick', event);
        },
        onchangePage(event) {
            this.$emit('onchangePage', event.target.value);
        },
    }
});
</script>