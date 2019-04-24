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
            timeData: [],
            timer:'',
          }
        },
        props:{
          rows:{
            type: Number,
            default: 5
          },
          timep:{
            type: String
          }
        },

        mounted(){
          this.timeData = [
            {
              flex: 1,
              values:[],
              className: 'years',
              textAlign: 'right',
              defaultIndex: 0
            }, {
              divider: true,
              content: '-',
              className: 'slot2'
            }, {
              flex: 1,
              values: [],
              className: 'montns',
              textAlign: 'left',
              defaultIndex: 0
            }
          ]
          this.countYear();
          this.countMonth();
        },
        methods:{
          getSlotValue(pcikr,values){
           if(values.length !=0){
             this.timer = values[0] + '-' + values[1];
             this.$emit('update:timep', this.timer);
           }

          },
          countYear(){
            let years = [];
            let year = new Date().getFullYear();
            let index = 0,current = 0;
            for(let i = year;i >= 1000;i--){
              years.push(i);
              if(this.timep){
                if(i == this.timep.split('-')[0]){
                  current = index;
                }
              }
              index++;
            }
            this.timeData[0].values = years;
            this.timeData[0].defaultIndex = current;
          },
          countMonth(){
            let montns = [], current = 0;
            for(let i = 1;i <= 12;i++){
              let m = this.handler(i);
              montns.push(m);
              if(this.timep){
                if(m == this.timep.split('-')[1]){
                  current = i-1;
                }
              }
            }
            this.timeData[2].values = montns;
            this.timeData[2].defaultIndex = current;
          },
          handler(num){
            return num > 9 ? num : '0' + num;
          }
        },
    }
</script>

<style scoped>

</style>
