<!--
 * Create by Zwl on 2019/6/13
 * @Description: 信息通知列表
-->

<template>
  <section class="box" @click="blur">
    <my-mt-header title="消息列表" leftSlot=""></my-mt-header>
    <ul>
      <li :class="{active:current == index}" v-for="(item,index) in msgList" @touchstart="startLoop($event,index)" @touchend="stopLoop(item)">
          <div class="head-box">
            <img :src="imgBaseUrl+item.user.head" class="head"/>
            <span class="msg-num" v-if="item.unread > 0">{{item.unread}}</span>
          </div>
          <div class="con">
            <p class="name">{{item.user.username}}</p>
            <p class="last-msg">{{item.lastcontent}}</p>
          </div>
          <div class="date">{{formatDate(item.lastdate)}}</div>
      </li>
    </ul>
    <div class="del-btn" :style="{top:y+'px',left:x+'px'}" v-show="delShow" @click="delSession" >删除列表</div>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {getUnReadMsgList,delMsgByUser} from "../../service/apiList";
  import {mapState,mapMutations} from 'vuex';
  export default {
    data(){
      return{
        msgList:[],
        imgBaseUrl:'',
        timer:null,
        delShow:false,
        x:0,
        y:0,
        current:null
      }
    },
    mounted(){
      this.imgBaseUrl = imgBaseUrl;
      this.getUnReadMsgList();
      if(this.token){
        //监听用户登录后接受私聊信息
        this.$socket.emit('login',this.userInfo);
        this.$socket.on('privateChatMsg',()=>{
          this.getUnReadMsgList();


        });
      }
      this.$store.commit('SET_MENU','msg');
    },
    computed:{
      ...mapState(['userInfo','token'])
    },
    methods:{
      ...mapMutations(['SET_MENU']),
      //获取聊天列表
      async getUnReadMsgList(){
        let res = await getUnReadMsgList({_id:this.userInfo._id});
        if(res){
          this.msgList = res.data;
        }
      },
      //聊天跳转
      toChat(item){
        this.$router.push('/user/chat/'+item.user._id+'/'+item.user.username);
      },
      //信息时间处理
      formatDate(date){
        let now_time = new Date().getTime();
        let msg_time = new Date(date).getTime();
        let c_time =  (now_time - msg_time)/1000;
        if(0<c_time && c_time<60){
          return parseInt(c_time)+'秒前';
        }
        if(60<c_time && c_time<60*60){
          return parseInt(c_time/60)+'分钟前';
        }
        if(60*60<c_time && c_time<60*60*60){
          return parseInt(c_time/60/60)+'小时前';
        }
        if(60*60*60*24<c_time){
          return new Date(date).format('MM-dd');
        }
      },
      startLoop(e,index){
        this.timer = setTimeout(()=>{
          this.current = index;
          this.x = e.targetTouches[0].clientX;
          this.y = e.targetTouches[0].clientY;
          if(this.x > document.body.clientWidth-70){
            this.x -= 100;
          }
          if(this.y > document.body.clientHeight-30){
            this.y -= 30;
          }
          this.delShow = true;
        },1000);
        e.preventDefault();
      },
      stopLoop(item){
        clearTimeout(this.timer);
        if(!this.delShow){
          this.toChat(item);
        }

      },
      blur(e){
        this.delBoxHide();
        e.preventDefault();
      },
      async delSession(e){
        var item = this.msgList[this.current];
        let result = await delMsgByUser({userId:item.user._id,toUserId:this.userInfo._id});
        if(result){
          this.msgList.splice(this.current,1);
          this.delBoxHide();
          e.preventDefault();
        }
      },
      delBoxHide(){
        this.delShow = false;
        this.current = null;
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .box {
    background-color: #fff;
    ul {
      li {
        display: flex;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding: 10px;
        display: flex;
        flex-direction: row;
        .head-box {
          display: inline-block;
          width: 50px;
          position: relative;
          .head {
            .img-raduis(40px, #ccc);
          }
          .msg-num {
            .msg-tips(16px);
            position: absolute;
            top: 0px;
            left: 32px;
          }
        }
        .con{
          margin-left: 10px;
          flex: 1;
          .name{
            font-size: 14px;
          }
          .last-msg{
            font-size: 9px;
            color: #999;
          }
        }
        .date{
          width: 100px;
          font-size: 9px;
          color: #999;
          text-align: right;
        }
      }
    }
    .del-btn{
      position: fixed;
      top: 0;
      left: 0;
      font-size: 14px;
      display: inline-block;
      padding: 5px 10px;
      background-color: #fff;
      box-shadow: 1px 1px 2px #ddd;
      border:1px solid #ddd;
      border-radius: 3px;
      z-index: 99;
    }
    .active{
      background-color: #eee;
    }
  }
</style>
