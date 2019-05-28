<!--
 * Create by Zwl on 2019/4/17
 * @Description:
-->

<template>
    <div class="box">
      <my-mt-header title="登陆/注册"></my-mt-header>
      <div class="form-box">
        <mt-field label="用户名" placeholder="请输入用户名" v-model="loginForm.account" type="text"></mt-field>
        <mt-field label="密码" placeholder="请输入密码" v-model="loginForm.psw" type="password"></mt-field>
        <mt-field label="验证码" placeholder="请输入验证码" v-model="loginForm.code" type="text">
          <img :src="imgSrc" alt="">
        </mt-field>
      </div>
      <div class="btn-box">
        <p class="tips">*若账号不存在，将直接注册登录</p>
        <mt-button type="primary" class="login-btn" @click="login">登录</mt-button>
        <p class="forget-psw">
          <router-link to="/user/updatePsw" class="con">忘记密码？</router-link>
        </p>
      </div>

    </div>
</template>

<script>
    import {mapMutations} from 'vuex'
    import {setStore} from "../../until/localStorage";
    import {login,getCode} from "../../service/apiList";

    export default {
        name: "login",
        data(){
          return{
            imgSrc: '',
            loginForm:{
              account: '',
              psw: '',
              code: ''
            }
          }
        },
        mounted(){
          this.getCode();
        },

        methods:{
            ...mapMutations(['SET_TOKEN','SET_USERINFO']),
            async getCode(){
              let result = await getCode();
              if(result){
                this.imgSrc = result.codeImg;
              }
            },
            async login(){
              let result = await login(this.loginForm);
              if(result) {
                this.SET_TOKEN(result.token);
                this.SET_USERINFO(result.data);
                setStore('userInfo', result.data);
                setStore('token', result.token);
                this.$router.back(- 1);
              }
            }
        }
    }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .box {
    .form-box {
      margin-top: 20px;
      padding: 0 20px;
      background: #fff;
      .mint-cell {
        .border-bottom;
        &:last-child{
          border: none;
        }
      }
    }
    .btn-box{
      padding: 0 20px;
      .tips {
        min-height: 40px;
        color: #ff2222;
        line-height: 40px;
        font-size: 14px;
      }
      .login-btn{
        width: 100%;
      }
      .forget-psw{
        margin-top: 20px;
        text-align: right;
        .con{
          color: #999;
        }
      }
    }

  }

</style>
