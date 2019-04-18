<!--
 * Create by Zwl on 2019/4/18
 * @Description: 共用头部
-->

<template>
  <header class="header-box">
    <mt-header :title="title">
      <router-link to="" slot="left" v-if="isBack">
        <mt-button icon="back" @click="$router.back(-1)"></mt-button>
      </router-link>
      <mt-button icon="more" slot="right" v-if="isRight"></mt-button>
    </mt-header>
  </header>
</template>

<script>
  export default {
    name: "MyMtHeader",
    props:{
      title: String,
      isBack:{
        type: Boolean,
        default: true
      },
      isRight: {
        type:  Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

</style>
