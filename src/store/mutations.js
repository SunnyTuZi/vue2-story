/**
 * Create by Zwl on 2019/4/15
 * @Description:
 */


'use strict';

import {SET_TOKEN, GET_USERINFO} from "./mutation-type";

export default {
  [SET_TOKEN](state,token){
    if(token){
      state.token = token;
    }
  },
  [GET_USERINFO](state,info){
    state.userInfo = {...info};
  }
}
