<!--
 * Create by Zwl on 2019/5/28
 * @Description: 聊天
-->

<template>
  <section class="box">
    <my-mt-header title="聊天"></my-mt-header>
    <section class="chat-box">
      <section class="chat-list" id="chatList">
        <ul>
          <li class="item" v-for="item in chatRecord">
            <chat-bubble :chat="item" class="msg" v-if="item.type == 1"></chat-bubble>
            <div class="join-news" v-if="item.type == 2">{{item.username}}加入了群聊</div>
            <div class="join-news" v-if="item.type == 3">{{item.username}}离开了群聊</div>
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
  import {imgBaseUrl,serviceIp} from "../../until/config";
  import {mapMutations, mapState} from 'vuex';
  import {AddGroupChatRecord} from "../../service/apiList";
  import {socketArr} from "../../until/socketArray";

  export default {
    data() {
      return {
        chatForm: {
          userId: '',
          groupId: '',
          content: ''
        },
        socket: '',
        chatRecord: [],
        imgBaseUrl: '',
        socketId:''
      }
    },
    computed: {
      ...mapState([ 'userInfo', 'chat' ])
    },
    mounted() {
      this.imgBaseUrl = imgBaseUrl;
      const groupId = this.$route.params.id;
      this.chatForm.userId = this.userInfo._id;
      this.chatForm.groupId = groupId;
      this.chat[groupId] = this.chat[groupId]||[];
      this.chatRecord = this.chat[groupId];

      this.socket = io.connect(serviceIp + groupId);
      var that = this;
      //加入房间
      this.socket.emit('join', {username:this.userInfo.username});
      //加入房间回调
      this.socket.on('joinCall',(data)=>{
        this.socketId = data.id;
        this.$store.commit('SET_CHAT',{groupId, data});
      });
      //接收信息
      this.socket.on('receiveMsg', (data) => {
        this.$store.commit('SET_CHAT',{groupId, data});
      });
      //连击中断
      this.socket.on('disconnect',(data)=>{
        if(data != 'io client disconnect'){
          this.$toast({
            message: '群组已到限定时间，将在三秒后解散~',
          });
          setTimeout(()=>{
            this.$router.push('/bubble/list');
            this.chat[groupId] = [];
          },3000);
        }
      });

    },
    updated(){
      this.chatBoxToBottom();
    },
    methods: {
      ...mapMutations([ 'SET_CHAT' ]),
      async sendMsg(data) {
        this.chatForm.content = data;
        let result = await AddGroupChatRecord(this.chatForm);
        if (result) {
          var msg = Object.assign(result.data, {head: this.userInfo.head, username: this.userInfo.username});
          this.socket.emit('sendMsg', msg);
          this.chatForm.content = '';
        }
      },
      chatBoxToBottom: function () {
        this.$nextTick(function(){
          var chatBox = document.getElementById('chatList');
          chatBox.scrollTop = chatBox.scrollHeight;
        })
      }
    },
    destroyed(){
      this.socket.emit('leaveGroup',{id:this.socketId,username:this.userInfo.username});
      this.socket.close();
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
