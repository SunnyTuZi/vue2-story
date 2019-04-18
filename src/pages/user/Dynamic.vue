<!--
 * Create by Zwl on 2019/4/18
 * @Description:
-->

<template>
  <div class="box">
    <my-mt-header title="我的动态"></my-mt-header>
    <div class="user-dynamic item-list">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1"><span class="tab-name">动态</span></mt-tab-item>
        <mt-tab-item id="2"><span class="tab-name">发表</span></mt-tab-item>
        <mt-tab-item id="3"><span class="tab-name">评论</span></mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell v-for="n in 10" :key="n" :title="'内容 ' + n"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n"/>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="n in 6" :key="n" :title="'选项 ' + n"/>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Dynamic",
    data(){
      return{
        selected: '1'
      }
    }
  }
</script>
<style scoped lang="less">
  @import "../../public/style/mixin";
  .user-dynamic {
    font-size: 14px !important;
    .tab-name {
      font-size: 14px;
    }
    .mint-navbar .mint-tab-item.is-selected {
      margin-bottom: 0;
      .tab-name {
        color: @theme-color;
      }
    }
  }
</style>
