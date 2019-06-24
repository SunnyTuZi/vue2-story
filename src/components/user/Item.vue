<!--
 * Create by Zwl on 2019/6/19
 * @Description: 列表组件
-->

<template>
  <section class="user-item" @click="toChat">
    <img :src="imgBaseUrl+user.head" alt="" class="head"/>
    <div class="info">
      <p class="name">{{user.username}}</p>
      <p class="autograph">{{user.autograph}}</p>
    </div>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";

  export default {
    data(){
      return{
        imgBaseUrl:''
      }
    },
    props:['user'],
    mounted(){
      this.imgBaseUrl = imgBaseUrl;
    },
    methods:{
      //聊天跳转
      toChat(){
        this.$router.push('/user/chat/'+this.user._id+'/'+this.user.username);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
.user-item{
  display: flex;
  align-items: center;
  .head{
    .img-raduis(40px,#eee);
  }
  .info{
    margin-left: 10px;
    .name{
      font-size: 14px;
    }
    .autograph{
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
