/**
 * Create by Zwl on 2019/5/9
 * @Description: 接口清单
 */

'use strict';

import axios from '../until/axios';

/**
 * 统一post请求
 * @param url
 * @param data
 * @returns {Promise<void>}
 */
const postAjax = async (url,data) =>{
  return await axios.post(url,data).then(
    (result) =>{
      return result;
    }
  )
}
/**
 * 统一get请求
 * @param url
 * @param data
 * @returns {Promise<T | *>}
 */
const getAjax = async(url,data) =>{
  return await axios.get(url,{params:data}).then(
    (result) =>{
      return result;
    }
  )
}

/**
 * 登陆
 * @param data
 * @returns {Promise<void>}
 */
export const login = (data) => postAjax('api/user/login',data);

/**
 * 获取验证码图片
 * @returns {Promise<T|*>}
 */
export const getCode = () => getAjax('api/user/getCode',{});

/**
 * 上传头像
 * @param data
 * @returns {Promise<void>}
 */
export const uploadAvatar = (data) => postAjax('api/user/uploadAvatar',data);

/**
 * 修改用户信息
 * @param data
 * @returns {Promise<void>}
 */
export const editUserInfo = (data) => postAjax('api/user/edit',data);

/**
 * 获取故事列表
 * @param data
 * @returns {Promise<*>}
 */
export const getStoryList = (data) => getAjax('api/story/getList',data);

/**
 * 获取评论列表
 * @param data
 * @returns {Promise<*>}
 */
export const getCommentList = (data) => getAjax('api/story/getComentList',data);

/**
 * 获取评论总数
 * @param data
 * @returns {Promise<*>}
 */
export const getCommentToal = (data) => getAjax('api/story/getCommentTotalByStory',data);

/**
 *
 * @param data
 * @returns {Promise<void>}
 */
export const storyAdd = (data) => postAjax('api/story/addStory',data);

/**
 * 收藏故事
 * @param data
 * @returns {Promise<void>}
 */
export const likeStory = (data) => postAjax('api/story/like',data);

/**
 * 点赞/踩故事
 * @param data
 * @returns {Promise<void>}
 */
export const supportStory = (data) => postAjax('api/story/support',data);

/**
 * 添加评论
 * @param data
 * @returns {Promise<void>}
 */
export const commentAdd = (data) => postAjax('api/story/commentAdd',data);

/**
 * 添加分组
 * @param data
 * @returns {Promise<void>}
 */
export const groupAdd = (data) => postAjax('api/bubble/createGroup',data);

/**
 * 获取分组
 * @param data
 * @returns {Promise<void>}
 */
export const getGroupList = (data) => getAjax('api/bubble/getGroupList',data);

/**
 * 添加分组聊天记录
 * @param data
 * @returns {Promise<void>}
 */
export const AddGroupChatRecord = (data) => getAjax('api/bubble/addChatRecord',data);

