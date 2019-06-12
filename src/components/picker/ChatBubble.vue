<!--
 * Create by Zwl on 2019/5/30
 * @Description: 聊天气泡
-->

<template>
  <section>
    <div class="bubble-box left" v-if="chat.userId != userInfo._id">
      <img :src="imgBaseUrl+chat.head" alt="" class="img-head"/>
      <div class="con">
        <p class="name">{{chat.username}}</p>
        <p class="msg">{{chat.content}}</p>
      </div>
    </div>
    <div class="bubble-box right" v-if="chat.userId == userInfo._id">
      <div class="con">
        <p class="name">{{chat.username}}</p>
        <p class="msg">{{chat.content}}</p>
      </div>
      <img :src="imgBaseUrl+chat.head" alt="" class="img-head"/>
    </div>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        imgBaseUrl: ''
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    props: {
      chat:{},
      index: {
        default: 'left',
        type: String
      }
    },
    mounted(){
      this.imgBaseUrl = imgBaseUrl;
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .bubble-box {
    display: flex;
    flex-direction: row;
    .img-head{
      .img-raduis(30px,#ddd);
      margin-top: 10px;
    }
    .con{
      flex: 1;
      .name{
        font-size: 12px;
        margin-bottom: 5px;
      }
      .msg{
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
        position: relative;
        background-color: #ddeefb;
        text-align: left;
      }
    }
  }

  .left {
    :after {
      content: "";
      position: absolute;
      border-left: 8px solid transparent;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid #ddeefb;
      top: 50%;
      left: -16px;
      margin-top: -8px;
    }
    .img-head{
      margin-right: 10px;
    }
    .con{
      text-align: left;
    }
  }

  .right {
    .img-head{
      margin-left: 10px;
    }
    .con{
      text-align: right;
    }
    :after {
      content: "";
      position: absolute;
      border-left: 8px solid #ddeefb;
      border-top: 8px solid transparent;
      border-bottom: 8px solid transparent;
      border-right: 8px solid transparent;
      top: 50%;
      right: -16px;
      margin-top: -8px;
    }
  }
</style>
