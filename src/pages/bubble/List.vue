<!--
 * Create by Zwl on 2019/5/17
 * @Description: 广场
-->

<template>
  <section class="box">
    <my-mt-header title="聊天广场" :rightSlot="'addGroup'"></my-mt-header>
    <section class="chat-box">
      <div class="chat-item" v-for="(item,index) in dataArr">
        <div @click="toChat(index)">
          <div class="chat-name">{{item.groupName}}</div>
          <div class="chat-con">
            <div class="staff">
              <img src="" alt="" class="head">
            </div>
            <div class="number">{{item.size}}人正在畅聊</div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
  import {getGroupList} from "../../service/apiList";
  import {mapState,mapMutations} from 'vuex';;

  export default {
    data() {
      return {
        dataArr: []
      }
    },
    mounted() {
      this.getList();
    },
    computed:{
      ...mapState(['groupList'])
    },
    methods: {
      ...mapMutations(['SET_GROUPLIST']),
      async getList(){
        let result = await getGroupList();
        if(result){
          this.dataArr = this.dataArr.concat(result.data);
          this.$store.commit('SET_GROUPLIST',this.dataArr);
        }
        this.$socket.emit('onHandlerGourp');
        this.$socket.on('changeGroupList',(data) =>{
          for (let i = 0; i < this.dataArr.length; i ++) {
            var groupId = data.groupId;
            if(groupId == this.dataArr[i]._id){
              this.dataArr[i].size += data.num;
              this.$set(this.dataArr[i],'size',this.dataArr[i].size);
            }
          }
        });
        this.$router.afterEach((to,from,next)=>{
          this.$socket.emit('leaveRoom',{room:'onHandlerGourp'});
        });
      },
      toChat(index){
        let item = this.dataArr[index];
        if(item.staff > item.size){
          this.$router.push('/bubble/group/'+item._id);
        }else{
          this.$toast({
            message:'房间人数已满~',
            position: 'middle',
            duration: 2000
          })
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
