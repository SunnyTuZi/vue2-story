<!--
 * Create by Zwl on 2019/4/26
 * @Description: 新增故事
-->

<template>
  <section class="box">
    <my-mt-header title="编辑故事" :rightSlot="'addStory'" @addStory="addStory" ></my-mt-header>
    <section class="story-form">
      <mt-field placeholder="请输入故事名称" class="cell" v-model="storyForm.storyName"></mt-field>
      <div class="cell editor-box">
        <p class="placeholder-text" v-show="placeholder_text" @click="focusEditor">请输入至少20个字的内容</p>
        <vue-html5-editor class="content-box" :height="300" :show-module-name="false"
                          @change="updateData" :content="storyForm.storyContent">
        </vue-html5-editor>
      </div>
    </section>
  </section>
</template>

<script>
  import {mapState} from 'vuex'
  import {storyAdd} from "../../service/apiList";

  export default {
    data() {
      return {
        content:'',
        storyForm:{
          userId: '',
          storyName: '',
          storyContent: ''
        },
        placeholder_text: true,
      }
    },
    computed:{
      ...mapState(['userInfo'])
    },
    methods: {
      updateData(text) {
        this.storyForm.storyContent = text  ;
        if (text) {
          this.placeholder_text = false;
        } else {
          this.placeholder_text = true;
        }
      },
      focusEditor(){
        this.$refs.editor.focus();
      },
      async addStory(){
        this.storyForm.userId = this.userInfo._id;
        let res = await storyAdd(this.storyForm);
        if(res){

        }
      }
    }
  }


</script>

<style scoped lang="less">
  @import "../../public/style/mixin";

  .story-form {
    .cell {
      margin-top: 20px;
      botder-top: 1px solid #ddd;
    }
    .editor-box {
      background: #ffffff;
      position: relative;
      .placeholder-text {
        position: absolute;
        top: 58px;
        left: 10px;
        color: #555;
      }
    }
  }
</style>
