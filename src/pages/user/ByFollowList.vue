<!--
 * Create by Zwl on 2019/6/19
 * @Description: 粉丝列表
-->

<template>
  <section class="box">
    <my-mt-header title="粉丝用户列表"></my-mt-header>
    <div class="user-list">
      <user-item v-for="item in dataArr" :user="item.userId" :key="item._id" class="item"></user-item>
    </div>
  </section>
</template>

<script>
  import {getByFollowList} from "../../service/apiList";
  export default {
    data(){
      return{
        dataArr:[],
        userId: ''
      }
    },
    mounted(){
      this.userId = this.$route.params.id;
      this.getByFollowList();
    },
    methods:{
      async getByFollowList(){
        let result = await getByFollowList({userId:this.userId});
        if(result){
          this.dataArr = result.data;
        }
      }
    }

  }
</script>

<style scoped lang="less">
  .user-list{
    background-color: #fff;
    .item{
      border-bottom: 1px solid #ddd;
      padding: 5px 10px;
    }
  }
</style>
