<!--
 * Create by Zwl on 2019/5/7
 * @Description: 评论列表
-->

<template>
  <section class="comment-list">
    <div class="title">共有{{total}}条评论</div>
    <div v-if="commentList.length == 0" class="tips">沙发空着~来做第一个沙发吧~</div>
    <div class="comment-item" v-for="item in commentList">
      <div class="user">
        <img :src="imgBaseUrl+item.userId.head" alt="" class="head">
        <span class="name">{{item.userId.username}}</span>
      </div>
      <div class="comment" v-html="item.commentText"></div>
    </div>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";

  export default {
    data() {
      return {
        imgBaseUrl: imgBaseUrl
      }
    },
    props: [ 'commentList','total' ],
    mounted() {

    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .comment-list {
    margin-top: 20px;
    border-top: 1px solid #f2f2f2;
    .title{
      font-weight:bold;
      line-height: 40px;
      border-bottom: 1px solid #f2f2f2;
    }
    .tips{
      margin-top: 10px;
    }
    .comment-item {
      padding: 10px 0;
      border-bottom: 1px solid #f2f2f2;
      font-size: 14px;
      .user {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        .head {
          .img-raduis(30px, #eee);
          margin-right: 10px;
        }
      }
      .comment{
        margin-bottom: 10px;
      }
    }
  }
</style>
