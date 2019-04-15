
<template>
  <div id="app">
    <transition name="router-fade" mode="out-in">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    <transition name="router-fade" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <my-footer></my-footer>
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
</style>
