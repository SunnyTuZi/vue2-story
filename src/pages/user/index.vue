<!--
 * Create by Zwl on 2019/4/15
 * @Description: 用户主页
-->

<template>
  <section class="user-box">
    <div class="user-head item-list">
      <p class="img-box"><img :src="userInfo.head ? imgBaseUrl + userInfo.head:''" alt="" class="head-img"/></p>
      <div class="smiple-box" v-if="token">
        <p class="nickname">SunnyTuZi</p>
        <p class="synopsis">人生的起点不是出生那一刻，而是你感悟到你活着的意义那一瞬间！</p>
        <p class="follow">
          <a>10人关注</a>
          <span class="trim">|</span>
          <a>10个粉丝</a>
        </p>
      </div>
      <router-link to="/user/login" class="login-btn" v-if="!token">登录/注册</router-link>
    </div>
    <div class="user-info item-list">
      <router-link to="./user/edit"><mt-cell title="基本信息" is-link></mt-cell></router-link>
      <mt-cell-detail label="性别" value="男"></mt-cell-detail>
      <mt-cell-detail label="年龄" value="25" ></mt-cell-detail>
      <mt-cell-detail label="邮箱" value="919869469@qq.com"></mt-cell-detail>
      <mt-cell-detail label="所在地" value="广州天河"></mt-cell-detail>
      <mt-cell-detail label="创建时间" value="2019-02-25" class="border-bottom"></mt-cell-detail>
      <router-link to="./user/dynamic"><mt-cell title="我的动态" is-link></mt-cell></router-link>
      <router-link to="./user/dynamic"><mt-cell title="我的话题关注" is-link></mt-cell></router-link>
    </div>
  </section>
</template>

<script>
  import MtCellDetail from '@/components/cellDetail/cellDetail';
  import {mapState} from 'vuex'
  import {imgBaseUrl} from '../../until/config'
  export default {
    name: "index",
    data(){
      return{
        tokenStatus: false,
        imgBaseUrl: imgBaseUrl
      }
    },
    mounted(){

    },
    computed:{
      ...mapState(['token','userInfo'])
    },
    components:{
      MtCellDetail
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .user-box {
    width: 100%;
    .user-head {
      .flex;
      flex-direction: column;
      padding: 20px;
      background: #fff;
      box-shadow: 1px 1px 1px #ddd;
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

    .item-list{
      background: #fff;
      margin-bottom: 20px;
      .bottom-shadow;
    }
  }
</style>
