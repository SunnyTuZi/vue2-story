
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
  </div>
</template>
<script>
  export default {
    name: 'App'
}
</script>

<style lang="less">
  @import "public/style/common";
  .app-box{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .continer{
      width: 100%;
      height: 100%;
    }
  }
  .router-fade-enter-active, .router-fade-leave-active {
    transition: opacity .3s;
  }

  .router-fade-enter, .router-fade-leave-active {
    opacity: 0;
  }

</style>
