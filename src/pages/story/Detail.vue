<!--
 * Create by Zwl on 2019/6/25
 * @Description: 故事详情页
-->

<template>
  <section class="box">
    <my-mt-header title="故事详情"></my-mt-header>
    <story-item :isDetail="isDetail" :story="story"></story-item>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import {getStoryList} from "../../service/apiList";
  export default {
    data() {
      return {
        story:{
          _id:''
        },
        isDetail: true
      }
    },
    mounted(){

      this.getStoryDetail();
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods:{
      async getStoryDetail(){
        let result = await getStoryList({storyId:this.storyId,userId:this.userInfo._id});
        if(result){
          this.story = result.data[0];
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";

</style>
