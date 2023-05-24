<template>
   <div v-if="platforms.length" class="absolute top-[128px] bottom-0 right-0 left-0 text-[14px] bg-[#F3F9FF]">
    <div class="pl-[20px] flex w-full overflow-x-scroll gap-[40px] items-center  bg-white h-[40px]" :class="{'border-b-[2px]':isadd}">
      <button @click="()=>{selectAll()}" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected==-1}">
        全部
      </button>
      <button @click="()=>{selectOne(index)}" v-for="(item, index) in platforms" class="px-[5px] shrink-0 py-[3px] rounded-full text-[13px]" :class="{'text-[#0B88F9]':selected==index}">
        {{ item.name }}
      </button>
    </div>
    <div v-if="!isadd" class="px-[5px] flex w-full justify-between items-center  bg-white h-[60px] text-[14px]">
        <!-- <SelectBox placeholder="选择平台"  :groups="platforms" :group="search.platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{search.platform_id=value}"/> -->
          <input type="text" v-model="search.client_name" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="输入客户姓名" autocomplete="off">
          <input type="text" v-model="search.platform_nickname" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台账号" autocomplete="off">
          <button @click="goSearch" class="bg-gradient-to-r from-blue-700 to-blue-400 px-[20px] py-[3px] rounded-full text-white text-[13px]">
            搜索
          </button>
          <button @click="addCheck" class="bg-gradient-to-r from-blue-700 to-blue-400 px-[20px] py-[3px] rounded-full text-white text-[13px]">
            添加
          </button>
    </div>
    <div class="absolute bottom-0 right-0 left-0 overflow-y-scroll" :class="{'bg-white px-[13px] top-[40px] ':isadd,'px-[18px] top-[100px] ':!isadd}">
      <div v-if="isdetail!=null&&check" >
        <div class="flex items-center py-[10px] gap-2 text-[14px]">
          <div class="flex items-center">
            <img src="/assets/icons/turn_round.svg" class="text-[15px] cursor-pointer" @click="goBackTwo()"/>
            <p @click="goBackTwo()" class="font-normal">返回</p>
          </div>
        </div>
        <div class="w-full pb-[20px] bg-white flex flex-col px-[21px] relative pt-[18px] mb-[30px]">
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px]  text-[#101010]">客户状态:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.client_status.name }}</p>
          </div>
          <!-- <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">昵称:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platform_nickname }}</p>
          </div> -->
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">姓名:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.client_name }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">年龄:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.client_age }}</p>
          </div>
          <!-- <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">职业描述:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.job }}</p>
          </div> -->
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">
              {{moment().utc(new Date(check.created_at)).local().format("yyyy-MM-DD") }}
            </p>
          </div>
          <div v-if="check.platforms[0]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台1:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[0].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[0].pivot.name }}</p>
            </div>
          </div>
          <div v-if="check.platforms[1]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台2:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[1].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[1].pivot.name }}</p>
            </div>
          </div>
          <div v-if="check.platforms[2]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台3:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[2].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[2].pivot.name }}</p>
            </div>
          </div>
          <div v-if="check.platforms[3]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台4:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[3].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ check.platforms[3].pivot.name }}</p>
            </div>
          </div>
          <div class="flex flex-row mb-[7px] gap-2">
            <p class="text-[14px] font-normal text-[#101010]">发布人:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ getUser.department_name }},</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ getUser.group_name }},</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ getUser.realname }}</p>
          </div>
          <div class="flex justify-end">
            <button :class="{'hidden':getUser.id!=check.user_id}" @click="()=>{showdialog=true}"  class="px-[10px] shrink-0 py-[3px] rounded-full text-[13px] bg-gradient-to-r from-blue-700 to-blue-400">
              添加
            </button>
          </div>
          <div class="absolute top-[17px] right-[14px]">
            <div class="flex flex-row">
              <p class=" mr-[2px] text-[14px] font-normal text-[#101010]">客户头像：</p>
              <img :src="VITE_BACKEND_URL+check.photo" class="w-[88px] h-[91px] rounded-[8px]"> 
            </div>
          </div>
          <div v-for="(item,index) in check.comment" class="mb-[10px]">
            <div class="flex gap-2 items-center">
              <div class="w-[20px] h-[20px] bg-[#4EABFF] rounded-full ml-[-15px] mb-[5px]"></div>
              <p>{{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}</p>
            </div>
            <div class="border-l-2 border-[#4EABFF] px-[10px] ml-[-7px]">
              <p class="text-[14px] font-normal text-[#101010]">客户描述:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px] mb-[7px]">
              {{  item.comment}}
              </p>
              <p class="text-[14px] font-normal text-[#101010]">聊天截图:</p>
              <div class="w-full flex items-center gap-[17px] overflow-x-auto">
                <div v-for="(media,index) in item.medias" class="w-[152px] h-[340px] flex items-center relative flex-shrink-0">
                  <img :src="VITE_BACKEND_URL+media.thumbpath" class="w-[152px] h-[340px]"/>
                </div>
              </div>
            </div>
          </div>
          <div class="flex justify-end gap-[30px] items-center pt-[13px] text-[12px] text-[#969696]">
              <!-- <div class="flex gap-1 items-center">
                <BIconChatDots class="text-[12px]"/>
                <p class="font-normal">评论</p>
              </div> -->
              <!-- <div class="flex gap-1 items-center">
                <BIconEye class="text-[15px]"/>
                <p class="font-normal">569</p>
              </div> -->
              <!-- <p class="font-normal">2023-03-24</p> -->
            </div>
        </div>
      </div>
      <div v-else-if="isadd" >
        <div class=" flex justify-center">
          <p class="mt-[15px] font-bold mb-[25px] text-[14px]">编辑查重资料</p>
        </div>

        <!-- <div class="mt-[10px] flex flex-row items-center ">
          <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台</p>
          <SelectBox placeholder="选择平台"  :groups="platforms" :group="newCheck.platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.platform_id=value}"/>
        </div> -->

        <div class="flex flex-row text-[14px] mb-[3px] justify-between">
          <div class="mt-[10px] flex flex-row items-center ">
            <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台&nbsp;1</p>
            <SelectBox placeholder="选择平台"  :groups="platforms" :group="newCheck.platforms[0].platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.platforms[0].platform_id=value}"/>
          </div>
          <div class="flex flex-row items-center">
            <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
            <input type="text" v-model="newCheck.platforms[0].client_nickanme" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台1账号" autocomplete="off">
          </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[3px] justify-between">
          <div class="mt-[10px] flex flex-row items-center ">
            <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台&nbsp;2</p>
            <SelectBox placeholder="选择平台"  :groups="platforms" :group="newCheck.platforms[1].platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.platforms[1].platform_id=value}"/>
          </div>
          <div class="flex flex-row items-center">
            <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
            <input type="text" v-model="newCheck.platforms[1].client_nickanme" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台2账号" autocomplete="off">
          </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[3px] justify-between">
          <div class="mt-[10px] flex flex-row items-center ">
            <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台&nbsp;3</p>
            <SelectBox placeholder="选择平台"  :groups="platforms" :group="newCheck.platforms[2].platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.platforms[2].platform_id=value}"/>
          </div>
          <div class="flex flex-row items-center">
            <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
            <input type="text" v-model="newCheck.platforms[2].client_nickanme" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台3账号" autocomplete="off">
          </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
          <div class="mt-[10px] flex flex-row items-center ">
            <p class="font-normal w-[60px] mr-[13px]  text-end">平&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;台&nbsp;4</p>
            <SelectBox placeholder="选择平台"  :groups="platforms" :group="newCheck.platforms[3].platform_id" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.platforms[3].platform_id=value}"/>
          </div>
          <div class="flex flex-row items-center">
            <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
            <input type="text" v-model="newCheck.platforms[3].client_nickanme" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台4账号" autocomplete="off">
          </div>
        </div>


        <div class="mt-[15px]  flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户姓名</p>
              <input type="text" placeholder="输入客户姓名"  v-model="newCheck.client_name" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" autocomplete="off">
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">新增日期</p>
              <input type="date" v-model="newCheck.added_date" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">部门</p>
              <p class="w-[100px] align-middle">{{ getUser.department_name }}</p>
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务室/组</p>
              <p class="w-[100px] align-middle">{{ getUser.group_name }}</p>
            </div>
            <!-- <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务员</p>
              <input type="text" v-model="newCheck.salemane" class="w-[100px] text-center border-[1px] py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
            </div> -->
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">业务员</p>
              <p class="w-[100px] align-middle">{{ getUser.name }}</p>
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户状态</p>
              <SelectBox placeholder="选择状态"  :groups="statuses" :group="newCheck.client_status" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.client_status=value}"/>
            </div>
        </div>
        <div class="flex flex-row text-[14px] mb-[13px] justify-between">
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px]  text-end">客户性别</p>
              <SelectBox placeholder="选择性别"  :groups="sexes" :group="newCheck.client_sex" class="w-[100px] h-[31px] "  @onchange="(value)=>{newCheck.client_sex=value}"/>
            </div>
            <div class="flex flex-row items-center">
              <p class="font-normal w-[60px] mr-[13px] text-end">客户年龄</p>
              <input type="number" v-model="newCheck.client_age" class="w-[100px] text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入年龄" autocomplete="off">
            </div>
        </div>
        <!-- <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">平台账号</p>
          <input type="text" v-model="newCheck.client_nickanme" class="grow text-center border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="输入平台账号" autocomplete="off">
        </div> -->
        <!-- <div class="flex flex-row items-center text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] text-end">职业描述</p>
          <input type="text" v-model="newCheck.job" class="grow  pl-[10px] border-[1px]  py-1 text-black text-[14px]  focus:outline-none" placeholder="" autocomplete="off">
        </div> -->
        <div class="relative w-full mb-[13px]">
          <textarea
            v-model="newCheck.comment"
            class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
            placeholder=" "
            :class="{'border-t-transparent':newCheck.comment!=''}"
          ></textarea>
          <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
            客户描述
          </label>
        </div>
        <div class="flex flex-row items-start text-[14px] mb-[13px]">
          <p class="font-black ml-[17px]">头像：</p>
          <div @click="selectImage" class="ml-[15px] w-[85px] h-[100px]">
            <div v-if="newCheck.photo" class=" relative">
              <img :src="VITE_BACKEND_URL+newCheck.photo" class="w-[85px] h-[100px]"/>
            </div>
            <div v-else class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[85px] h-[100px]">
              <BIconPlus class="text-[30px]" />
            </div>
            <input type="file" accept="image/*" style="display:none" ref="imageInput" @change="uploadImage">
          </div>
        </div>
        <div class="flex flex-row items-start text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] flex-shrink-0 text-end">聊天记录</p>
          <div class="grow flex justify-center overflow-x-auto">
            <div class="w-full flex items-center gap-[17px] ">
              <div v-for="(item,index) in newCheck.images" class="w-[85px] h-[100px] flex ju items-center relative flex-shrink-0">
                <img  :src="VITE_BACKEND_URL+item.thumbpath" class="w-[77px] h-[91px]"/>
                <BIconTrash class="text-[15px] z-10 top-0 right-0 text-[#FF0000] absolute" @click="()=>deleteNewImage(index)" />
              </div>
              <div @click="selectNewImages" class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[85px] h-[100px]">
                <BIconPlus class="text-[30px]"/>
              </div>
            </div>
            <input multiple  type="file" accept="image/*" style="display:none" ref="imageNewInputs" @change="uploadNewImages">
          </div>
        </div>
        <button @click="saveCheck" class="w-full py-[10px] bg-[#0B88F9] text-white font-black text-[16px]">
          提&nbsp;&nbsp;&nbsp;&nbsp;交
        </button>
      </div>
      <template v-else-if="isAll" >
        <div  v-for="(item, index) in checks" :key="item.id+'.'"    class="w-full relative bg-white px-[16px] py-[6px] mt-[15px]">
           <div class="flex flex-row mb-[7px]">
              <p class="text-[14px]  text-[#101010]">客户状态:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_status.name }}</p>
            </div>
            <div v-if="item.platforms[0]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台1:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[0].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[0].pivot.name }}</p>
            </div>
          </div>
          <div v-if="item.platforms[1]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台2:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[1].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[1].pivot.name }}</p>
            </div>
          </div>
          <div v-if="item.platforms[2]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台3:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[2].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[2].pivot.name }}</p>
            </div>
          </div>
          <div v-if="item.platforms[3]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台4:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[3].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[3].pivot.name }}</p>
            </div>
          </div>
            <!-- <div v-if="item.platforms.length>0" class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">昵称:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[0].pivot.name }}</p>
            </div> -->
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">姓名:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">年龄:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_age }}</p>
            </div>
            <!-- <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">职业描述:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.job }}</p>
            </div> -->
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">
                {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}  
              </p>
            </div>
            <div class="absolute top-[17px] right-[14px]">
              <div class="flex flex-row">
                <p class="mt-[1px] mr-[2px] text-[14px] font-normal text-[#101010]">头像:</p>
                <img :src="VITE_BACKEND_URL+item.photo" class="w-[88px] h-[91px] rounded-[8px]"> 
              </div>
              <div class="flex flex-row items-center justify-end mt-[20px] ml-[30px] text-[#969696]">
                  <p @click="()=>godDetail(item.id)" class="leading-4 font-normal cursor-pointer">查看更多</p>
                  <BIconChevronRight @click="()=>godDetail(item.id)"  class="text-[15px] cursor-pointer"/>
              </div>
            </div>
        </div>
        <Pagination  v-if="totalPages" :index="index" :currentPage="currentPage" :totalItems="totalPages"  @onClick="changepage" @onchangePage="onchangePage"/>
      </template>
      <template v-else-if="platforms[selected]">    
        <div   v-for="(item, index) in checks" :key="item.id"  class="w-full relative bg-white px-[16px] py-[6px] mt-[15px]">
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px]  text-[#101010]">客户状态:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_status.name }}</p>
          </div>
          <div v-if="item.platforms[0]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台1:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[0].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[0].pivot.name }}</p>
            </div>
          </div>
          <div v-if="item.platforms[1]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台2:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[1].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[1].pivot.name }}</p>
            </div>
          </div>
          <div v-if="item.platforms[2]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台3:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[2].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[2].pivot.name }}</p>
            </div>
          </div>
          <div v-if="item.platforms[3]" class="flex justify-between items-center mr-[100px]">
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">平台4:</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[3].name }}</p>
            </div>
            <div class="flex flex-row mb-[7px]">
              <p class="text-[14px] font-normal text-[#101010]">微信号：</p>
              <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[3].pivot.name }}</p>
            </div>
          </div>
          <!-- <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">昵称:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.platforms[0].pivot.name }}</p>
          </div> -->
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">姓名:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_name }}</p>
          </div>
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">年龄:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.client_age }}</p>
          </div>
          <!-- <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">职业描述:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">{{ item.job }}</p>
          </div> -->
          <div class="flex flex-row mb-[7px]">
            <p class="text-[14px] font-normal text-[#101010]">添加日期:</p>
            <p class="text-[14px] font-normal text-[#101010] ml-[2px]">
              {{moment().utc(new Date(item.created_at)).local().format("yyyy-MM-DD") }}  
            </p>
          </div>
          <div class="absolute top-[17px] right-[14px]">
            <div class="flex flex-row">
              <p class="mt-[1px] mr-[2px] text-[14px] font-normal text-[#101010]">头像:</p>
              <img :src="VITE_BACKEND_URL+item.photo" class="w-[88px] h-[91px] rounded-[8px]"> 
            </div>
            <div class="flex flex-row items-center justify-end mt-[20px] ml-[30px] text-[#969696]">
                <p @click="()=>godDetail(item.id)" class="leading-4 font-normal cursor-pointer">查看更多</p>
                <BIconChevronRight @click="()=>godDetail(item.id)"  class="text-[15px] cursor-pointer"/>
            </div>
          </div>
        </div>
        <Pagination  v-if="totalPage" :index="index" :currentPage="currentPage" :totalItems="totalPage"  @onClick="changepages" @onchangePage="onchangePages"/>
      </template>
    </div>
   </div>
   <div ref="dialog"  class="fixed first-line: z-[99991] top-0 right-0 left-0 bottom-0 bg-[#010101] opacity-75" v-if="showdialog">
   </div>
   <div v-if="showdialog" class="fixed z-[99991] w-[90%] h-[400px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-[#FFFFFF] px-[20px] pt-[20px]">
      <div class="flex items-center mb-[20px]">
        <img src="/assets/icons/blueplus.svg" class="icon mr-[12px]"/>
        <p class="font-black text-[#0B88F9]">添加</p>
      </div>
      <div class="relative w-full mb-[30px]">
        <textarea
          v-model="comment"
          class="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200"
          placeholder=" "
          :class="{'border-t-transparent':career!=''}"
        ></textarea>
        <label class="pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 ">
          客户描述
        </label>
      </div>
      <div class="flex flex-row items-start text-[14px] mb-[13px]">
          <p class="font-normal w-[60px] mr-[13px] flex-shrink-0 text-end">聊天记录</p>
          <div class="grow flex justify-center overflow-x-auto">
            <div class="w-full flex items-center gap-[17px] ">
              <div v-for="(item,index) in images" class="w-[85px] h-[100px] flex ju items-center relative flex-shrink-0">
                <img  :src="VITE_BACKEND_URL+item.thumbpath" class="w-[77px] h-[91px]"/>
                <BIconTrash class="text-[15px] z-10 top-0 right-0 text-[#FF0000] absolute" @click="()=>deleteImage(index)" />
              </div>
              <div @click="selectImages" class="flex items-center justify-center flex-shrink-0 bg-[#F0F0F0] w-[85px] h-[100px]">
                <BIconPlus class="text-[30px]"/>
              </div>
            </div>
            <input multiple  type="file" accept="image/*,video/*" style="display:none" ref="imageInputs" @change="uploadImages">
          </div>
        </div>
        <button @click="addComment" class="absolute bottom-[26px] left-0 w-full py-[10px] bg-[#0B88F9] text-white font-black text-[16px]">
          提&nbsp;&nbsp;&nbsp;&nbsp;交
        </button>
    </div>
</template>

<script>

import { defineComponent } from 'vue'
import { BIconPlus,BIconSearch,BIconSearchHeart, BIconChevronRight,BIconTrash,BIconChatDots, BIconEye } from 'bootstrap-icons-vue';
import SelectBox from '@/components/SelectBox.vue'
import { useAuthStore } from '@/pinia/modules/useAuthStore';
import { mapState, mapActions } from 'pinia'
import Pagination from '@/components/Pagination.vue'
import axios from 'axios'
import moment from 'moment'
const VITE_BACKEND_URL = import.meta.env.VITE_IMAGE_URL;


export default defineComponent({
  name: 'check',
  components: {
    SelectBox,
    BIconSearchHeart,
    BIconPlus,
    BIconSearch,
    BIconChevronRight,
    BIconTrash,
    BIconChatDots,
    BIconEye,
    Pagination
  },
  data: () => ({
    sexes:[
      {
        id:1,
        name:'男'
      },
      {
        id:2,
        name:'女'
      },
    ],
    issearch:false,
    isAll:true,
    VITE_BACKEND_URL,
    platforms:[],
    departments:[],
    statuses:[],
    checks:[],
    check:null,
    showdialog:false,
    selected:-1,
    isadd:false,
    images:[],
    comment:'',
    isdetail:null,
    search:{
      platform_id:'',
      client_name:'',
      platform_nickname:''
    },
    newCheck:{
        platforms:[
          {
            platform_id:'',
            client_nickanme:'',
          },
          {
            platform_id:'',
            client_nickanme:'',
          },
          {
            platform_id:'',
            client_nickanme:'',
          },
          {
            platform_id:'',
            client_nickanme:'',
          }
        ],
        added_date:'',
        client_status:'',
        client_name:'',
        client_sex:'',
        client_age:'',
        photo:null,
        comment:'',
        images:[]
    },
    currentPage:1,
    totalPage:null,
    totalPages:null,
    index:5,
  }),
  computed: {
      ...mapState(useAuthStore, ['getUser']),
  },
  mounted() {
    this.getCheckGroup();
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
    goSearch(){
    this.getChecks();
    this.issearch=true;
    },
    async getChecks() {
      try {
        // this.checks=[];
        const response = await axios.get(`/searchchecks/?page=${this.currentPage}&count=${this.index}&name=${this.search.client_name}&nick=${this.search.platform_nickname}&platform=${this.selected==-1?this.selected: this.platforms[this.selected].id}`);
        if(response.data.status==1){
          this.checks = response.data.checks.data;
          this.totalPage=response.data.checks.total;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    async getCheckGroup() {
      try {
        this.traininggroups=[];
        const response = await axios.get(`/checklist?page=${this.currentPage}&count=${this.index}`);
        if(response.data.status==1){
          this.departments = response.data.departments;
          this.platforms = response.data.platforms;
          this.statuses = response.data.statuses;
          this.checks= response.data.check.data;
          this.totalPages=response.data.check.total;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    async getCheck(id) {
      try {
        this.training=null;
        const response = await axios.get(`/check/${id}`);
        if(response.data.status==1){
          this.check = response.data.check;
        }
      }
      catch (error) {
        console.log(error);
      };
    },
    handleClickOutside(event) {
      if(this.showdialog){
        if(this.$refs.dialog.contains(event.target)){
          this.showdialog=false;
        }
      }
    },
    selectImages() {
      this.$refs.imageInputs.click()
    },
    selectNewImages() {
      this.$refs.imageNewInputs.click()
    },
    deleteNewImage(index){
      this.newCheck.images.splice(index, 1);
    },
    async uploadNewImages() {
      this.loading=true;
      let files = this.$refs.imageNewInputs.files;
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files[]', file);
      });
      try{
        const response=await axios.post(`/uploadfiles`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.newCheck.images.push(...response.data.media);
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }
      finally{
        this.loading=false;
      };
    },
    deleteImage(index){
      this.images.splice(index, 1);
    },
    async uploadImages() {
      this.loading=true;
      let files = this.$refs.imageInputs.files;
      const formData = new FormData();
      Array.from(files).forEach(file => {
        formData.append('files[]', file);
      });
      try{
        const response=await axios.post(`/uploadfiles`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.images.push(...response.data.media);
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }
      finally{
        this.loading=false;
      };
    },
    selectOne(index){
      this.isAll=false;
      this.issearch=false;
      this.selected=index;
      this.isadd=false;
      this.isdetail=null;
      this.currentPage=1;
      this.getChecks();
    },
    
    selectAll(){
      this.isAll=true;
      this.issearch=false;
      this.selected=-1;
      this.isadd=false;
      this.isdetail=null;
      this.currentPage=1;
      this.getChecks();
    },
    addCheck(){
      this.check=null;
      this.isadd=true;
    },
    saveCheck(){
      this.checkCreate();
      // this.isadd=false;
    },
    createValidation(){
        if(this.newCheck.platforms[0].platform_id==''){
            this.message='平台是必需的';
            return false;
        }
        else if(this.newCheck.platforms[0].client_nickanme==''){
          this.message='平台账号';
            return false;
        }
        else if(this.newCheck.added_date==''){
          this.message='新增日期是必需的';
            return false;
        }
        else if(this.newCheck.client_status==''){
          this.message='客户状态员是必需的';
            return false;
        }
        else if(this.newCheck.client_name==''){
          this.message='客户姓名是必需的';
            return false;
        }
        else if(this.newCheck.client_sex==''){
          this.message='客户性别是必需的';
            return false;
        }
        else if(this.newCheck.client_age==''){
          this.message='客户年龄';
            return false;
        }
        else if(this.newCheck.client_age==''){
          this.message='客户年龄';
            return false;
        }
        else if(this.newCheck.comment==''){
          this.message='客户描述';
            return false;
        }
        else if(this.newCheck.photo==null){
          this.message='头像';
            return false;
        }
        return true;
    },
    async checkCreate(){
      if(!this.createValidation()){
        this.showDialog();
        return;
      }
      let filteredPlatforms = this.newCheck.platforms.filter(platform => platform.platform_id !== '' || platform.client_nickanme  !== '');
      try{
        const response=await axios.post('/createcheck', {
            platforms:filteredPlatforms,
            added_date:this.newCheck.added_date,
            group_id:this.getUser.group_id,
            sale_man:this.getUser.name,
            client_status_id:this.newCheck.client_status,
            client_name:this.newCheck.client_name,
            client_sex:this.newCheck.client_sex,
            client_age:this.newCheck.client_age,
            photo:this.newCheck.photo,
            comment:this.newCheck.comment,
            images:this.newCheck.images
        });
        if(response.status==422){
          this.message='网络错误';
          this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.showSucss();
          this.isadd=false;
          this.getChecks();
          this.newCheck={
              platforms:[
            {
              platform_id:'',
              client_nickanme:'',
            },
            {
              platform_id:'',
              client_nickanme:'',
            },
            {
              platform_id:'',
              client_nickanme:'',
            },
            {
              platform_id:'',
              client_nickanme:'',
            }
          ],
            added_date:'',
            client_status:'',
            client_name:'',
            client_sex:'',
            client_age:'',
            photo:null,
            comment:'',
            images:[]
          }
        }else if(response.status==200&&response.data.status==2){
          this.message='平台ID已经存在';
          this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      };
    },
    godDetail(id){
      this.getCheck(id);
      this.isdetail=true;

    },
    goBackTwo(){
      this.check=null;
      this.isdetail=null;
    },
    addComment(){
      this.postComment();
      this.showdialog=false;
    },
    async postComment(){
      try{
        const response=await axios.post(`/check/${this.check.id}/createcomment`, {
            comment:this.comment,
            images:this.images,
        });
        if(response.status==422){
            this.message='输评论';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          console.log(response.data.comment);
          this.check.comment.unshift(response.data.comment);
          this.showSucss();
        }
        else{
            this.message='输评论';
            this.showDialog();
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }finally{
        this.comment='';
      };
    },
    changepage(value){
      this.currentPage=value;
      this.getChecks();
    },
    changepages(value){
      this.currentPage=value;
      this.getChecks();
    },
    onchangePages(value){
        this.index=value;
        this.changepages(1);
    },
    onchangePage(value){
        this.index=value;
        this.changepage(1);
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
    selectImage() {
      this.$refs.imageInput.click()
    },
    async uploadImage() {
      this.loading=true;
      let file = this.$refs.imageInput.files[0];
      const formData = new FormData();
      formData.append('file', file);
      try{
        const response=await axios.post(`/uploadfile`, formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );
        if(response.status==422){
            this.message='网络错误';
            this.showDialog();
        }
        else if(response.status==200&&response.data.status==1){
          this.newCheck.photo=response.data.image;
        }
      }catch(error) {
          this.message='网络错误';
          this.showDialog();
      }
      finally{
        this.loading=false;
      };
    },
  }
})
</script>
