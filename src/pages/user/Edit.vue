<template>
  <div class="box">
    <my-mt-header title="编辑个人资料"></my-mt-header>
    <section class="user-edit-box">
      <mt-cell title="用户头像" is-link class="head-cell">
        <span>
          <img slot="icon" :src="userInfo.head ? imgBaseUrl + userInfo.head : ''" class="head-img" >
        </span>
        <input type="file" accept="image/*" name="file" class="head-input" id="uploadAvatar" @change="uploadAvatar" />
      </mt-cell>
      <mt-field label="用户名" placeholder="请输入用户名" type="text" v-model="userForm.username"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="userForm.email"></mt-field>
      <div class="mint-cell mint-field">
        <div class="mint-cell-wrapper">
          <div class="mint-cell-title">
            <span class="mint-cell-text">性别</span>
          </div>
          <div class="mint-cell-value">
            <label class="mint-radiolist-label">
            <span class="mint-radio">
              <input type="radio" class="mint-radio-input" value="1" name="sex" v-model="userForm.sex">
              <span class="mint-radio-core"></span>
            </span>
              <span class="mint-radio-label">男</span>
            </label>
            <label class="mint-radiolist-label">
            <span class="mint-radio">
              <input type="radio" class="mint-radio-input" value="2" name="sex" v-model="userForm.sex">
              <span class="mint-radio-core"></span>
            </span>
              <span class="mint-radio-label">女</span>
            </label>
          </div>
        </div>
      </div>
      <mt-field label="出生年月" placeholder="请选择出生年月" type="text" v-model="userForm.dateOfBirth" readonly="readonly" @click.native.capture="selectBirthday"></mt-field>
      <mt-field label="所在地区" placeholder="请选择所在地区" type="text" v-model="userForm.address" readonly="readonly" @click.native.capture="selectAddress"></mt-field>
      <mt-field label="个性签名" placeholder="写一句话~让别人更了解你吧" type="textarea" rows="4" v-model="userForm.autograph"></mt-field>
    </section>
    <div class="edit-btn">
      <mt-button type="primary" @click="saveInfo">确认修改</mt-button>
    </div>
    <mt-popup v-model="birthdayPopup" position="bottom">
      <mt-timep :timep.sync="userForm.dateOfBirth"></mt-timep>
    </mt-popup>
    <mt-popup v-model="addressPopup" position="bottom">
      <mt-towns ref="addressPicker" :towns.sync="userForm.address"></mt-towns>
    </mt-popup>
  </div>

</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import MtTimep from '../../components/picker/Timep'
    import MtTowns from  '../../components/picker/Town'
    import {imgBaseUrl} from '../../until/config'

    export default {
      name: "",
      data() {
        return {
          birthdayPopup: false,
          addressPopup: false,
          brithdayYearMontn: '',
          imgBaseUrl:imgBaseUrl,
          userForm: ''
        };
      },
      components:{
        MtTimep,
        MtTowns
      },
      created(){
        this.userForm = Object.assign({},this.userInfo);
      },
      computed: {
        ...mapState(['userInfo'])
      },
      methods:{
        ...mapMutations(['SET_USERINFO']),
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
          this.$axios.post('/api/user/uploadAvatar', data).then(
            result =>{
              let res = result.data;
              if(res.status == 200){
                this.$store.commit('SET_USERINFO',{head: res.url});
              }
            }
          )
        },
        saveInfo(){
          this.$axios.post('/api/user/edit', this.userForm).then(
            result =>{
              let res = result.data;
              if(res.status == 200){
                this.$store.commit('SET_USERINFO',res.data);
                this.$toast({
                  message: res.msg,
                  position: 'middle',
                  duration: 2000
                });
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
          opacity: 0
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
