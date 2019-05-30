<!--
 * Create by Zwl on 2019/5/28
 * @Description: 聊天
-->

<template>
  <section class="box">
    <my-mt-header title="聊天"></my-mt-header>
    <section class="chat-box">
      <section class="chat-list">
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
        chatRecord: '',
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
      this.chatRecord = this.chat[ groupId ] || [];
      this.socket = io.connect('http://localhost:3000/' + groupId);

      var that = this;
      this.socket.on('receiveMsg', (data) => {
        that.SET_CHAT({groupId, data});
      });

    },
    methods: {
      ...mapMutations([ 'SET_CHAT' ]),
      async sendMsg(data) {
        this.chatForm.content = data;
        let result = await AddGroupChatRecord(this.chatForm);
        if (result) {
          var msg = Object.assign(result.data, {head: this.userInfo.head, username: this.userInfo.username});
          this.socket.emit('sendMsg', msg);
        }
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
      .item {
        padding: 0 10px;
        margin-bottom: 30px;
      }
    }
    .chat-send {
      height: 50px;
      border-top: 1px solid #ddd;
    }
  }
</style>
