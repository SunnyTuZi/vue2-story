
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './until/axios'
import './until/px2rem'
import Mint from 'mint-ui'
import  'mint-ui/lib/style.css'
//富文本编辑器
import VueHtml5Editor from 'vue-html5-editor'
import ediotrDeploy from './until/editor'
import 'font-awesome/css/font-awesome.min.css'
import MyMtHeader from './components/header/Header';


Vue.config.productionTip = false

Vue.use(Mint);

//设置全局共用组件
Vue.component('MyMtHeader',MyMtHeader);
Vue.use(VueHtml5Editor,ediotrDeploy);

//设置全局方法
Vue.prototype.$axios = axios;
Vue.prototype.$localStorage = window.localStorage;

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
