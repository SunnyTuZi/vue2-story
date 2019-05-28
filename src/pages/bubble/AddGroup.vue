<!--
 * Create by Zwl on 2019/5/17
 * @Description:
-->

<template>
  <div class="box">
    <my-mt-header title="添加分组"></my-mt-header>
    <div class="form-box">
      <mt-field label="分组名称" placeholder="请输入分组名称名" v-model="groupForm.groupName" type="text"></mt-field>
      <mt-field label="限制人数" placeholder="请输入限制人数" v-model="groupForm.staff" type="number"></mt-field>
    </div>
    <div class="btn-box">
      <p class="tips">*请文明聊天，群里的一切聊天，群主负主要责任</p>
      <p class="tips">*群组最多存在一个小时，一个小时后自动解散</p>
      <mt-button type="primary" class="login-btn" @click="createGroup()">创建</mt-button>
    </div>
  </div>
</template>

<script>

  import {groupAdd} from "../../service/apiList";
  import {mapState} from 'vuex'

  export default {
    data(){
      return{
        groupForm:{
          userId:'',
          groupName:'',
          staff:''
        }
      }
    },
    mounted(){
      this.groupForm.userId = this.userInfo._id;
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      async createGroup(){
        if(this.groupForm.groupName == ''){
          this.$toast({
            message:'请输入分组名称',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        if(this.groupForm.staff == ''){
          this.$toast({
            message:'请输入限制人数',
            position: 'middle',
            duration: 2000
          });
          return;
        }
        let result = await groupAdd(this.groupForm);
        if(result){
          this.$router.push('/bubble/list');
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
