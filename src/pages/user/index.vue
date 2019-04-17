<!--
 * Create by Zwl on 2019/4/15
 * @Description: 用户主页
-->

<template>
  <section class="user-box">
    <div class="user-head item-list">
      <p class="img-box"><img src="" alt="" class="head-img"/></p>
      <p class="nickname">SunnyTuZi</p>
      <p class="synopsis">人生的起点不是出生那一刻，而是你感悟到你活着的意义那一瞬间！</p>
      <p class="follow">
        <a>10人关注</a>
        <span class="trim">|</span>
        <a>10个粉丝</a>
      </p>
    </div>
    <div class="user-info item-list">
      <router-link to="./user/login"><mt-cell title="登陆" is-link></mt-cell></router-link>
      <router-link to="./user/edit"><mt-cell title="基本信息" is-link></mt-cell></router-link>
      <mt-cell-detail label="性别" value="男"></mt-cell-detail>
      <mt-cell-detail label="年龄" value="25" ></mt-cell-detail>
      <mt-cell-detail label="邮箱" value="919869469@qq.com"></mt-cell-detail>
      <mt-cell-detail label="所在地" value="广州天河"></mt-cell-detail>
      <mt-cell-detail label="创建时间" value="2019-02-25"></mt-cell-detail>
    </div>
    <div class="user-dynamic item-list">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1"><span class="tab-name">动态</span></mt-tab-item>
        <mt-tab-item id="2"><span class="tab-name">发表</span></mt-tab-item>
        <mt-tab-item id="3"><span class="tab-name">评论</span></mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <mt-cell v-for="n in 10" :key="n" :title="'内容 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <mt-cell v-for="n in 4" :key="n" :title="'测试 ' + n" />
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <mt-cell v-for="n in 6" :key="n" :title="'选项 ' + n" />
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </section>
</template>

<script>
  import MtCellDetail from '@/components/cellDetail/cellDetail';
  export default {
    name: "index",
    data(){
      return{
        selected: '1'
      }
    },
    components:{
      MtCellDetail
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .user-box {
    .user-head {
      .flex;
      flex-direction: column;
      padding: 20px;
      background: #fff;
      box-shadow: 1px 1px 1px #ddd;
      .img-box{
        margin-top: 20px;
        .head-img {
          display: inline-block;
          width: 100px;
          height: 100px;
          border-radius: 100%;
          border: 1px solid #eee;
        }
      }
      .nickname{
        font-weight: 500;
        font-size: 24px;
      }
      .synopsis{
        font-size: 14px;
      }
      .follow{
        .trim{
          color: @theme-color;
          margin: 10px;
          font-size: 16px;
        }
        a{
          color: @theme-color;
          font-size: 12px;
        }
      }
      p{
        margin-bottom: 10px;
      }
    }
    .user-info{

    }
    .user-dynamic{
      font-size: 14px !important;
      .tab-name{
        font-size: 14px;
      }
      .mint-navbar .mint-tab-item.is-selected{
        margin-bottom: 0;
        .tab-name{
          color: @theme-color;
        }
      }

    }
    .item-list{
      background: #fff;
      margin-bottom: 20px;
      .bottom-shadow;
    }
  }
</style>
