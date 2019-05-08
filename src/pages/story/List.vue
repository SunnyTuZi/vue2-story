<!--
 * Create by Zwl on 2019/4/24
 * @Description: 故事列表
-->

<template>
  <section class="box">
    <my-mt-header :leftSlot="'search'" :rightSlot="'send'" title="故事汇"></my-mt-header>
    <section class="story-article-list">
      <article class="story-cell" v-for="(item,index) in storyList" :key="item._id">
        <h1 class="title">{{item.storyName}}</h1>
        <div class="content">
          <div class="author">
            <div class="cell-list head">
              <router-link to="">
                <img class="img-head" :src="imgBaseUrl + item.userId.head" alt=""/>
              </router-link>
            </div>
            <div class="cell-list">
              <span class="name">{{item.userId.username}}</span>
            </div>
            <div class="cell-list">
              <span class="badge">{{item.userId.autograph}}</span>
            </div>
          </div>
          <div class="inner">
            <div class="inner-content" :class="{'hidden-content':!item._check }" v-html="item.storyContent"></div>
            <div class="inner-more-shadow" v-show="!item._check"></div>
            <div class="inner-more-btn">
              <a class="more-btn" @click="checkMore(index)">{{item._check ? '收起' : '更多'}}</a>
            </div>
          </div>
          <div class="send">发表于{{formatDate(item.createDate)}}</div>
        </div>
        <div class="handler">
          <span class="angree">
            <span class="good">
              <span class="iconfont icon-good" @click="supportStory(index, 1)" :class="{active:item.supportByUser == 1}"></span>
              {{item.goods}}
            </span>
            <span class="bad">
              <span class="iconfont icon-bad" @click="supportStory(index, 2)" :class="{active:item.supportByUser == 2}"></span>
              {{item.bads}}
            </span>
          </span>
          <span class="comment" @click="showComment(index)">
            <span v-show="!item.commentShow">
              <span class="iconfont icon-comment"></span>
              {{item.coms}}条评论
            </span>
             <span v-show="item.commentShow">
              <span class="iconfont icon-comment"></span>
              收起评论
            </span>
          </span>
          <span class="collect">
            <span class="iconfont icon-collect" :class="{'like-active':item.likeByUser}"  @click="likeStory(index)"></span>
              收藏
          </span>
        </div>
        <div class="comment-box" v-if="item.commentShow">
          <comment-list :commentList="item.commentList"></comment-list>
          <page-turner ref="page" :total="item.commentCount" @pageChange="commentPageChange(index)" v-if="item.commentCount > 1"></page-turner>
          <my-mt-comment ref="comment" @saveComent="commentAdd(index)"></my-mt-comment>
        </div>
      </article>
    </section>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {mapState} from 'vuex'

  export default {
    data(){
      return{
        storyList: [],
        imgBaseUrl: imgBaseUrl,
        com_page_size: 1
      }
    },
    mounted(){
      this.getStoryList();
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      /**
       * 获取故事列表
       */
      getStoryList(){
        this.$axios.post('api/story/getList',{userId: this.userInfo._id}).then(
          (result) =>{
            this.storyList = result.data.data;
          }
        )
      },
      /**
       * 更多和收起操作
       */
      checkMore(index){
        this.$set(this.storyList[index],'_check',!this.storyList[index]._check);
      },
      formatDate(date){
        return new Date(date).format('yyyy-MM-dd hh:mm');
      },
      /**
       * 点赞或者踩
       * @param storyId 故事ID
       * @param userId 用户ID
       * @param status 1：赞||2：踩
       */
      supportStory(index,status){
        let storyId = this.storyList[index]._id;
        let userId = this.userInfo._id;
        status = status == this.storyList[index].supportByUser ? 0 : status;
        this.$axios.post('api/story/support',{storyId,userId,status}).then(
          (result) =>{
            if(this.storyList[index].supportByUser == 1 ){
                this.storyList[index].goods--;
                if(status == 2){
                  this.storyList[index].bads++;
                }
            }else if(this.storyList[index].supportByUser == 2){
              this.storyList[index].bads--;
              if(status == 1){
                this.storyList[index].goods++;
              }
            }else{
              status == 1 ? this.storyList[index].goods++ : this.storyList[index].bads++;
            }
            this.storyList[index].supportByUser = status;

          }
        )
      },
      /**
       * 收藏故事
       * @param index 故事列表的序号
       */
      likeStory(index){
        let status = this.storyList[index].likeByUser == 1 ? 0 : 1;
        const likeForm = {
          storyId: this.storyList[index]._id,
          userId: this.userInfo._id,
          status: status
        }
        this.$axios.post('api/story/like',likeForm).then(
          result =>{
            this.$set(this.storyList[index],'likeByUser',likeForm.status);
          }
        )
      },
      /**
       * 发表评论
       * @param index 故事列表的序号
       */
      commentAdd(index){
        const commentForm = {
          userId: this.userInfo._id,
          storyId: this.storyList[index]._id,
          commentText: this.$refs.comment[index].commentText
        }
        this.$axios.post('api/story/commentAdd',commentForm).then(
          result => {
            var comment = Object.assign(result.data.data,
              {userId:{_id:this.userInfo._id,username: this.userInfo.username, head: this.userInfo.head, sex: this.userInfo.sex}}
            );
            this.storyList[index].commentList.push(comment);
            this.$refs.comment[index].commentText = '';
          }
        )
      },
      /**
       * 展示评论
       * @param index 故事列表的序号
       */
      showComment(index){
        this.$axios.post('api/story/getComentList',{storyId:this.storyList[index]._id,page_no: 1,page_size: this.com_page_size}).then( result => {
          this.$set(this.storyList[index],'commentList',result.data.data)
          this.$set(this.storyList[index],'commentShow',!this.storyList[index].commentShow)
        });
        this.getCommnetTotal(index);
      },
      /**
       * 评论翻页
       * @param index 页码
       */
      commentPageChange(index){
        let page_no = this.$refs.page[index].myCurrent || 1;
        this.$axios.post('api/story/getComentList',{storyId:this.storyList[index]._id,page_no: page_no,page_size:  this.com_page_size}).then( result => {
          this.$set(this.storyList[index],'commentList',result.data.data)
        });
      },
      getCommnetTotal(index){
        this.$axios.post('api/story/getCommentTotalByStory',{storyId:this.storyList[index]._id}).then( result => {
          let total = Math.ceil(result.data.count/this.com_page_size);
          this.$set(this.storyList[index],'commentCount',total);
        });
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";

  .story-cell {
    padding: 20px;
    background: #fff;
    margin-bottom: 20px;
    .border-bottom;
    .title {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
      color: #259;
    }
    .content {
      margin-bottom: 10px;
      .author {
        display: flex;
        flex-direction: row;
        align-items: center;
        height: 50px;
        .cell-list {
          .name {
            font-size: 14px;
          }
          .badge {
            margin-left: 10px;
            font-size: 12px;
            color: #999;
          }
        }
        .head {
          .img-head {
            display: inline-block;
            .img-raduis(30px, #ddd);
          }
        }
      }
      .inner{
        line-height: 20px;
        font-size: 14px;
        margin-bottom: 10px;
        position: relative;
        .hidden-content{
          overflow: hidden;
          height: 150px;
        }
        .inner-content{
          line-height: 25px !important;
        }
        .inner-more-shadow{
          position: absolute;
          bottom: 20px;
          width: 100%;
          height: 40px;
          background: rgba(255,255,255,.8);
          filter: blur(1px);
          text-align: right;
        }
        .inner-more-btn{
          text-align: right;
          .more-btn{
            font-size: 14px;
            color: @theme-color;
          }
        }

      }
      .send{
        font-size: 14px;
        color: #999;
      }
    }
    .handler {
      display: flex;
      flex-direction: row;
      align-items: center;
      .angree {
        margin-right: 20px;
        .good {
          margin-right: 10px;
        }
      }
      .iconfont{
        color: #999;
        font-size: 16px;
      }
      .collect{
        flex: 1;
        text-align: right;
      }
      span{
        font-size: 14px;
      }
    }
    .like-active{
      color: #ef7051  !important;
    }
  }
</style>
