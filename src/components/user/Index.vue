<!--
 * Create by Zwl on 2019/6/11
 * @Description: 个人主页
-->

<template>
    <section class="slef-index">
      <p class="img-box"><img :src="userInfo.head ? imgBaseUrl + userInfo.head:''" alt="" class="head-img"/></p>
      <div class="smiple-box" v-if="token">
        <p class="nickname">{{userInfo.username}}</p>
        <p class="synopsis">{{userInfo.autograph}}</p>
        <p class="follow">
          <a @click="toFollowList">{{userInfo.fosize}}人关注</a>
          <span class="trim">|</span>
          <a @click="toByFollowList">{{userInfo.bfosize}}个粉丝</a>
        </p>
      </div>
      <slot name="down"></slot>
    </section>
</template>

<script>
    import {imgBaseUrl} from '../../until/config';

    export default {
      data(){
        return{
          imgBaseUrl:''
        }
      },
      props:['userInfo','token'],
      mounted(){
        this.imgBaseUrl = imgBaseUrl;
      },
      methods:{
        toFollowList(){
          this.$router.push('/user/followList/'+this.userInfo._id);
        },
        toByFollowList(){
          this.$router.push('/user/byFollowList/'+this.userInfo._id);
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .slef-index{
    .flex;
    flex-direction: column;
    padding: 20px;
    background: #fff;
    .img-box{
      margin-top: 20px;
      .head-img {
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        border: 1px solid #eee;
      }
    }
    .smiple-box{
      text-align: center;
      .nickname{
        font-weight: 500;
        font-size: 24px;
      }
      .synopsis{
        font-size: 14px;
      }
      .follow{
        .trim{
          color: @theme-color;
          margin: 10px;
          font-size: 16px;
        }
        a{
          color: @theme-color;
          font-size: 12px;
        }
      }
      p{
        margin-bottom: 10px;
      }
    }
    .login-btn{
      color: @theme-color;
    }
  }
</style>
