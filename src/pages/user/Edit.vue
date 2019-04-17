<template>
  <div class="box">
    <mt-header title="编辑个人资料">
        <router-link to="/user" slot="left">
          <mt-button icon="back"></mt-button>
        </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
    <section class="user-edit-box">
      <div class="mint-cell-div t-center">
        <img src="" alt="" class="img-head" />
      </div>
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
    <mt-popup v-model="birthdayPopup" position="bottom">
      <mt-picker :slots="slots1" :visibleItemCount="3"></mt-picker>
    </mt-popup>
    <mt-popup v-model="addressPopup" position="bottom">
      <mt-picker :slots="slots" :visibleItemCount="3"></mt-picker>
    </mt-popup>
  </div>

</template>

<script>
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
      methods:{
        selectBirthday(){
          this.birthdayPopup = true;
        },
        selectAddress(){
          this.addressPopup = true;
        }
      }
    }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";
  .box {
    width: 100%;
    .user-edit-box{
      background: #FFFFFF;
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
  }
</style>
