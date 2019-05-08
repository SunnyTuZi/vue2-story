<!--
 * Create by Zwl on 2019/5/7
 * @Description: 评论组件
-->

<template>
  <section class="comment-box">
    <div class="comment-item comment-content">
      <div class="placeholder-text" @click="foucsInComment" v-show="placeholder_show">{{placeholder}}</div>
      <div contenteditable="true" class="comment-text" ref="comment" @focus="focusComment()" @keyup="writeComment()"></div>
    </div>
    <div class="comment-item comment-btn">
      <mt-button type="primary" class="send-btn" size="small" @click="saveComent()">提交</mt-button>
    </div>
  </section>

</template>

<script>
  export default {
    data(){
      return{
        placeholder_show: true,
        commentText:''
      }
    },
    props:{
      placeholder:{
        type: String,
        default: '请输入评论吧~~'
      }
    },
    methods:{
      focusComment(){
        if(this.$refs.comment.innerHTML == ''){
          this.$refs.comment.innerHTML = '<div class="comment-list"><br/></div>';
        }
      },
      foucsInComment(){
        this.$refs.comment.focus();
      },
      writeComment(){
        if(this.$refs.comment.innerHTML != ''){
          this.commentText = this.$refs.comment.innerHTML;
          this.placeholder_show = false;
        }else{
          this.placeholder_show = true;
        }
      },
      saveComent(){
        this.$emit('saveComent');
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .comment-box {
    margin: 10px 0;
    .comment-item{
      margin-top: 10px;
    }
    .comment-content{
      position: relative;
      .placeholder-text{
        position: absolute;
        left: 5px;
        top: 10px;
        color: #888;
      }
      .comment-text{
        width: 100%;
        min-height: 30px;
        line-height: 30px;
        border-radius: 5px;
        padding: 5px;
        .border;
      }
    }

    .comment-btn{
      text-align: right;
    }
  }
</style>
