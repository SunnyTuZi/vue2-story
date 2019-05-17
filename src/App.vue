
<template>
  <div id="app" class="app-box">
    <section class="continer">
      <transition name="router-fade" mode="out-in">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition name="router-fade" mode="out-in">
        <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </section>
    <footer class="footer">
      <my-footer></my-footer>
    </footer>
  </div>
</template>
<script>
  import MyFooter from '@/components/footer/footer'
  export default {
    name: 'App',
    components: {
      MyFooter
    }
}
</script>

<style lang="less">
  @import "public/style/common";

  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }
  .app-box{
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .continer{
      display: flex;
      overflow-y: auto;
      flex-grow: 1;
      padding-top: 35px;
    }
    .footer{
      display: flex;
      flex: 0 0 auto;
      height: 60px;
      border-top: 0.013333rem solid #dddddd;
    }
  }
</style>
