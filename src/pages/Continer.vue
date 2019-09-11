<!--
 * Create by Zwl on 2019/6/12
 * @Description: 容器
-->

<template>
  <section class="middle-box">
    <section class="continer">
      <router-view></router-view>
    </section>
    <section class="footer">
      <my-mt-footer></my-mt-footer>
    </section>

  </section>
</template>

<script>
  export default {
    name: "Continer"
  }
</script>

<style scoped lang="less">
  .middle-box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .continer {
      display: flex;
      overflow-y: auto;
      flex-grow: 1;
      /*padding-top: 40px;*/
    }
    .footer {
      display: flex;
      flex: 0 0 auto;
      height: 60px;
      border-top: 0.013333rem solid #dddddd;
    }
  }

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
</style>
