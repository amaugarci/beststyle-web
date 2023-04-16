<template>
    <select class="form-control w-[100px] h-[41px] border-0 text-[14px]" style="border-radius: 0px;" :value="group" @change="onChnage" :class="{'text-[#9CA3AF]':group==''}" >
        <option class="default" value="" selected>{{placeholder}}</option>
        <option v-for="(item, index) in groups" :key="item.id" :value="item.id" >{{item.name}}</option>
    </select>
</template>
  
<script>

export default {
    name:'SelectBox',
    props: {
        placeholder:String,
        groups:Array,
        group:String

    },
    components: {
    },
    data() {
    },
    methods: {
        onChnage(event) {
            this.$emit('onchange', event.target.value);
        }
    }
};
</script>