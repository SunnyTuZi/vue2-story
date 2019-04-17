import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router);

const hellon = r => require.ensure([], () => r(require('../components/HelloWorld')), 'hellon')
const userIndex = r => require.ensure([], () => r(require('../pages/user/index')), 'userIndex')
const userEdit = r => require.ensure([], () => r(require('../pages/user/Edit')), 'userEdit')
const userLogin = r => require.ensure([], () => r(require('../pages/user/Login')), 'userLogin')

export default new Router({
  routes: [
    {
      path: '/',
      component: hellon
    },
    {
      path: '/user',
      component: userIndex
    },
    {
      path:'/user/edit',
      component: userEdit
    },
    {
      path:'/user/login',
      component: userLogin
    }
  ]
})
