<!--
 * Create by Zwl on 2019/4/15
 * @Description: 用户主页
-->

<template>
  <section class="user-box">
    <div class="user-head item-list">
      <user-index :userInfo="userInfo" :token="token"></user-index>
      <router-link to="/user/login" class="login-btn" v-if="!token">登录/注册</router-link>
    </div>
    <div class="user-info item-list">
      <router-link to="/user/edit"><mt-cell title="基本信息" is-link></mt-cell></router-link>
      <!--<mt-cell-detail label="性别" :value="userInfo.sex == 1 ? '男' : '女'"></mt-cell-detail>-->
      <!--<mt-cell-detail label="出生年月" :value="userInfo.dateOfBirth" ></mt-cell-detail>-->
      <!--<mt-cell-detail label="邮箱" :value="userInfo.email"></mt-cell-detail>-->
      <!--<mt-cell-detail label="所在地" :value="userInfo.address"></mt-cell-detail>-->
      <!--<mt-cell-detail label="创建时间" value="2019-02-25" class="border-bottom"></mt-cell-detail>-->
      <router-link to="/user/myLike"><mt-cell title="我的收藏" is-link></mt-cell></router-link>
      <router-link to="/user/dynamic"><mt-cell title="我的动态" is-link></mt-cell></router-link>
      <router-link to="/user/myTopic"><mt-cell title="我关注的话题" is-link></mt-cell></router-link>
    </div>
    <div class="item-list">
      <mt-button type="danger" style="width: 100%" @click="longout">退出登录</mt-button>
    </div>
  </section>
</template>

<script>

  import {mapState,mapMutations} from 'vuex';
  import {imgBaseUrl} from '../../until/config';
  import {setStore} from "../../until/localStorage";
  import {getUserInfo} from "../../service/apiList";

  export default {
    name: "index",
    data(){
      return{
        tokenStatus: false,
        imgBaseUrl: imgBaseUrl,
        follows:''
      }
    },
    computed:{
      ...mapState(['token','userInfo','menu'])
    },
    mounted(){
      this.getFollow();
      this.$store.commit('SET_MENU','me');
    },
    methods:{
      ...mapMutations(['SET_USERINFO','SET_MENU']),
      longout(){
        setStore('token','');
        setStore('userInfo','');
        window.location.reload();
      },
      async getFollow(){
        let res = await getUserInfo({userId:this.userInfo._id});
        if(res){
          this.$store.commit('SET_USERINFO',res.data);
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .user-box {
    margin-top: -40px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
      margin-top: 20px;
      .bottom-shadow;
    }
  }
</style>
