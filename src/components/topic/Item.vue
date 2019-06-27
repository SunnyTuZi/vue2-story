<!--
 * Create by Zwl on 2019/6/20
 * @Description:
-->

<template>
  <section>
    <div class="topic-item" @click="toTopic">
      <div class="top-head">
        <img :src="imgBaseUrl+topics.topicImg" alt="">
      </div>
      <div class="topic-name">
        <p class="name">{{topics.topicName}}</p>
        <p class="info">简介：{{topics.topicInfo}}</p>
      </div>
      <div class="topic-num">
        关注人数{{topics.size}}人
      </div>
    </div>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";

  export default {
    data() {
      return{
        imgBaseUrl:''
      }
    },
    props: [ 'topics' ],
    mounted() {
      this.imgBaseUrl = imgBaseUrl;
    },
    methods:{
      toTopic(){
        this.$router.push('/topic/detail/'+this.topics._id);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .topic-item {
    display: flex;
    flex-direction: row;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    align-items: center;
    background-color: #fff;
    .top-head {
      width: 40px;
      img {
        .img-raduis(40px, #ddd);
      }
    }
    .topic-name {
      margin-left: 10px;
      font-size: 14px;
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      .name {
        color: @theme-color;
        font-size: 14px;
      }
      .info {
        width: 200px;
        color: #999;
        font-size: 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .topic-num {
      width: 100px;
      text-align: right;
      font-size: 12px;
      color: @theme-color;

    }
  }
</style>
