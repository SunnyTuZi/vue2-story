<!--
 * Create by Zwl on 2019/4/23
 * @Description: 地区选择器
-->

<template>
    <div>
        <mt-picker :slots="townData" value-key="name" :visibleItemCount="row" @change="changeProvince"></mt-picker>
    </div>
</template>

<script>
    export default {
        name: "Town",
        data(){
            return{
              townData: []
            }
        },
        props:{
            row:{
                type: Number,
                default: 3
            },
            towns:{
              type: String
            }
        },
        mounted(){
            this.townData = [
              {
                flex: 1,
                values: [],
                className: 'provinces',
                textAlign: 'right'
              }, {
                divider: true,
                content: '-',
                className: 'slot2'
              }, {
                flex: 1,
                values:[],
                className: 'citys',
                textAlign: 'left'
              }
            ]
            this.getProvince();
        },
        methods:{
            getProvince(){
                this.$axios.get('api/public/getProvince').then(
                  (result) =>{
                    this.townData[0].values = result.data.data
                  }
                );
            },
          changeProvince(picker,values){
              let data = picker.getSlotValue(0);
              if(data){
                let uid = data.code;
                this.$axios.get('api/public/getCity').then(
                  (result) =>{
                    let data = result.data.data;
                    let res = [];
                    for(let o of data){
                      if(o.provinceCode == uid){
                        res.push(o);
                      }
                    }
                    picker.setSlotValues(1,res);
                  }
                );
              }
              if(values.length == 2){
                this.towns = values[0].name + '-' + values[1].name;
              }

          }

        }
    }
</script>

<style scoped>

</style>
