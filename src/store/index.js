/**
 * Create by Zwl on 2019/4/15
 * @Description:
 */


'use strict';

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import getters from './getter'
import actions from './action'
import { getStore} from "../until/localStorage";


Vue.use(Vuex)
const state = {
  token: getStore('token')||'',
  userInfo: getStore('userInfo') ? JSON.parse(getStore('userInfo')):{},
  provinces: null,
  citys: null,
  chat:getStore('chat') ? JSON.parse(getStore('chat')):{},
  groupList:null,
  topicList:null
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})


