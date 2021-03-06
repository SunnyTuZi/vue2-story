import Vue from 'vue'
import Router from 'vue-router'
import { getStore } from "../until/localStorage"
import { Toast } from 'mint-ui';


Vue.use(Router);

const continer = () => import('../pages/Continer');
const userIndex = () => import('../pages/user/Index');
const userEdit = () => import('../pages/user/Edit');
const userLogin = () => import('../pages/user/Login');
const userDynamic = () => import('../pages/user/Dynamic');
const followList = () => import('../pages/user/FollowList');
const byFollowList = () => import('../pages/user/ByFollowList');
const storyList = () => import('../pages/story/List');
const search = () => import('../pages/search/Search');
const storyAdd = () => import('../pages/story/Add');
const bubbleList = () => import('../pages/bubble/List');
const addGroup = () => import('../pages/bubble/addGroup');
const bubbleChat = () => import('../pages/bubble/Chat');
const userBriefInfo = () => import('../pages/user/BriefInfo');
const userChat = () => import('../pages/user/Chat');
const msgList = () => import('../pages/msg/List');
const topicList = () => import('../pages/topic/List');
const topicDetail = () => import('../pages/topic/Detail');
const myLike = () => import('../pages/user/MyLike');
const myTopic = () => import('../pages/user/MyTopic');
const storyDetail = () => import('../pages/story/Detail');

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/index/story/list'
    },
    {
      path: '/index',
      redirect: '/index/story/list'
    },
    {
      path:'/index',
      component:continer,
      children:[
        {
          path:'story/list',
          component:storyList,
          meta:{keepAlive:true}
        },
        {
          path:'bubble/list',
          component: bubbleList
        },
        {
          path: 'user',
          component: userIndex
        },
        {
          path:'msg/list',
          component:msgList
        },
        {
          path:'topic/list',
          component:topicList
        }
      ]
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
      path:'/bubble/addGroup',
      component: addGroup
    },

    {
      path:'/search',
      component: search
    },
    {
      path:'/bubble/group/:id/:name',
      component: bubbleChat
    },
    {
      path:'/story/add/:id',
      component: storyAdd
    },
    {
      path:'/user/briefInfo/:id',
      component: userBriefInfo
    },
    {
      path:'/user/chat/:id/:name',
      component: userChat
    },
    {
      path:'/topic/detail/:id',
      component: topicDetail
    },
    {
      path:'/user/followList/:id',
      component: followList
    },
    {
      path:'/user/byFollowList/:id',
      component: byFollowList
    },
    {
      path:'/user/myLike',
      component: myLike
    },
    {
      path:'/user/myTopic',
      component: myTopic
    },
    {
      path:'/story/detail/:id',
      component: storyDetail
    }
  ],
  mode:'hash',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.documentElement.scrollTop;
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  }
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
