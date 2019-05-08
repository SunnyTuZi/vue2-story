<!--
 * Create by Zwl on 2019/4/18
 * @Description: 共用头部
-->

<template>
  <header class="header-box">
    <mt-header fixed :title="title">
      <div slot="left" >
        <mt-button icon="back"  v-if="leftSlot == 'back'" @click="$router.back(-1)"></mt-button>
        <mt-button icon="search"  v-if="leftSlot == 'search'" @click="$router.push({path:'/user'})"></mt-button>
      </div>
      <div slot="right">
        <mt-button  v-if="rightSlot == 'user'" class="iconfont icon-me" @click="$router.push({path:'/user'})" ></mt-button>
        <mt-button  v-if="rightSlot == 'send'" class="iconfont icon-write" @click="$router.push({path:'/story/add'})" ></mt-button>
        <mt-button  v-if="rightSlot == 'addStory'" @click="sendStory" class="btn-text">发表</mt-button>
      </div>
    </mt-header>
  </header>
</template>

<script>
  export default {
    name: "MyMtHeader",
    props:{
      title: String,
      leftSlot:{
        type: String,
        default: 'back'
      },
      rightSlot:{
        type: String,
        default: ''
      }
    },
    mounted(){
    },
    methods:{
      sendStory(){
        this.$emit('addStory');
      }
    }
  }
</script>

<style scoped lang="less">
  .header-box{
    .icon-me{
      font-size: 24px;
    }
    .btn-text{
      font-size: 12px;
    }
    .icon-write{
      font-size: 20px;
    }
  }
</style>
