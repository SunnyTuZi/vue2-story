<!--
 * Create by Zwl on 2019/6/14
 * @Description: 话题列表
-->

<template>
  <section class="box">
    <my-mt-header title="话题列表" leftSlot=""></my-mt-header>
    <ul>
      <li v-for="item in topicList">
        <topic-item :topics="item"></topic-item>
      </li>
    </ul>
  </section>
</template>

<script>
  import {getTopicList} from "../../service/apiList";
  import {mapMutations} from 'vuex';

  export default {
    data(){
      return{
        topicList:[],
        imgBaseUrl:''
      }
    },
    mounted(){
      this.getTopicList();
      this.$store.commit('SET_MENU','topic');
    },
    methods:{
      ...mapMutations(['SET_MENU']),
      async getTopicList(){
        let res = await getTopicList({status:1});
        if(res){
          this.topicList = res.data;
        }
      }
    }
  }
</script>

<style scoped lang="less">

</style>
