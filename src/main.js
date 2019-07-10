
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import axios from './until/axios';
import './until/px2rem';
import './until/common';
import Config from '../config/prod.env';
import {getStore,setStore} from "./until/localStorage";
import {checkToken,addRecord} from "./service/apiList";
//mint框架
import Mint from 'mint-ui';
import  'mint-ui/lib/style.css';
//富文本编辑器
import VueHtml5Editor from 'vue-html5-editor';
import ediotrDeploy from './until/editor';
import 'font-awesome/css/font-awesome.min.css';
//公共组件
import MyMtFooter from  './components/footer/footer';
import MyMtHeader from './components/header/Header';
import MyMtComment from './components/picker/Comment';
import CommentList from './components/comment/List';
import PageTurner from './components/pageTurner/Page';
import SendMsg from  './components/picker/SendMsg';
import ChatBubble from './components/picker/ChatBubble';
import UserIndex from  './components/user/Index';
import StoryItem from './components/story/Item';
import UserItem from './components/user/Item';
import TopicItem from './components/topic/Item';
//socket

(async ()=>{
  //检验登陆状态
  const token = getStore('token');
  var userInfo = getStore('userInfo')||'{}';
  if(token){
    let result = await checkToken({token});
    if(!result){
      setStore('token','');
      setStore('userInfo','');
    }
  }
  //记录访问
  userInfo = JSON.parse(userInfo);
  let data = {
    ip: returnCitySN[ "cip" ],
    address: returnCitySN[ "cname" ],
    userName: userInfo.username || '',
    userId: userInfo.userId || ''
  }
  await addRecord(data);
})();

Vue.config.productionTip = false

Vue.use(Mint);

//设置全局共用组件
Vue.component('MyMtHeader',MyMtHeader);
Vue.component('MyMtFooter',MyMtFooter);
Vue.component('MyMtComment',MyMtComment);
Vue.component('CommentList',CommentList);
Vue.component('PageTurner',PageTurner);
Vue.component('SendMsg',SendMsg);
Vue.component('ChatBubble',ChatBubble);
Vue.component('UserIndex',UserIndex);
Vue.component('StoryItem',StoryItem);
Vue.component('UserItem',UserItem);
Vue.component('TopicItem',TopicItem);
Vue.use(VueHtml5Editor,ediotrDeploy);

const socket = io.connect(Config.HOST+':3000/');


//设置全局方法
Vue.prototype.$axios = axios;
Vue.prototype.$localStorage = window.localStorage;
Vue.prototype.$socket = socket;


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
