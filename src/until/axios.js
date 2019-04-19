/**
 * Create by Zwl on 2019/4/15
 * @Description: 接口请求拦截器
 */


'use strict';

import { Toast } from 'mint-ui';
import axios from 'axios'
import { getStore } from "./localStorage"


const _axios = axios.create({
  headers: {'content-type': 'application/json;charset=UTF-8'}
});

//请求失败统一处理
const commonError = (error) =>{
  let res = error.response;
  if(res.status == 401){
    Toast({
      message: res.data.msg,
      position: 'middle',
      duration: 2000
    });
  }
  return Promise.reject(error)
}

// 添加一个请求拦截器
_axios.interceptors.request.use(function (config) {
  // Do something before request is sent;
  const token = getStore('token');
  config.headers.common['Authorization'] = 'Bearer ' + token;
  return config;
}, function (error) {
  commonError(error)
});


// 添加一个响应拦截器
_axios.interceptors.response.use(function (response) {
  if(response.data.status != 200){
    Toast({
      message: response.data.msg,
      position: 'middle',
      duration: 2000
    });
  }
  return response;
}, function (error) {
  commonError(error)
});



export default _axios;

