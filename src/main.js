
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './until/axios'
import './until/px2rem'
import './until/common'
//mint框架
import Mint from 'mint-ui'
import  'mint-ui/lib/style.css'
//富文本编辑器
import VueHtml5Editor from 'vue-html5-editor'
import ediotrDeploy from './until/editor'
import 'font-awesome/css/font-awesome.min.css'
//公共组件
import MyMtHeader from './components/header/Header'
import MyMtComment from './components/picker/Comment'
import CommentList from './components/comment/List'
import PageTurner from './components/pageTurner/Page'


Vue.config.productionTip = false

Vue.use(Mint);

//设置全局共用组件
Vue.component('MyMtHeader',MyMtHeader);
Vue.component('MyMtComment',MyMtComment);
Vue.component('CommentList',CommentList);
Vue.component('PageTurner',PageTurner);
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
