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
          首页
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="topic">
        <span class="iconfont icon-topic"></span>
        话题
      </mt-tab-item>
      <mt-tab-item id="bubble">
        <span class="iconfont icon-bubble"></span>
        广场
      </mt-tab-item>
      <mt-tab-item id="msg">
        <span class="iconfont icon-msg"></span>
        消息
      </mt-tab-item>
      <mt-tab-item id="me">
        <router-link to="/user">
          <span class="iconfont icon-me"></span>
          我的
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </footer>
</template>

<script>
  import { Tabbar, TabItem } from 'mint-ui';

  export default {
    name: "MyFooter",
    data() {
      return {
        selected: 'index'
      }
    },
    components: {
      Tabbar,
      TabItem
    }

  }
</script>

<style scoped lang="less">
  .footer-box {
    .iconfont {
      display: block;
      font-size: 1.5rem;
      margin-bottom: .3125rem;
    }
  }

</style>
