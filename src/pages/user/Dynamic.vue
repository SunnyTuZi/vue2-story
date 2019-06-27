<!--
 * Create by Zwl on 2019/4/18
 * @Description:
-->

<template>
  <div class="box">
    <my-mt-header title="我的动态"></my-mt-header>
    <div class="user-dynamic item-list">
      <mt-navbar v-model="selected" :fixed="isFixed">
        <mt-tab-item id="1"><span class="tab-name">动态</span></mt-tab-item>
        <mt-tab-item id="2"><span class="tab-name">发表</span></mt-tab-item>
        <mt-tab-item id="3"><span class="tab-name">评论</span></mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" :swipeable="isSwiper" class="tab-container">
        <mt-tab-container-item id="1">
          <div class="comment-item" v-for="item in supportList" :key="item._id">
            <div class="date">{{formatDate(item.createDate)}}</div>
            <div class="info" v-if="item.user._id == userInfo._id">您点赞了<a>《{{item.story.storyName}}》</a></div>
            <div class="info" v-if="item.user._id != userInfo._id">{{item.user.username}}点赞了您发表的<a>《{{item.story.storyName}}》</a></div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <story-item :story="item" v-for="item in storyList" :key="item._id"></story-item>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <div class="comment-item" v-for="item in commenList" :key="item._id">
            <div class="date">{{formatDate(item.createDate)}}</div>
            <div class="info" v-if="item.user._id == userInfo._id">您在<a>《{{item.story.storyName}}》</a>中评论了：</div>
            <div class="info" v-if="item.user._id != userInfo._id">{{item.user.username}}在您发表的<a>《{{item.story.storyName}}》</a>中评论了：</div>
            <div class="text" v-html="item.commentText"></div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  import {getStoryList,getCommentByUser,getMySupport} from "../../service/apiList";
  import {mapState} from 'vuex';

  export default {
    data(){
      return{
        selected: '1',
        storyList:[],
        commenList:[],
        supportList:[],
        isSwiper:true,
        isFixed:true,
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    mounted(){
      this.getStoryList();
      this.getCommentByUser();
      this.getMySupport();
    },
    methods:{
      async getStoryList(){
        let result = await getStoryList({isSelf:true,userId:this.userInfo._id});
        if(result){
          this.storyList = result.data;
        }
      },
      async getCommentByUser(){
        let result = await getCommentByUser({userId:this.userInfo._id});
        if(result){
          this.commenList = result.data;
        }
      },
      async getMySupport(){
        let result = await getMySupport({userId:this.userInfo._id});
        if(result){
          this.supportList = result.data;
        }
      },
      formatDate(date){
        return new Date(date).format('yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../public/style/mixin";
  .user-dynamic {
    font-size: 14px !important;
    height: 100%;
    overflow-y: auto;
    .mint-navbar.is-fixed{
      top: 40px;
    }
    .tab-name {
      font-size: 14px;
    }
    .mint-navbar .mint-tab-item.is-selected {
      margin-bottom: 0;
      .tab-name {
        color: @theme-color;
      }
    }
    .tab-container{
      padding-top: 51px;
      margin-top: 10px;
      .comment-item{
        background: #fff;
        margin-bottom: 20px;
        padding: 10px;
        .date{
          color: #999;
          font-size: 12px;
        }
        .info{
          margin-top: 5px;
          font-size: 14px;
          a{
            font-size: 14px;
            color: @theme-color;
          }
        }
        .text{
          margin-top: 5px;
          padding: 5px;
          font-size: 14px;
          background-color: #fafafa;
        }
      }
    }
  }
</style>
