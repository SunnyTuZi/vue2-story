<!--
 * Create by Zwl on 2019/4/23
 * @Description: 年月选择器
-->

<template>
  <div>
    <mt-picker :slots="timeData" :visibleItemCount="rows" @change="getSlotValue"></mt-picker>
  </div>
</template>

<script>
    export default {
        name: "Timep",
        data(){
          return {
            timeData: []
          }
        },
        props:{
          rows:{
            type: Number,
            default: 3
          },
          timep:{
            type: String
          }
        },
        created(){
          let day = this.timep.split('-');
          console.log(day)
        },
        mounted(){
          this.timeData = [
            {
              flex: 1,
              values: this.countYear(),
              className: 'years',
              textAlign: 'right'
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: this.countMonth(),
              className: 'montns',
              textAlign: 'left'
            }
          ]
        },
        methods:{
          getSlotValue(pcikr,values){
            this.timep = values[0] + '-' + values[1]
          },
          countYear(){
            let years = [];
            let year = new Date().getFullYear();
            for(let i = year;i >= 1000;i--){
              years.push(i);
            }
            return years;
          },
          countMonth(){
            let montns = [];
            for(let i = 1;i <= 12;i++){
              let m = this.handler(i);
              montns.push(m);
            }
            return montns;
          },
          handler(num){
            return num > 9 ? num : '0' + num;
          }
        }
    }
</script>

<style scoped>

</style>
