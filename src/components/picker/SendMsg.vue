<!--
 * Create by Zwl on 2019/5/28
 * @Description: 发送信息组件
-->

<template>
    <section>
      <div class="send-box">
        <input type="text" class="input-text" v-model="msg"/>
        <mt-button type="primary" class="send-btn" size="small" @click="sendMsg()">发送</mt-button>
      </div>
    </section>
</template>

<script>
    export default {
      data(){
        return{
          msg:''
        }
      },
      mounted(){
        this.msg = this.content;
      },
      methods:{
        sendMsg(){
          this.$emit('sendMsg',this.msg);
        }
      },
      props:['content'],
      watch:{
        content(){
          this.msg = this.content;
        }
      }
    }
</script>

<style scoped lang="less">
.send-box{
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 10px;
  .input-text{
    flex: 1;
    height: 38px;
    border:1px solid #eee;
    padding-left: 10px;
    margin-right: 10px;

  }
}
</style>
