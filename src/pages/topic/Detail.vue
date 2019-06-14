<!--
 * Create by Zwl on 2019/6/14
 * @Description: 话题详情
-->

<template>
  <section class="box">
    <my-mt-header :title="topics.topicName"></my-mt-header>
    <div class="topic-info">
      <div class="detail">
        <div class="img-box">
          <img :src="imgBaseUrl+topics.topicImg" alt="" class="topic-img" />
        </div>
        <div class="topic-con">
          <div class="name">{{topics.topicName}}</div>
          <div class="info">{{topics.topicInfo}}</div>
        </div>
      </div>
      <div class="hander-box">
        <a class="btn">关注话题</a>
      </div>
    </div>

  </section>
</template>

<script>
  import {getTopicDeatil} from "../../service/apiList";
  import {imgBaseUrl} from "../../until/config";

  export default {
      data(){
        return{
          topicId:'',
          topics:'',
          imgBaseUrl:''
        }
      },
      mounted(){
        this.topicId = this.$route.params.id;
        this.imgBaseUrl = imgBaseUrl;
        this.getTopicDeatil();
      },
      methods:{
        async getTopicDeatil(){
          let res = await getTopicDeatil({id:this.topicId});
          if(res){
            this.topics = res.data;
          }
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
.box{
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
        .name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
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
      }
    }
  }

}
</style>
