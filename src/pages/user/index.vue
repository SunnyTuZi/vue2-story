<!--
 * Create by Zwl on 2019/4/15
 * @Description: 用户主页
-->

<template>
  <section class="user-box">
    <div class="user-box-head">
      <p class="img-box"><img src="" alt="" class="head-img"/></p>
      <p>SunnyTuZi</p>
      <p>人生的起点不是出生那一刻，而是你感悟到你活着的意义那一瞬间！</p>
      <p>
        <a>10人关注</a>
        <span>|</span>
        <a>10个粉丝</a>
      </p>
    </div>
  </section>
</template>

<script>
  export default {
    name: "index"
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .user-box {
    .user-box-head {
      .flex;
      flex-flow: column;
      padding: 1rem 0;
      .img-box{
        .head-img {
          display: inline-block;
          width: 5rem;
          height: 5rem;
          border-radius: 100%;
          border: 1px solid #eee;
        }
      }

    }
  }
</style>
