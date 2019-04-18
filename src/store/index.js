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

Vue.use(Vuex)

const state = {
  token: '',
  userInfo: {},
}
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
})


