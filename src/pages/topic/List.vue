<!--
 * Create by Zwl on 2019/6/14
 * @Description: 话题列表
-->

<template>
  <section class="box">
    <my-mt-header title="话题列表" leftSlot=""></my-mt-header>
    <ul>
      <li v-for="item in topicList" @click="toTopic(item)">
        <div class="top-head">
          <img :src="imgBaseUrl+item.topicImg" alt="">
        </div>
        <div class="topic-name">
          <p class="name">{{item.topicName}}</p>
          <p class="info">简介：{{item.topicInfo}}</p>
        </div>
        <div class="topic-num">
          关注人数0
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {getTopicList} from "../../service/apiList";

  export default {
    data(){
      return{
        topicList:[],
        imgBaseUrl:''
      }
    },
    mounted(){
      this.imgBaseUrl = imgBaseUrl;
      this.getTopicList();
    },
    methods:{
      async getTopicList(){
        let res = await getTopicList();
        if(res){
          this.topicList = res.data;
        }
      },
      toTopic(item){
        this.$router.push('/topic/detail/'+item._id);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .box {
    ul {
      li {
        display: flex;
        flex-direction: row;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        align-items: center;
        .top-head {
          width: 40px;
          img {
            .img-raduis(40px,#ddd);
          }
        }
        .topic-name{
          margin-left: 10px;
          font-size: 14px;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          .name{
            color: @theme-color;
            font-size: 14px;
          }
          .info{
            width: 200px;
            color: #999;
            font-size: 12px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .topic-num{
          width: 100px;
          text-align: right;
          font-size: 12px;
          color: @theme-color;

        }
      }
    }
  }
</style>
