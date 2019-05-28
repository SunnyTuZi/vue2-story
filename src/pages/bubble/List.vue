<!--
 * Create by Zwl on 2019/5/17
 * @Description: 广场
-->

<template>
  <section class="box">
    <my-mt-header title="聊天广场" :rightSlot="'addGroup'" @createGroup="createGroup"></my-mt-header>
    <section class="chat-box">
      <div class="chat-item" v-for="item in dataArr">
        <router-link :to='"/bubble/group/"+item._id'>
          <div class="chat-name">{{item.groupName}}</div>
          <div class="chat-con">
            <div class="staff">
              <img src="" alt="" class="head">
            </div>
            <div class="number">{{item.staff}}人正在畅聊</div>
          </div>
        </router-link>
      </div>
    </section>
  </section>
</template>

<script>
  import {getGroupList} from "../../service/apiList";

  export default {
    data() {
      return {
        dataArr: []
      }
    },
    mounted() {
      this.getList();
      // this.getNewMsg();
    },
    methods: {
      getNewMsg() {
        this.$socket.on('news', (data) => {
          for (let item of data) {
            this.dataArr.push(item);
          }
        });
      },
      createGroup(){

      },
      async getList(){
        let result = await getGroupList();
        if(result){
          this.dataArr = result.data;
        }
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";

  .box {
    background-color: #e7eff3;
    .chat-box {
      .chat-item {
        margin: 20px;
        border-radius: 5px;
        padding: 20px;
        background: linear-gradient(top, #52aff5, #96c7e6);
        display: flex;
        flex-direction: column;
        color: #fff;
        .chat-name {
          font-size: 18px;
          font-weight: 600;
        }
        .chat-con {
          margin-top: 10px;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          .staff {
            flex: 1;
            .head {
              display: inline-block;
              .img-raduis(30px, #ddd);
            }
          }
          .number {
            width: 100px;
          }
        }
      }
    }
  }
</style>
