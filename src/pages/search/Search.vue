<!--
 * Create by Zwl on 2019/4/24
 * @Description:搜素组件
-->

<template>
  <section class="box">
    <my-mt-header title="搜索"></my-mt-header>
      <div class="search-box">
        <form action="" v-on:submit.prevent="" class="">
          <mt-search v-model="keyword" class="search-style" @input="search">
            <div v-if="storyList.length > 0" class="result-list">
              <router-link v-for="item in storyList" :to="'/story/detail/'+item._id" :key="item._id">
                <mt-cell :title="item.storyName"></mt-cell>
              </router-link>
            </div>
            <div v-if="storyList.length == 0" class="result-list">
              <mt-cell title="暂无结果"></mt-cell>
            </div>
          </mt-search>
        </form>
      </div>
    </section>
</template>

<script>
  import {getStoryListByText} from "../../service/apiList";
  export default {
      data(){
        return{
          keyword:'',
          storyList:[]
        }
      },
      methods:{
        async search(){
          if(!this.keyword){
            return;
          }
          let result = await getStoryListByText({keyword:this.keyword});
          if(result){
            this.storyList = result.data;
          }
        }
      }
    }
</script>

<style lang="less">
  @import "../../public/style/mixin";
  .search-box {
      .mint-search{
        .mint-searchbar{
          background: @theme-color;
        }
        .mint-searchbar-cancel{
          color: #fff;
        }
        input{
          text-indent: 5px;
        }
      }
      .result-list{
        margin-top: 44px;
      }
  }
</style>
