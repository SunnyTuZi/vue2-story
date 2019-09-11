# 前言

这是一个可以发表故事，可以聊天的网站，我定义为社交网站，它只是一个demo，纯属个人凭空设计。


## 技术栈

vue2 + vuex + vue-router + webpack + ES6/7 + axios + less + flex +socket.io


## 项目运行

#### 注意：由于涉及大量的 ES6/7 等新属性，node 需要 6.0 以上版本

```
git clone https://github.com/SunnyTuZi/vue2-story

cd vue2-story

npm install 或 yarn(推荐)

npm run dev

```
## 关于接口数据

此项目的所有接口数据都来源于配套的后台系统，[后台项目传送地址](https://github.com/SunnyTuZi/koa2-story.git)。

如果想体验前后台同时开发，可以下载后台系统，并且自行安装mongoDB。

此时启动本项目的命令为：npm run local 而不是 npm run dev。

同时我们也提供了基于`react&antd`搭建的[后台管理页面传送地址](https://github.com/SunnyTuZi/react-story-admin.git)

如果只做前端开发，请忽略上面这几句话哟～


# 说明

>  如果对您有帮助，您可以点右上角 "Star" 支持一下 谢谢！ ^_^

>  或者您可以 "follow" 一下，我会不断开源更多的有趣的项目


# 目标功能
- [x] 个人中心 -- 完成
- [x] 修改个人信息 -- 完成
- [x] 发表故事 -- 完成
- [x] 评论故事 -- 完成
- [x] 评论分页 -- 完成
- [x] 点赞&踩故事 -- 完成
- [x] 收藏故事 -- 完成
- [x] 上传头像 -- 完成
- [x] 创建聊天分组 -- 完成
- [x] 单人聊天 -- 完成
- [x] 多人聊天 -- 完成
- [x] 关注话题-- 完成
- [x] 发表话题故事-- 完成
- [x] 登录、注册 -- 完成
- [x] 修改密码 -- 完成
- [x] 故事详情页 -- 完成
- [x] 关注用户-- 完成
- [x] 我的动态 -- 完成
- [x] 我的收藏 -- 完成

# 总结

1、这也算是初稿，自己完成的一个东西，可能页面不好看，或者功能不完善，也会有bug,也请大家多多体谅。


# 最终目标

1、用koa2构建的后台系统。[地址在这里](https://github.com/SunnyTuZi/koa2-story.git)

2、用react构建后台管理页面 [地址在这里](https://github.com/SunnyTuZi/react-story-admin.git)

所以我的目的是构建一个横跨前后端，vue2和react的项目，让大家可以多样化学习

。。。敬请期待




# 部分截图


### 故事列表页

<img src="https://github.com/SunnyTuZi/vue2-story/showImages/index.jpg" width="365" height="619"/> <img src="https://github.com/SunnyTuZi/vue2-story/showImages/storyDetail.jpg" width="365" height="619"/>



# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── showImages                                  // 项目截图
├── src                                         // 源码目录
│   ├── components                              // 公用组件
│   │   ├── comment
│   │   │   ├── List.vue                        // 评论列表组件
│   │   ├── footer
│   │   │   ├── footer.vue                      // 公用底部
│   │   ├── header
│   │   │   ├── Header.vue                      // 导用头部
│   │   ├── pageTurner
│   │   │   ├── Page.vue                        // 分页组件
│   │   ├── picker
│   │   │   ├── chatBubble.vue                  // 聊天气泡组件
│   │   │   ├── comment.vue                     // 评论输入框组件
│   │   │   ├── SendMsg.vue                     // 信息输入发送组件
│   │   │   ├── Timep.vue                       // 年月选择器
│   │   │   ├── Town.js                         // 地区选择器
│   │   ├── story
│   │   │   ├── Item.vue                        // 故事列组件
│   │   ├── topic
│   │   │   ├── Item.vue                        // 话题列组件
│   │   ├── user
│   │   │   ├── Index.vue                       // 用户封面组件
│   │   │   ├── Item.vue                        // 用户列组件
│   │   ├── cellDetail
│   │   │   └── cellDetail.vue                  // cell组件
│   ├── config                                  // 基本配置
│   │   ├── env.js                              // 环境切换配置
│   │   ├── fetch.js                            // 获取数据
│   │   ├── mUtils.js                           // 常用的js方法
│   │   └── rem.js                              // px转换rem
│   ├── images                                  // 公共图片
│   ├── pages
│   │   ├── bubble
│   │   │   ├── AddGroup.vue                    // 添加分组
|   |   |   ├── Chat.vue                        // 群组聊天
│   │   │   └── List.vue                        // 分组列表
│   │   ├── msg
│   │   │   └── List.vue                        // 消息列表
│   │   ├── search
│   │   │   └── Searcg.vue                      // 搜索页
│   │   ├── story
│   │   │   ├── Add.vue                         // 发表故事
|   |   |   ├── Detail.vue                      // 故事详情
│   │   │   └── List.vue                        // 故事列表
│   │   ├── topic
│   │   │   |── Detail.vue                      // 话题详情
│   │   │   |── List.vue                        // 话题列表
│   │   ├── user
│   │   │   └── Continer.vue                    // 容器
│   ├── router
│   │   └── index.js                            // 路由配置
│   ├── service                                 // 数据交互统一调配
│   │   ├── apiList.js                          // 获取数据的统一调配文件，对接口进行统一管理
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   ├── until
│   │   ├── axios.js                            // axios再次封装
│   │   ├── common.js                           // 公共js函数
│   │   ├── editor.js                           // 文本输入框editor配置
│   │   ├── px2rem.js                           // rem适配
│   │   └── localStorage.js                     // 据本地储存公共函数
│   └── public
|   │   └── font                                // 字体图标
|   │   └── style                               // 公共样式文件
|   │       ├── mixin.less                      // css公用函数
|   │       └── common.less                     // css公用样式
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件
.

```

# License
