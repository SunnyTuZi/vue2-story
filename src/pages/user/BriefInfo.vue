<!--
 * Create by Zwl on 2019/6/11
 * @Description: 个人简介
-->

<template>
  <section class="box">
    <my-mt-header :title="user.username+'的个人主页'"></my-mt-header>
    <user-index :userInfo="user" :token="true">
      <div class="hander-btn" slot="down">
        <a class="follow-btn" @click="followUser">{{user.isfosize == 1 ? '取消关注':'关注TA'}}</a>
        <a class="send-btn" @click="toChatByUser">私信TA</a>
      </div>
    </user-index>
    <div class="item-list">
      <mt-cell title="基本信息" is-link class="user-info"></mt-cell>
      <mt-cell-detail label="性别" :value="userInfo.sex == 1 ? '男' : '女'"></mt-cell-detail>
      <mt-cell-detail label="出生年月" :value="userInfo.dateOfBirth" ></mt-cell-detail>
      <mt-cell-detail label="邮箱" :value="userInfo.email"></mt-cell-detail>
      <mt-cell-detail label="所在地" :value="userInfo.address"></mt-cell-detail>
      <mt-cell-detail label="创建时间" value="2019-02-25" class="border-bottom"></mt-cell-detail>
    </div>
  </section>
</template>

<script>
  import {getUserInfo,followUser} from "../../service/apiList";
  import {mapState} from 'vuex';
  import MtCellDetail from '@/components/cellDetail/cellDetail';

  export default {
    data() {
      return {
        userId: '',
        user: ''
      }
    },
    mounted() {
      this.userId = this.$route.params.id;
      this.getUserInfo();
    },
    computed:{
      ...mapState(['userInfo'])
    },
    components:{
      MtCellDetail
    },
    methods: {
      async getUserInfo() {
        let res = await getUserInfo({userId: this.userId,followUserId:this.userInfo._id});
        if (res) {
          this.user = res.data;
        }
      },
      async followUser(){
        let status = this.user.isfosize == 0 ? 1 : 0 ;
        let res = await followUser({userId:this.userInfo._id,followUserId:this.user._id,status:status});
        if(res){
          this.$set(this.user,'isfosize',status);
          status == 1 ? this.user.bfosize++ : this.user.bfosize--;
          this.$toast({
            message:res.msg
          });
        }
      },
      toChatByUser(){
        this.$router.push('/user/chat/'+this.user._id+'/'+this.user.username);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .box {
    .hander-btn {
      text-align: center;
      .follow-btn {
        .com-btn(#fff,@theme-color);
      }
      .send-btn {
        .com-btn(#fff,@theme-color);
        margin-left: 30px;
      }
    }
    .item-list{
      background: #fff;
      margin-top: 20px;
      .bottom-shadow;
      .user-info{
        border-bottom: 1px solid #ddd;
      }
    }
  }
</style>
