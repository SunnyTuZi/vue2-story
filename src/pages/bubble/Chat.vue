<!--
 * Create by Zwl on 2019/5/28
 * @Description: 聊天
-->

<template>
  <section class="box">
    <my-mt-header title="聊天"></my-mt-header>
    <section class="chat-box">
      <section class="chat-list"></section>
      <section class="chat-send">
        <send-msg @sendMsg="sendMsg"></send-msg>
      </section>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import {AddGroupChatRecord} from "../../service/apiList";

  export default {
      data(){
        return{
          chatForm:{
            userId:'',
            groupId:'',
            content:''
          }
        }
      },
      computed:{
        ...mapState(['userInfo'])
      },
      mounted(){
        this.
        this.chatForm.groupId = this.$route.params.id;
        this.$socket.on( this.chatForm.groupId,(data)=>{
          this.$socket.join( this.chatForm.groupId);
        });
      },
      methods:{
        async sendMsg(){
          let result = await AddGroupChatRecord(this.chatForm);
          if(result){
            this.$socket.in(this.chatForm.groupId).emit('content', this.chatForm.content);
          }
        }
      }
    }
</script>

<style scoped lang="less">
.chat-box{
  display: flex;
  flex-direction: column;
  height: 100%;
  .chat-list{
    flex: 1;
    background-color: #fff;
  }
  .chat-send{
    height: 50px;
    border-top:1px solid #ddd;
  }
}
</style>
