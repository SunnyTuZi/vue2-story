<!--
 * Create by Zwl on 2019/5/8
 * @Description: 分页器
-->

<template>
  <section class="page-box">
    <span class="iconfont icon-prev" @click="prevPage" :class="{disahed:myCurrent == 1}"></span>
    <a class="page" v-for="item in myTotal" :class="{active:myCurrent == item}" @click="selCurrent(item)"> {{item}}</a>
    <span class="iconfont icon-next" @click="nextPage" :class="{disahed:myCurrent == total}"></span>
  </section>
</template>

<script>
  export default {
    data(){
      return{
        myCurrent:1,
        myTotal:[]
      }
    },
    props: {
      //总页数
      total: {
        type: Number,
        default: 1
      },
      //当前页
      current: {
        type: Number,
        default: 1
      },
      //中间显示的页数
      middlePage:{
        type: Number,
        default:4
      }
    },
    mounted(){
      this.myCurrent = this.current;
      this.morePageHandler();
    },
    methods:{
      selCurrent(index){
        if(index != '...'){
          this.myCurrent = index;
        }
      },
      prevPage(){
        if(this.myCurrent > 1){
          this.myCurrent--;
        }
      },
      nextPage(){
        if(this.myCurrent < this.total){
          this.myCurrent++;
        }
      },
      morePageHandler(){
        this.myTotal = [];
        //判断总页数是否大于中间页和首页、尾页之和
        if(this.total > (this.middlePage + 2)){
          //判断当前页少于中间页的页数
          if(this.myCurrent <= this.middlePage){
            //中间页预留多一位数，用于分中间页
            this.myTotal = [...this.numToArr(1,this.middlePage + 1),'...',this.total];
          }else{
            //判断当前页是少于总页数减去中间总页数之和
            if(this.myCurrent <= this.total - this.middlePage){
              //取中间页除2的向下整除，用于渲染中间页
              let n = Math.floor(this.middlePage / 2);
              //以当前页为中间值，向左右渲染页码
              this.myTotal = [1,'...',...this.numToArr(this.myCurrent - n,this.myCurrent + n),'...',this.total];
            }else{
              //判断当前页大于总页数减去中间页之和，直接渲染后面的页码
              this.myTotal = [1,'...',...this.numToArr(this.total - this.middlePage,this.total)];
            }
          }
        }else{
          this.myTotal = [...this.numToArr(1,this.total)];
        }
      },
      numToArr(start,end){
        let arr = [];
        for(let i = start;i <= end; i++){
          arr.push(i);
        }
        return arr;
      }
    },
    watch:{
      //监听页码的变动，重新渲染页码
      myCurrent:function () {
        this.morePageHandler();
        this.$emit('pageChange',this.myCurrent);
      }
    }
  }
</script>

<style scoped lang="less">
  @import "../../public/style/mixin";

  .page-box {
    line-height: 50px;
    text-align: center;
    .page {
      margin-left: 10px;
      cursor: pointer;
    }
    .iconfont {
      color: #333;
    }
    .active {
      color: @theme-color !important;
    }
    .disahed {
      color: #bbb !important;
    }
  }
</style>
