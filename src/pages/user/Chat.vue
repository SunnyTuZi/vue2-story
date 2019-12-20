<!--
 * Create by Zwl on 2019/6/12
 * @Description: 私聊
-->

<template>
  <section class="box">
    <my-mt-header :title="byUsername"></my-mt-header>
    <section class="chat-box">
      <section class="chat-list" id="chatList">
        <ul>
          <li class="item" v-for="item in chatRecord">
            <chat-bubble :chat="item" class="msg"></chat-bubble>
          </li>
        </ul>
      </section>
      <section class="chat-send">
        <send-msg @sendMsg="sendMsg" :content="chatForm.content"></send-msg>
      </section>
    </section>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {mapMutations, mapState} from 'vuex';
  import {addChatRecord,updateRecord,getUnReadMsgByUser} from "../../service/apiList";

  export default {
    data() {
      return {
        chatForm: {
          userId: '',
          groupId: '',
          content: ''
        },
        groupId:'',
        byUsername:'',
        chatRecord: [],
        imgBaseUrl: '',
        socketId:''
      }
    },
    computed: {
      ...mapState([ 'userInfo', 'chat' ])
    },
    mounted() {
      this.toUserId = this.$route.params.id;
      this.byUsername = this.$route.params.name;
      this.imgBaseUrl = imgBaseUrl;

      this.$socket.emit('login',this.userInfo);
      this.groupId = new Array([this.userInfo._id,this.toUserId]).sort((a,b)=> a-b).toString();
      this.chat[this.groupId] = this.chat[this.groupId]||[];
      this.chatRecord = this.chat[this.groupId];
      this.$socket.on('privateChatMsg',(data)=>{
        debugger;
        let groupId = this.groupId;
        this.$store.commit('SET_CHAT',{groupId, data});
      });
      this.getUnReadMsgByUser();

    },
    updated(){
      this.chatBoxToBottom();
    },
    methods: {
      ...mapMutations([ 'SET_CHAT' ]),
      //发送信息
      async sendMsg(content) {
        this.chatForm.content = content;
        let data = {
          username:this.userInfo.username,
          userId: this.userInfo._id,
          content:content,
          toUserId:this.toUserId,
          head:this.userInfo.head
        };
        let res = await addChatRecord(data);
        if(res){
          this.$socket.emit('privateChat', data);
          this.$store.commit('SET_CHAT',{groupId:this.groupId, data});
          this.chatForm.content = '';
        }
      },
      //信息滚到最底部
      chatBoxToBottom: function () {
        this.$nextTick(function(){
          var chatBox = document.getElementById('chatList');
          chatBox.scrollTop = chatBox.scrollHeight;
        })
      },
      //将与当前用户的聊天记录标记为已读
      async updateRecordStatus(){
        await updateRecord({toUserId:this.userInfo._id,userId:this.toUserId});
      },
      //获取未读的聊天信息
      async getUnReadMsgByUser(){
        let res = await getUnReadMsgByUser({userId:this.toUserId,toUserId:this.userInfo._id});
        if(res){
          res.data.forEach((item,i)=>{
            let groupId = this.groupId;
            let data = {
              username:item.userId.username,
              userId: item.userId._id,
              content:item.content,
              toUserId:item.toUserId,
              head:item.userId.head
            };
            this.$store.commit('SET_CHAT',{groupId, data});
          });
          this.updateRecordStatus();
        }
      }
    },
    //离开前，将信息设为已读
    destroyed(){
      this.updateRecordStatus();
      //清除本页面的监听事件
      this.$socket.removeAllListeners();
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";

  .chat-box {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    padding-top: 20px;
    background-color: #fff;
    .chat-list {
      flex: 1;
      height: 0;
      overflow-y: auto;
      .item {
        padding: 0 10px;
        margin-bottom: 30px;
        .join-news{
          text-align: center;
          font-size: 12px;
          color: #999;
        }
      }
    }
    .chat-send {
      height: 50px;
      border-top: 1px solid #ddd;
    }
  }
</style>
