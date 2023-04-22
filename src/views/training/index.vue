<template>
  <div v-if="traininggroups.length!=0" class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white border-b-[1px] h-[40px] border-[#817b7b]">
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in traininggroups" class="px-[10px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'bg-gradient-to-r from-blue-700 to-blue-400 text-white':selected[0]==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="training!=null&&subdetail">
      <div class="flex items-center py-[10px] gap-2 text-[14px]">
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px] cursor-pointer" @click="goBackTwo()"/>
          <p @click="goBackTwo()" class="font-normal">{{ traininggroups[selected[0]].children[selected[1]].name }}</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px] cursor-pointer" @click="goBack()"/>
          <p @click="goBack()" class="font-normal">{{ training.training_group.name }}</p>
        </div>
        <div class="flex items-center">
          <BIconChevronLeft class="text-[15px]" />
          <p class="font-normal text-[#0B88F9] w-[100px] truncate">{{ training.title }}</p>
        </div>
      </div>
      <div class="w-full bg-white flex flex-col items-center px-[21px] pb-[20px]">
        <p class="font-black py-[17px]">{{ training.title }}</p>
        <div class=" ql-editor w-full font-normal " v-html="training.description"  contenteditable="true"></div>

        <p class="w-full my-[30px] font-bold">评论</p>
        <div class="mb-[30px] w-full" v-for="(comment, index) in training.comment">
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
            <p class="font-normal">{{ training.count }}</p>
          </div>
          <p class="font-normal">
            {{moment().utc(new Date(training.created_at)).local().format("yyyy-MM-DD") }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="pl-[20px] flex gap-[40px] w-full overflow-x-scroll items-center  bg-white h-[50px]">
        <button v-if="traininggroups[selected[0]]" @click="()=>selectTwo(sindex)" v-for="(sitem, sindex) in traininggroups[selected[0]].children" class="shrink-0 px-[30px] py-[3px] rounded-[4px] text-[13px]" :class="{'bg-gradient-to-r from-blue-700 to-blue-400 text-white':selected[1]==sindex}">
          {{ sitem.name }}
        </button>
      </div>
      <div  v-if="!traininggroups[selected[0]]||!traininggroups[selected[0]].children[selected[1]]" class=" flex justify-center">
        <p class="mt-[57px] font-normal">暂未开放权限</p>
      </div>
      <div v-if="!detail" class="mt-[30px] flex flex-col items-start px-[50px] gap-3 overflow-y-scroll">
        <button  v-if=" traininggroups[selected[0]].children[selected[1]]" v-for="(titem, tindex) in traininggroups[selected[0]].children[selected[1]].children"  @click="()=>godetail(titem.id)">
          {{(tindex+1)+". "+titem.name }}
        </button>
      </div>
      <div v-if="detail" class="mx-[18px] absolute top-[90px] bottom-0 right-0 left-0 overflow-y-scroll">
        <div @click="()=>goSubDetail(item.id)" v-for="(item,index) in trainings" class="mt-[13px] cursor-pointer">
        <div class="h-[100px] w-full bg-white rounded-[9px] px-[14px] py-[13px]  relative" >
          <div class="w-[228px]">
            <p class="font-normal mb-[13px]">{{ item.title }}</p>
            <div class="ql-editor w-full font-normal text-[12px] line-clamp-2 max-h-[50px]" style="min-height: 50px;"  v-html="item.description"  contenteditable="true"></div>
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
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconChevronLeft,BIconChatDots, BIconEye } from 'bootstrap-icons-vue';
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;
import axios from 'axios'
import moment from 'moment'

export default defineComponent({
  name: 'training',
  components: {
    BIconChatDots,
    BIconChevronLeft,
    BIconEye
  },
  data: () => ({
    comment:'',
    VITE_BACKEND_URL,
    training:null,
    traininggroups:[],
    trainings:[],
    selected:[0,0],
    detail:false,
    iscomment:false,
    subdetail:false,
  }),
  mounted() {
    this.getTrainingGroup();
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
    async getTrainingGroup() {
      try {
        this.traininggroups=[];
        const response = await axios.get(`/traininggroups`);
        if(response.data.status==1){
          this.traininggroups = response.data.traininggroups;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    async getTrainings(group_id) {
      try {
        this.trainings=[];
        const response = await axios.get(`/trainings/${group_id}`);
        if(response.data.status==1){
          this.trainings = response.data.trainings;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    async getTraining(id) {
      try {
        this.training=null;
        const response = await axios.get(`/training/${id}`);
        if(response.data.status==1){
          this.training = response.data.training;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    handleClickOutside(event) {
      if(this.iscomment){
        if(this.$refs.dialog.contains(event.target)){
          this.iscomment=false;
          this.comment='';
        }
      }
    },
    godetail(group_id){
      this.detail=true;
      this.getTrainings(group_id);
    },
    goSubDetail(id){
      this.subdetail=true;
      this.getTraining(id);
    },
    selectOne(index){
      this.selected[0]=index;
      this.selected[1]=0;
      this.subdetail=false;
      this.detail=false;
    },
    selectTwo(index){
      this.selected[1]=index;
      this.subdetail=false;
      this.detail=false;
    },
    goBack(){
      this.subdetail=false;
    },
    goBackTwo(){
      this.detail=false;
      this.subdetail=false;
    },
    addComment(){
      this.iscomment=true;
    },
    saveCheck(){
      this.postComment();
      this.iscomment=false;
    },
    async postComment(){
      try{
        const response=await axios.post(`/training/${this.training.id}/createcomment`, {
            comment:this.comment,
        });
        if(response.status==422){
            this.message='请输评论';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          console.log(response.data.comment);
          this.training.comment.unshift(response.data.comment);
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
