<!--
 * Create by Zwl on 2019/4/17
 * @Description:
-->

<template>
    <div class="box">
      <mt-header title="登陆/注册">
        <router-link to="" slot="left">
          <mt-button icon="back" @click="$router.back(-1)"></mt-button>
        </router-link>
      </mt-header>
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
            ...mapMutations(['SET_TOKEN','GET_USERINFO']),
            getCode(){
                this.$axios.get('api/user/getCode').then((result) => {
                  this.imgSrc = result.data.code;
                });
            },
            login(){
              this.$axios.post('api/user/login', this.loginForm).then((result) =>{
                  if(result.data.status == 200){
                    this.SET_TOKEN(result.data.token);
                    this.GET_USERINFO(result.data.data);
                    setStore('userInfo',result.data.data);
                    setStore('token',result.data.token);
                    this.$router.back(-1);
                  }else if(result.data.status == 500){
                    this.$toast({
                      message: result.data.msg,
                      position: 'middle',
                      duration: 2000
                    });
                  }
              });
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
