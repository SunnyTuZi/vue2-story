/**
 * Create by Zwl on 2019/4/15
 * @Description: 接口请求拦截器
 */

'use strict';

import axios from 'axios'

// 添加一个请求拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  return Promise.reject(error);
});
