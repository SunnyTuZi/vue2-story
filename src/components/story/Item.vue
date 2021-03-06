<!--
 * Create by Zwl on 2019/6/18
 * @Description: 列表组件
-->

<template>
  <section>
    <!--v-if是为了初始化的时候值为undefined-->
    <article class="story-cell" v-if="story._id">
      <h1>
        <router-link :to="'/story/detail/'+story._id" class="title">
          {{story.storyName}}
        </router-link>
      </h1>
      <div class="content">
        <div class="author">
          <div class="cell-list head">
            <router-link :to="'/user/briefInfo/'+story.userId._id">
              <img class="img-head" :src="imgBaseUrl + story.userId.head" alt=""/>
            </router-link>
          </div>
          <div class="cell-list">
            <span class="name">{{story.userId.username}}</span>
          </div>
          <div class="cell-list">
            <span class="badge">{{story.userId.autograph}}</span>
          </div>
        </div>
        <div class="inner" v-if="!isDetail">
          <div class="inner-content" :class="{'hidden-content':!story._check }" v-html="story.storyContent"></div>
          <div class="inner-more-shadow" v-show="!story._check"></div>
          <div class="inner-more-btn">
            <a class="more-btn" @click="checkMore(story)">{{story._check ? '收起' : '更多'}}</a>
          </div>
        </div>
        <div class="inner" v-if="isDetail">
          <div class="inner-content" v-html="story.storyContent"></div>
        </div>
        <div class="send">发表于{{formatDate(story.createDate)}}</div>
      </div>
      <div class="handler">
          <span class="angree">
            <span class="good">
              <span class="iconfont icon-good" @click="supportStory(story, 1)"
                    :class="{active:story.supportByUser == 1}"></span>
              {{story.goods}}
            </span>
            <span class="bad">
              <span class="iconfont icon-bad" @click="supportStory(story, 2)"
                    :class="{active:story.supportByUser == 2}"></span>
              {{story.bads}}
            </span>
          </span>
        <span class="comment" @click="showComment(story)">
            <span v-show="!story.commentShow">
              <span class="iconfont icon-comment"></span>
              {{story.coms}}条评论
            </span>
             <span v-show="story.commentShow">
              <span class="iconfont icon-comment"></span>
              收起评论
            </span>
          </span>
        <span class="collect">
            <span class="iconfont icon-collect" :class="{'like-active':story.likeByUser}"
                  @click="likeStory(story)"></span>
              收藏
          </span>
      </div>
      <div class="comment-box" v-show="story.commentShow">
        <comment-list :commentList="story.commentList||[]" :total="story.coms"></comment-list>
        <page-turner :ref="'page'+story._id" :total="story.commentCount" @pageChange="commentPageChange(story)"
                     v-if="story.commentCount > 1"></page-turner>
        <my-mt-comment :ref="'comment'+story._id" @saveComent="commentAdd(story)" ></my-mt-comment>
      </div>
    </article>
  </section>
</template>

<script>
  import {imgBaseUrl} from "../../until/config";
  import {mapState} from 'vuex';
  import {
    getCommentList,
    getCommentToal,
    likeStory,
    supportStory,
    commentAdd
  } from "../../service/apiList";
  export default {
    data() {
      return {
        imgBaseUrl:'',
        com_page_size: 5,
        c_content:''
      }
    },
    props: {
      story:{
        _id:''
      },
      isDetail:{
        default:false,
        type:Boolean
      }
    },
    mounted(){
      this.imgBaseUrl = imgBaseUrl;
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      /**
       * 更多和收起操作
       */
      checkMore(item){
        this.$set(item,'_check',!item._check);
      },

      /**
       * 点赞或者踩
       * @param storyId 故事ID
       * @param userId 用户ID
       * @param status 1：赞||2：踩
       */
      async supportStory(item,status){
        let storyId = item._id;
        let userId = this.userInfo._id;
        status = status == item.supportByUser ? 0 : status;
        let result = await supportStory({storyId,userId,status});
        if(result){
          //如果用户原来的状态是点赞
          if(item.supportByUser == 1 ){
            //点赞的话就减少1
            item.goods--;
            //如果是此次操作是踩的话踩加1
            if(status == 2){
              item.bads++;
            }
          }
          //如果用户原来的状态是踩
          else if(item.supportByUser == 2){
            //踩的话就是取消踩，踩数量减少1
            item.bads--;
            //赞的话就是赞数量加1
            if(status == 1){
              item.goods++;
            }
          }else{
            //如果用户原来的状态是无状态，操作的自行加1
            status == 1 ? item.goods++ : item.bads++;
          }
          item.supportByUser = status;
        }
      },
      /**
       * 收藏故事
       * @param index 故事列表的序号
       */
      async likeStory(item){
        let status = item.likeByUser == 1 ? 0 : 1;
        const likeForm = {
          storyId: item._id,
          userId: this.userInfo._id,
          status: status
        }
        let result = await likeStory(likeForm);
        if(result){
          this.$set(item,'likeByUser',likeForm.status);
        }
      },
      /**
       * 发表评论
       * @param index 故事列表的序号
       */
      async commentAdd(item){
        const commentForm = {
          userId: this.userInfo._id,
          storyId: item._id,
          commentText: this.$refs['comment'+item._id][0].commentText
        }
        let result = await commentAdd(commentForm);
        if(result){
          var comment = Object.assign(result.data,
            {userId:{_id:this.userInfo._id,username: this.userInfo.username, head: this.userInfo.head, sex: this.userInfo.sex}}
          );
          item.coms += 1;
          item.commentList.unshift(comment);
          item.commentList.pop();
          this.$refs['comment'+item._id][0].commentText = '';
        }
      },
      /**
       * 展示评论
       * @param index 故事列表的序号
       */
      async showComment(item){
        //设置评论区的开关状态
        this.$set(item,'commentShow',!item.commentShow);
        //如果以前打开过，就return，方便下次打开记录内容不至于重新刷新
        if(item.isOpen) return;
        const params = {
          storyId:item._id,
          page_no: 1,
          page_size: this.com_page_size
        }
        let result = await getCommentList(params);
        if(result){
          this.$set(item,'commentList',result.data);
          item.isOpen = true;
          this.getCommnetTotal(item);
        }
      },
      /**
       * 评论翻页
       * @param index 页码
       */
      async commentPageChange(item){
        let page_no = this.$refs['page'+item._id].myCurrent || 1;

        const params = {
          storyId:item._id,
          page_no: page_no,
          page_size: this.com_page_size
        }
        let result = await getCommentList(params);
        if(result){
          this.$set(item,'commentList',result.data)
        }
      },
      /**
       * 获取评论总数用于分页
       * @param index
       */
      async getCommnetTotal(item){
        const params = {
          storyId:item._id
        }
        let result = await getCommentToal(params);
        if(result){
          let total = Math.ceil(result.count/this.com_page_size);
          this.$set(item,'commentCount',total);
        }
      },
      formatDate(date){
        return new Date(date).format('yyyy-MM-dd hh:mm');
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
            margin-left: 5px;
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
      .inner {
        line-height: 20px;
        font-size: 14px;
        margin-bottom: 10px;
        position: relative;
        .hidden-content {
          overflow: hidden;
          height: 150px;
        }
        .inner-content {
          line-height: 25px !important;
        }
        .inner-more-shadow {
          position: absolute;
          bottom: 20px;
          width: 100%;
          height: 40px;
          background: rgba(255, 255, 255, .8);
          filter: blur(1px);
          text-align: right;
        }
        .inner-more-btn {
          text-align: right;
          .more-btn {
            font-size: 14px;
            color: @theme-color;
          }
        }

      }
      .send {
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
      .iconfont {
        color: #999;
        font-size: 16px;
      }
      .collect {
        flex: 1;
        text-align: right;
      }
      span {
        font-size: 14px;
      }
    }
    .like-active {
      color: #ef7051 !important;
    }
  }
</style>
