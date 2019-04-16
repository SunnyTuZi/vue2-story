<template>
    <header>
      <mt-header fixed title="编辑个人资料">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      </mt-header>
    </header>
</template>

<script>
    export default {
        name: ""
    }
</script>

<style scoped lang="less">
  .mint-header-title{
    color: #ffffff;
  }
</style>
