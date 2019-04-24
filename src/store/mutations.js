/**
 * Create by Zwl on 2019/4/15
 * @Description:
 */


'use strict';

import {
  SET_TOKEN,
  SET_USERINFO,
  SET_PROVINCES,
  SET_CITYS
} from "./mutation-type";
import {setStore} from "../until/localStorage";

export default {
  [SET_TOKEN](state,token){
    if(token){
      state.token = token;
    }
  },
  [SET_USERINFO](state,info){
    //合并对象，防止编辑的时候数据丢失
    state.userInfo = Object.assign({},state.userInfo,info);
    setStore('userInfo',state.userInfo);
  },
  [SET_PROVINCES](state,data){
    state.provinces = data;
  },
  [SET_CITYS](state,data){
    state.citys = data;
  }
}
