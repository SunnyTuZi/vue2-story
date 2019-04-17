<!--
 * Create by Zwl on 2019/4/17
 * @Description:
-->

<template>
    <div class="box">
      <mt-header title="登陆/注册">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
      <mt-field label="用户名" placeholder="请输入用户名" type="text"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
      <mt-field label="验证码" placeholder="请输入验证码" type="text">
        <img :src="imgSrc" alt="">
      </mt-field>
    </div>
</template>

<script>
    export default {
        name: "Login.vue",
        data(){
          return{
            imgSrc: String
          }
        },
        mounted(){
          this.getCode();
        },
        methods:{
            getCode(){
                this.$axios.get('api/user/getCode').then((result) => {
                  this.imgSrc = result.data.code;
                });

            }
        }
    }
</script>

<style scoped>

</style>
