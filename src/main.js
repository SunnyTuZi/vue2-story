
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './until/axios-interceptor'
import './until/px2rem'
import Mint from 'mint-ui'
import  'mint-ui/lib/style.css'



Vue.config.productionTip = false

Vue.use(Mint);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
