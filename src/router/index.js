import Vue from 'vue'
import Router from 'vue-router'
import { getStore } from "../until/localStorage"
import { Toast } from 'mint-ui';


Vue.use(Router);


const userIndex = () => import('../pages/user/index');
const userEdit = () => import('../pages/user/Edit');
const userLogin = () => import('../pages/user/Login');
const userDynamic = () => import('../pages/user/Dynamic');
const storyList = () => import('../pages/story/List');
const search = () => import('../pages/search/Search');
const storyAdd = () => import('../pages/story/Add');
const bubbleList = () => import('../pages/bubble/List');
const addGroup = () => import('../pages/bubble/addGroup');

const router = new Router({
  routes: [
    {
      path: '/',
      component: storyList
    },
    {
      path: '/user',
      component: userIndex
    },
    {
      path:'/user/edit',
      component: userEdit,
      meta:{
        auth: true
      }
    },
    {
      path:'/user/login',
      component: userLogin
    },
    {
      path:'/user/dynamic',
      component: userDynamic,
      meta:{
        auth: true
      }
    },
    {
      path:'/story/list',
      component: storyList
    },
    {
      path:'/bubble/list',
      component: bubbleList
    },
    {
      path:'/bubble/addGroup',
      component: addGroup
    },
    {
      path:'/story/add',
      component: storyAdd
    },
    {
      path:'./search',
      component: search
    }

  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta.auth){
    if(!getStore('token')){
      Toast({
        message: '请先登录',
        position: 'middle',
        duration: 2000
      });
      router.push('/user/login')
    }
    next();
  }else{
    next();
  }
})

export default router;
