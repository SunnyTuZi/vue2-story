<!--
 * Create by Zwl on 2019/4/16
 * @Description:
-->

<template>
  <a class="mint-cell mint-field">
    <div class="mint-cell-left"></div>
    <div class="mint-cell-wrapper">
      <div class="mint-cell-title">
        <span class="mint-cell-text">{{label}}</span>
      </div>
      <div class="mint-cell-value">
        <span class="mint-cell-text-con">{{value}}</span>
      </div>
    </div>
  </a>
</template>

<script>
    export default {
        name: "mt-cell-detail",
        props:{
          label: String,
          value: String
        }
    }
</script>

