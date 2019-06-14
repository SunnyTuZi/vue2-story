<!--
 * Create by Zwl on 2019/6/13
 * @Description: 信息通知列表
-->

<template>
  <section class="box">
    <my-mt-header title="消息列表" leftSlot=""></my-mt-header>
    <ul>
      <li v-for="item in msgList" @click="toChat(item)">
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
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {getUnReadMsgList} from "../../service/apiList";
  import {mapState} from 'vuex';
  export default {
    data(){
      return{
        msgList:[],
        imgBaseUrl:''
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
    },
    computed:{
      ...mapState(['userInfo','token'])
    },
    methods:{
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
  }
</style>
