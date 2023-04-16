<template>
  <div v-if="charactergroups.length!=0" class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white h-[60px]">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in charactergroups" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="character!=null&&subdetail">
      <div class="flex items-center py-[10px] gap-2 text-[14px]">
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px] cursor-pointer" @click="goBack()"/>
          <p @click="goBack()" class="font-normal">{{ character.character_group.name }}</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px]" />
          <p class="font-normal text-[#0B88F9] w-[100px] truncate">{{ character.title }}</p>
        </div>
      </div>
      <div class="w-full bg-white flex flex-col items-center px-[21px] pb-[20px]">
        <p class="font-black py-[17px]">{{ character.title }}</p>
        <p class="font-normal w-full truncate" v-html="character.description"></p>

        <p class="w-full my-[30px] font-bold">评论</p>
        <div class="mb-[30px] w-full" v-for="(comment, index) in character.comment">
          <div  class="flex flex-row w-full gap-2">
            <p class="shrink-1 font-bold">{{ comment.user.name }}:</p>
            <div class="grow">
              <p class="w-full text-[10px] text-end">{{moment().utc(new Date(comment.updated_at)).local().format("yyyy-MM-DD") }}</p>
              <p class="w-full">{{ comment.comment }}</p>
            </div>
          </div>
        </div>
        <div class="w-full flex justify-end gap-[30px] items-center pt-[50px] text-[12px] text-[#969696]">
          <div class="flex gap-1 items-center">
            <BIconChatDots class="text-[12px] cursor-pointer" @click="addComment()"/>
            <p class="font-normal">评论</p>
          </div>
          <div class="flex gap-1 items-center">
            <BIconEye class="text-[15px]"/>
            <p class="font-normal">{{ character.count }}</p>
          </div>
          <p class="font-normal">
            {{moment().utc(new Date(character.created_at)).local().format("yyyy-MM-DD") }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="detail" class="mx-[18px] absolute top-[90px] bottom-0 right-0 left-0 overflow-y-scroll">
        <div @click="()=>goSubDetail(item.id)" v-for="(item,index) in characters" class="mt-[13px] cursor-pointer">
        <div class="h-[100px] w-full bg-white rounded-[9px] px-[14px] py-[13px]  relative" >
          <div class="w-[228px]">
            <p class="font-normal mb-[13px]">{{ item.title }}</p>
            <p class="font-normal text-[12px] line-clamp-2" v-html="item.description"></p>
          </div>
          <img :src="VITE_BACKEND_URL+item.photo" class="absolute w-[63px] h-[77px] top-[12px] right-[12px]" >
        </div>
        <div class="flex justify-end gap-[30px] items-center pt-[13px] text-[12px] text-[#969696]">
            <div class="flex gap-1 items-center cursor-pointer">
              <BIconChatDots class="text-[12px]"/>
              <p class="font-normal">评论</p>
            </div>
            <div class="flex gap-1 items-center">
              <BIconEye class="text-[15px]"/>
              <p class="font-normal">{{ item.count }}</p>
            </div>
            <p class="font-normal">
              {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}
            </p>
          </div>
        </div>
      </div>
      <div v-else class="p-[13px] top-[40px] absolute bottom-0 right-0 left-0 overflow-y-scroll">
        <div  class="mt-[30px] flex flex-col items-start px-[20px] gap-3 overflow-y-scroll">
          <button @click="()=>godetail(sitem.id)"  v-if=" charactergroups[selected].children" v-for="(sitem, sindex) in charactergroups[selected].children">
            {{(sindex+1)+". "+sitem.name }}
          </button>
        </div>
      </div>
    </div>
  </div>  
  <div ref="dialog"  class="fixed z-[99991] top-0 right-0 left-0 bottom-0 bg-[#010101] opacity-75" v-if="iscomment">
  </div>
  <div v-if="iscomment" class="fixed z-[99991] w-[90%] h-[300px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#FFFFFF] px-[20px] pt-[20px]">
    <div class="flex items-center mb-[20px]">
      <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
      <p class="font-black text-[#0B88F9]">添加评论</p>
    </div>
    <div class="relative w-full mb-[30px]">
      <textarea
      v-model="comment"
        class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
        placeholder=" "
        :class="{'border-t-transparent':comment!=''}"
      ></textarea>
      <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
        评论
      </label>
    </div>
      <button @click="saveCheck" class="absolute bottom-[26px] left-0 w-full py-[10px] bg-[#0B88F9] text-white font-black text-[16px]">
        提&nbsp;&nbsp;&nbsp;&nbsp;交
      </button>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft,BIconChatDots, BIconEye } from 'bootstrap-icons-vue';
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
import axios from 'axios'
import moment from 'moment'

export default defineComponent({
  name: 'character',
  components: {
    BIconChevronLeft,
    BIconChatDots,
    BIconEye
  },
  data: () => ({
    message:'',
    VITE_BACKEND_URL,
    charactergroups:[],
    selected:0,
    characters:[],
    character:null,
    subdetail:false,
    detail:false,
    iscomment:false,
    comment:'',
  }),
  mounted(){
    this.getCharacterGroup();
  },
  methods: {
    moment: function () {
        return moment;
    },
    async getCharacterGroup() {
      try {
        this.charactergroups=[];
        const response = await axios.get(`/charactergroups`);
        if(response.data.status==1){
          this.charactergroups = response.data.charactergroups;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    goSubDetail(id){
      this.subdetail=true;
      this.getCharacter(id);
    },
    async getCharacter(id) {
      try {
        this.character=null;
        const response = await axios.get(`/character/${id}`);
        if(response.data.status==1){
          this.character = response.data.character;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    selectOne(index){
      this.characters=[];
      this.character=null;
      this.detail=false;
      this.subdetail=false;
      this.selected=index;
    },
    addComment(){
      this.iscomment=true;
    },
    godetail(group_id){
      this.detail=true;
      this.getCharacters(group_id);
    },
    goBack(){
      this.character=null;
      this.subdetail=false;
    },
    async getCharacters(group_id) {
      try {
        this.trainings=[];
        const response = await axios.get(`/characters/${group_id}`);
        if(response.data.status==1){
          this.characters = response.data.characters;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    saveCheck(){
      this.postComment();
      this.iscomment=false;
    },
    async postComment(){
      try{
        const response=await axios.post(`/character/${this.character.id}/createcomment`, {
            comment:this.comment,
        });
        if(response.status==422){
            this.message='请输评论';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.character.comment.unshift(response.data.comment);
          this.showSucss();
        }
        else{
            this.message='请输评论';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }finally{
        this.comment='';
      };
    },
    showDialog(){
        layer.config({
          skin: 'login-class'
        })
        layer.open({
            type:1,
            offset:'b',
            title:false,
            content: this.message,
            closeBtn: 0,
            shadeClose:1,
        });
    },
    showSucss(){
      layer.config({
        skin: 'success-class'
      })
      layer.open({
        title:false,
        content: '成功',
        btn:'确定',
        btnAlign: 'c',
        closeBtn: 0,
        shadeClose:1,
      });
    },
  }
})
</script>
