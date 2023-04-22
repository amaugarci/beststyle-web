<template>
  <div v-if="materialgroups.length" class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white h-[40px]">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in materialgroups" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected[0]==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="!detail" class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  h-[40px]">
      <button v-if="materialgroups[selected[0]]" @click="()=>selectTwo(sindex)" v-for="(sitem, sindex) in materialgroups[selected[0]].children"  class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected[1]==sindex}">
        {{ sitem.name }}
      </button>
    </div>
    <div v-if="!detail">
      <div  class="bg-white px-[13px] top-[80px] absolute bottom-0 right-0 left-0 overflow-y-scroll">
        <div  class="mt-[30px] flex flex-col items-start px-[50px] gap-3 overflow-y-scroll">
          <button  v-if=" materialgroups[selected[0]].children[selected[1]]" @click="()=>godetail(titem.id)" v-for="(titem, tindex) in materialgroups[selected[0]].children[selected[1]].children">
            {{(tindex+1)+". "+titem.name }}
          </button>
        </div>
      </div>
    </div>
    <div v-else class="px-[9px]">
      <div  class="flex items-center py-[10px] gap-2 text-[14px] mb-[11px] bg-[#F3F9FF] ">
        <div @click="goBack()" class="flex items-center cursor-pointer">
          <BIconChevronLeft class="text-[15px] " />
          <p class="font-normal">{{ materialgroups[selected[0]].name }}</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px]" />
          <p class="font-normal text-[#0B88F9]">{{ materialgroups[selected[0]].children[selected[1]].name }}</p>
        </div>
      </div>
      <div class="top-[85px] absolute bottom-0 right-0 left-0 overflow-y-scroll grid grid-cols-2 gap-2 px-[9px] text-[14px]">
         <div v-for="(item,index) in materials" class="h-[303px] bg-[white] px-[6px] py-[5px]" @click="()=>{showDetail(index)}">
          <img :src="VITE_BACKEND_URL+item.thumb" class="w-full h-[213px]" >
          <p class="font-normal my-[10px] line-clamp-2">{{item.title}}</p>
          <div class="flex justify-between items-center text-[12px] text-[#969696]">
            <p class="font-normal">{{ item.type==1?'图片':'视频' }}</p>
            <p class="font-normal">
              {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}  
            </p>
            <div class="flex gap-1 items-center text-black">
              <p  class="font-normal cursor-pointer">下载</p>
              <img  src="/assets/icons/download.svg" class="cursor-pointer">
            </div>
          </div>
         </div>
      </div>
    </div>
  </div>
  <div ref="dialog"  class="fixed  z-[99991] top-0 right-0 left-0 bottom-0 bg-[#010101] opacity-75" v-if="showdownload">
  </div>
  <div v-if="showdownload" class="fixed z-[99991] w-[90%] h-[700px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
    <img :src='VITE_BACKEND_URL+materials[material_id].thumb' class="bg-[#FFFFFF] w-full h-[490px]" >
    <div class=" ql-editor w-full font-normal my-[10px] text-white line-clamp-4" style="height: 200px;" v-html="materials[material_id].description" contenteditable="true"></div>
    <div class="flex gap-1 items-center justify-end text-white">
      <p @click="downlodFile" class="font-normal cursor-pointer">下载</p>
      <img @click="downlodFile" src="/assets/icons/wdownload.svg"   class="cursor-pointer">
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft } from 'bootstrap-icons-vue';
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
export default defineComponent({
  name: 'material',
  components: {
    BIconChevronLeft
  },
  data: () => ({
    VITE_BACKEND_URL,
    materialgroups:[],
    showdownload:false,
    material_id:null,
    selected:[0,0],
    detail:false,
    materials:null,
  }),
  mounted() {
    this.getCheckMaterial();
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeRouteLeave(to, from, next) {
    document.removeEventListener('click', this.handleClickOutside);
    next();
  },
  methods: {
    moment: function () {
        return moment;
    },
    async getCheckMaterial() {
      try {
        this.traininggroups=[];
        const response = await axios.get(`/materialgroups`);
        if(response.data.status==1){
          this.materialgroups = response.data.materialgroups;;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    handleClickOutside(event) {
      if(this.showdownload){
        if(this.$refs.dialog.contains(event.target)){
          this.showdownload=false;
        }
      }
    },
    selectOne(index){
      this.selected[0]=index;
      this.selected[1]=0;
      this.detail=false;
    },
    selectTwo(index){
      this.materials=null;
      this.selected[1]=index;
      this.detail=false;
    },
    goBack(){
      this.materials=null;
      this.detail=false;
    },
    godetail(id){
      this.getMaterials(id);
      this.detail=true;
    },
    async getMaterials(group_id) {
      try {
        this.trainings=[];
        const response = await axios.get(`/materials/${group_id}`);
        if(response.data.status==1){
          this.materials = response.data.materials;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    showDetail(index){
      this.material_id=index;
      this.showdownload=true;
    },
    downlodFile(){
      this.showdownload=false;
      const file=this.materials[this.material_id].photo.substring(9);
      this.downloadFile(file);
    },
    downloadFile(fileName) {
      axios.get(`/download/${fileName}`, { responseType: 'blob' })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
    }
  }
})
</script>
