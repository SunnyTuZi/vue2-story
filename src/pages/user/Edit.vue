<template>
  <div class="box">
    <my-mt-header title="编辑个人资料"></my-mt-header>
    <section class="user-edit-box">
      <mt-cell title="用户头像" is-link class="head-cell">
        <span>
          <img slot="icon" src="" class="head-img">
        </span>
        <input type="file" accept="image/*" name="file" class="head-input" id="uploadAvatar" @change="uploadAvatar" />
      </mt-cell>
      <mt-field label="用户名" placeholder="请输入用户名" type="text"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email"></mt-field>
      <div class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">性别</span>
          </div>
          <div class="mint-cell-value">
            <label class="mint-radiolist-label">
            <span class="mint-radio">
              <input type="radio" class="mint-radio-input" value="男" name="sex">
              <span class="mint-radio-core"></span>
            </span>
              <span class="mint-radio-label">男</span>
            </label>
            <label class="mint-radiolist-label">
            <span class="mint-radio">
              <input type="radio" class="mint-radio-input" value="女" name="sex">
              <span class="mint-radio-core"></span>
            </span>
              <span class="mint-radio-label">女</span>
            </label>
          </div>
        </div>
      </div>
      <mt-field label="出生年月" placeholder="请选择出生年月" type="text" readonly="readonly" @click.native.capture="selectBirthday"></mt-field>
      <mt-field label="所在地区" placeholder="请选择所在地区" type="text" readonly="readonly" @click.native.capture="selectAddress"></mt-field>
      <mt-field label="个性签名" placeholder="写一句话~让别人更了解你吧" type="textarea" rows="4"></mt-field>
    </section>
    <div class="edit-btn">
      <mt-button type="primary" disabled>确认修改</mt-button>
    </div>
    <mt-popup v-model="birthdayPopup" position="bottom">
      <mt-picker :slots="slots1" :visibleItemCount="3"></mt-picker>
    </mt-popup>
    <mt-popup v-model="addressPopup" position="bottom">
      <mt-picker :slots="slots" :visibleItemCount="3"></mt-picker>
    </mt-popup>
  </div>

</template>

<script>
    import {mapState} from 'vuex';
    export default {
      name: "",
      data() {
        return {
          birthdayPopup: false,
          addressPopup: false,
          slots: [
            {
              flex: 1,
              values: ['广东', '广西','广东', '广西'],
              className: 'slot1',
              textAlign: 'right'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: ['广州', '深圳','广东', '广西'],
              className: 'slot3',
              textAlign: 'left'
            }
          ],
          slots1:[
            {
              flex: 1,
              values: ['2015', '2016', '2017', '2018', '2019'],
              className: 'slot1',
              textAlign: 'right'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: ['01', '02', '03', '04', '05', '06'],
              className: 'slot3',
              textAlign: 'left'
            }
          ]
        };
      },
      computed: {
        ...mapState(['userInfo'])
      },
      methods:{
        selectBirthday(){
          this.birthdayPopup = true;
        },
        selectAddress(){
          this.addressPopup = true;
        },
        uploadAvatar(){
          let file = document.querySelector('#uploadAvatar');
          let data = new FormData();
          data.append('file',file.files[0]);
          data.append('id',this.userInfo._id);
          this.$axios.post('/api/user/uploadAvatar',data).then(
            result =>{
              if(result.data.status == 200){
              }
            }
          )
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .box {
    .user-edit-box{
      padding-top: 10px;
      background: #FFFFFF;
      .head-cell{
        padding: 10px 0;
        .head-img{
          .img-raduis(60px,#dddddd)
        }
        .head-input{
          position: absolute;
          top: 0px;
          left: 0px;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
      }
      .mint-cell{
        border-bottom: 1px solid #dddddd;
      }
    }
    .mint-cell-div{
      padding: 20px 0;
      .img-head{
        display: inline-block;
        width: 100px;
        height: 100px;
        border-radius: 100%;
        .border;
      }
    }
    .mint-popup{
      width: 100%;
    }
    .mint-radiolist-label{
      padding-left: 0;
      padding-right: 10px;
    }
    .edit-btn{
      margin-top: 20px;
      padding: 0 20px;
      button{
        width: 100%;
      }
    }
  }
</style>
