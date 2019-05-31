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
  import {AddGroupChatRecord} from "../../service/apiList";

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
        imgBaseUrl: ''
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
      if(this.chat[groupId]){
        this.chatRecord = this.chat[groupId]
      }
      this.socket = io.connect('http://localhost:3000/' + groupId);

      var that = this;
      //加入房间
      this.socket.emit('sendMsg', {type:2,username:this.userInfo.username});
      //接受信息
      this.socket.on('receiveMsg', (data) => {
        that.SET_CHAT({groupId, data});
        this.chatRecord = this.chat[groupId]
      });
      //连击中断
      this.socket.on('disconnect',(data)=>{
          this.$toast({
            message: '群组已到限定时间，将在三秒后解散~',
          });
          setTimeout(()=>{this.$router.push('/bubble/list')},3000);
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
          var msg = Object.assign(result.data, {head: this.userInfo.head, username: this.userInfo.username,type:1});
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
