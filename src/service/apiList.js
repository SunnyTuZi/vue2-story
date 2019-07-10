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
 * 检验登陆
 * @param data
 * @returns {Promise<void>}
 */
export const checkToken = (data) => postAjax('api/user/checkToken',data);

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
 * 获取用户信息
 * @param data
 * @returns {Promise<void>}
 */
export const getUserInfo = (data) => getAjax('api/user/getUserInfo',data);

/**
 * 关注用户
 * @param data
 * @returns {Promise<void>}
 */
export const followUser = (data) => postAjax('api/user/follow',data);

/**
 * 获取关注的用户
 * @param data
 * @returns {Promise<void>}
 */
export const getFollowList = (data) => getAjax('api/user/getFollowList',data);
/**
 *
 * 获取被关注的用户
 * @param data
 * @returns {Promise<void>}
 */
export const getByFollowList = (data) => getAjax('api/user/getByFollowList',data);


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
export const AddGroupChatRecord = (data) => postAjax('api/bubble/addChatRecord',data);

/**
 * 添加私聊聊天记录
 * @param data
 * @returns {Promise<void>}
 */
export const addChatRecord = (data) => postAjax('api/chat/addRecord',data);

/**
 * 更改信息状态
 * @param data
 * @returns {Promise<void>}
 */
export const updateRecord = (data) => postAjax('api/chat/updateRecord',data);

/**
 * 获取未读信息条数
 * @param data
 * @returns {Promise<void>}
 */
export const getUnReadMsgNum = (data) => getAjax('api/chat/getUnReadMsgNum',data);

/**
 * 获取信息列表
 * @param data
 * @returns {Promise<void>}
 */
export const getUnReadMsgList = (data) => getAjax('api/chat/getUnReadMsgList',data);

/**
 * 根据用户获取未读信息
 * @param data
 * @returns {Promise<void>}
 */
export const getUnReadMsgByUser = (data) => postAjax('api/chat/getUnReadMsgByUser',data);

/**
 * 创建话题
 * @param data
 * @returns {Promise<void>}
 */
export const addTopic = (data) => postAjax('api/topic/addTopic',data);

/**
 * 获取话题列表
 * @param data
 * @returns {Promise<void>}
 */
export const getTopicList = (data) => getAjax('api/topic/getTopicList',data);

/**
 * 获取话题详情
 * @param data
 * @returns {Promise<void>}
 */
export const getTopicDeatil = (data) => getAjax('api/topic/getTopicDeatil',data);

/**
 * 关注话题
 * @param data
 * @returns {Promise<void>}
 */
export const followTopic = (data) => postAjax('api/topic/followTopic',data);

/**
 * 我的收藏
 * @param data
 * @returns {Promise<void>}
 */
export const getLikeByUser = (data) => getAjax('api/user/getLikeByUser',data);


/**
 * 我的评论
 * @param data
 * @returns {Promise<void>}
 */
export const getCommentByUser = (data) => getAjax('api/user/getCommentByUser',data);

/**
 * 我的点赞
 * @param data
 * @returns {Promise<void>}
 */
export const getMySupport = (data) => getAjax('api/user/getMySupport',data);


/**
 * 模糊查询故事列表
 * @param data
 * @returns {Promise<void>}
 */
export const getStoryListByText = (data) => getAjax('api/story/getStoryListByText',data);

/**
 * 删除回话
 * @param data
 * @returns {Promise<void>}
 */
export const delMsgByUser = (data) => postAjax('api/chat/delMsgByUser',data);

/**
 * 记录访问
 * @param data
 * @returns {Promise<void>}
 */
export const addRecord = (data) => postAjax('api/visit/addRecord',data);





