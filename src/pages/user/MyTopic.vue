<!--
 * Create by Zwl on 2019/6/20
 * @Description: 我关注的话题
-->

<template>
  <section class="box">
    <my-mt-header title="我关注的话题"></my-mt-header>
    <ul>
      <li v-for="item in topicList">
        <topic-item :topics="item"></topic-item>
      </li>
    </ul>
  </section>
</template>

<script>
  import {mapState} from 'vuex';
  import {getTopicList} from "../../service/apiList";
  export default {
    data() {
      return {
        topicList:[]
      }
    },
    mounted() {
      this.getTopicList();
    },
    computed: {
      ...mapState([ 'userInfo' ])
    },
    methods: {
      async getTopicList(){
        let res = await getTopicList({userId:this.userInfo._id});
        if(res){
          this.topicList = res.data;
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>
