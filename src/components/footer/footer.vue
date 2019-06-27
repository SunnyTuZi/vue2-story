<!--
 * Create by Zwl on 2019/4/15
 * @Description:
-->

<template>
  <footer class="footer-box">
    <mt-tabbar>
      <mt-tab-item id="index" :class="{'is-selected':$route.path.indexOf('story') != -1}">
        <router-link to="/">
          <span class="iconfont icon-index"></span>
          <span class="con">首页</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="topic" :class="{'is-selected':$route.path.indexOf('topic') != -1}">
        <router-link to="/index/topic/list">
          <span class="iconfont icon-topic"></span>
          <span class="con">话题</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="bubble" :class="{'is-selected':$route.path.indexOf('bubble') != -1}">
        <router-link to="/index/bubble/list">
          <span class="iconfont icon-bubble"></span>
          <span class="con">广场</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="msg" class="msg" :class="{'is-selected':$route.path.indexOf('msg') != -1}">
        <router-link to="/index/msg/list">
          <span class="iconfont icon-msg"></span>
          <span class="con">消息</span>
          <span class="num" v-if="unNum>0">{{unNum}}</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="me" :class="{'is-selected':$route.path.indexOf('user') != -1}">
        <router-link to="/index/user">
          <span class="iconfont icon-me"></span>
          <span class="con">我的</span>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script>
  import {getUnReadMsgNum} from "../../service/apiList";
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        selected: 'index',
        unNum:0
      }
    },
    mounted(){
      this.getUnReadMsgNum();
      if(this.token){
        //监听用户登录后接受私聊信息
        this.$socket.emit('login',this.userInfo);
        this.$socket.on('privateChatMsg',()=>{
          this.getUnReadMsgNum();
        });
      }
      if(this.$route.path.indexOf('story') != -1){
        this.selected = 'index';
      }else{
        this.selected = this.menu;
      }

    },
    computed:{
      ...mapState(['userInfo','token','menu'])
    },
    methods:{
      async getUnReadMsgNum(){
        let res = await getUnReadMsgNum({_id:this.userInfo._id});
        if(res){
          this.unNum = res.data;
        }
      }
    }

  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .footer-box {
    .msg{
      position: relative;
      .num{
        .msg-tips(16px);
        position: absolute;
        top: 8px;
        left: 40px;
      }
    }
    .iconfont {
      display: block;
      font-size: 24px;
      margin-bottom: 5px;
    }
    .con{
      font-size: 14px;
    }
    .is-selected{
      .iconfont,.con{
        color: @theme-color;
      }

    }
  }

</style>
