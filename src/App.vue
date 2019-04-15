<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
    <my-footer></my-footer>
  </div>
</template>

<script>
  import MyFooter from '@/components/footer/footer'
export default {
  name: 'App',
  components: {
    MyFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
