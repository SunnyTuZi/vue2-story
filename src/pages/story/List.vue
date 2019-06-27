<!--
 * Create by Zwl on 2019/4/24
 * @Description: 故事列表
-->

<template>
  <section class="box">
    <my-mt-header :leftSlot="'search'" :rightSlot="'send'" title="故事汇"></my-mt-header>
    <section class="story-article-list">
      <story-item :story="item" v-for="item in storyList" :key="item._id"></story-item>
    </section>
  </section>
</template>

<script>
  import {
    getStoryList
  } from "../../service/apiList";
  import {mapState,mapMutations } from 'vuex'

  export default {
    data(){
      return{
        storyList: []
      }
    },
    mounted(){
      this.getStoryList();
      this.$store.commit('SET_MENU','index');
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      ...mapMutations(['SET_MENU']),
      /**
       * 获取故事列表
       */
      async getStoryList(){
        let result = await getStoryList({userId:this.userInfo._id});
        if(result){
          this.storyList = result.data;
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>
