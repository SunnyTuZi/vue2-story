<!--
 * Create by Zwl on 2019/6/20
 * @Description: 我的收藏
-->

<template>
  <section class="box">
    <my-mt-header title="我的收藏"></my-mt-header>
    <section class="story-article-list">
      <story-item :storyList="storyList"></story-item>
    </section>
  </section>
</template>

<script>
  import {getLikeByUser} from "../../service/apiList";
  import {mapState} from 'vuex';

  export default {
    data() {
      return {
        storyList: []
      }
    },
    mounted() {
      this.getLikeByUser();
    },
    computed: {
      ...mapState(['userInfo'])
    },
    methods: {
      async getLikeByUser() {
        let result = await getLikeByUser({userId: this.userInfo._id});
        if(result){
          this.storyList = result.data;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  .box{
    display: flex;
    .story-article-list{
      flex-grow: 1;
      overflow-y: auto;
    }
  }
</style>
