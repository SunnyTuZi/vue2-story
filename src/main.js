
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import './until/axios-interceptor'
import './until/px2rem'
import Mint from 'mint-ui'
import  'mint-ui/lib/style.css'
import MyMtHeader from './components/header/Header';


Vue.config.productionTip = false

Vue.use(Mint);
Vue.component('MyMtHeader',MyMtHeader);

Vue.prototype.$axios = axios.create({
  headers: {'content-type': 'application/json;charset=UTF-8'}
});
Vue.prototype.$localStorage = window.localStorage;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
