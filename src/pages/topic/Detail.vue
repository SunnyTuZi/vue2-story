<!--
 * Create by Zwl on 2019/6/14
 * @Description: 话题详情
-->

<template>
  <section class="box">
    <my-mt-header :title="'#话题-'+topics.topicName"></my-mt-header>
    <div class="topic-info">
      <div class="detail">
        <div class="img-box">
          <img :src="imgBaseUrl+topics.topicImg" alt="" class="topic-img" />
        </div>
        <div class="topic-con">
          <div class="top-name">
            <span class="name">{{topics.topicName}}</span>
            <span class="num">关注人数{{topics.followsize}}人</span>
          </div>
          <div class="info">{{topics.topicInfo}}</div>
        </div>
      </div>
      <div class="hander-box">
        <a class="btn" @click="followTopic()">{{topics.isfollow == 0 ? '关注话题':'取消关注'}}</a>
        <a class="btn m-l-20" @click="sendStoryByTopic">发表故事</a>
      </div>
    </div>
    <div class="story-list">
      <story-item :story="item" v-for="item in storyList" :key="item._id"></story-item>
    </div>
  </section>
</template>

<script>
  import {getTopicDeatil,getStoryList,followTopic} from "../../service/apiList";
  import {imgBaseUrl} from "../../until/config";
  import {mapState} from 'vuex';

  export default {
      data(){
        return{
          topicId:'',
          topics:{
            topicName:'',
            topicImg:'',
            topicInfo:'',
            followsize:''

          },
          imgBaseUrl:'',
          storyList:[]
        }
      },
      mounted(){
        this.topicId = this.$route.params.id;
        this.imgBaseUrl = imgBaseUrl;
        this.getTopicDeatil();
        this.getStoryList();
      },
      computed:{
        ...mapState(['userInfo'])
      },
      methods:{
        async getTopicDeatil(){
          let res = await getTopicDeatil({topicId:this.topicId,userId:this.userInfo._id});
          if(res){
            this.topics = res.data;
          }
        },
        sendStoryByTopic(){
          this.$router.push('/story/add/'+this.topicId);
        },
        async getStoryList(){
          let result = await getStoryList({userId:this.userInfo._id,topicId:this.topicId});
          if(result){
            this.storyList = result.data;
          }
        },
        async followTopic(){
          let status = this.topics.isfollow == 0 ? 1 : 0;
          let result = await followTopic({userId:this.userInfo._id,topicId:this.topicId,status:status});
          if(result){
            this.topics.isfollow = status;
            status == 0 ? this.topics.followsize--:this.topics.followsize++;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
.box{
  display: flex;
  flex-direction: column;
  .topic-info{
    padding: 10px;
    background-color: #fff;
    .detail {
      display: flex;
      flex-direction: row;
      .img-box {
        width: 80px;
        .topic-img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
      }
      .topic-con {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 5px;
        .top-name {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-bottom: 5px;
          .name{
            font-size: 18px;
            font-weight: bold;
            flex-grow: 1;
          }
          .num{
            width: 100px;
            font-size: 12px;
            color: @theme-color;
            text-align: right;
          }
        }
        .info {
          font-size: 12px;
          color: #999;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
    }
    .hander-box{
      margin-top: 10px;
      .btn{
        .com-btn(#fff,@theme-color);
        font-size: 12px;
        line-height: 30px;
        width: 80px;
      }
    }
  }
  .story-list{
    flex-grow: 1;
    margin-top: 20px;
    border-top: 1px solid #ddd;
    overflow-y: auto;
  }
}
</style>
