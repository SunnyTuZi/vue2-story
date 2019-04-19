<!--
 * Create by Zwl on 2019/4/15
 * @Description:
-->

<template>
  <footer class="footer-box">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="index">
        <router-link to="/">
          <span class="iconfont icon-index"></span>
          <span class="con">首页</span>
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="topic">
        <span class="iconfont icon-topic"></span>
        <span class="con">话题</span>
      </mt-tab-item>
      <mt-tab-item id="bubble">
        <span class="iconfont icon-bubble"></span>
        <span class="con">广场</span>
      </mt-tab-item>
      <mt-tab-item id="msg">
        <span class="iconfont icon-msg"></span>
        <span class="con">消息</span>
      </mt-tab-item>
      <mt-tab-item id="me">
        <router-link to="./user">
          <span class="iconfont icon-me"></span>
          <span class="con">我的</span>
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script>

  export default {
    name: "MyFooter",
    data() {
      return {
        selected: 'index'
      }
    }

  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .footer-box {
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
