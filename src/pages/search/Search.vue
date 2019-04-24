<!--
 * Create by Zwl on 2019/4/24
 * @Description:搜素组件
-->

<template>
    <section class="box">
      <div class="search-box">
        <mt-search v-model="value">
          <mt-cell title="xxx"></mt-cell>
        </mt-search>
      </div>
    </section>
</template>

<script>
    export default {
        name: "Search"
    }
</script>

<style scoped>

</style>
