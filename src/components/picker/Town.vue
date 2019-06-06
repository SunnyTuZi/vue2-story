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
  import {mapMutations, mapState} from 'vuex'

  export default {
    data() {
      return {
        townData: [],
        townValue: '',
        pro_start: 0,
        city_start: 0
      }
    },
    props: {
      row: {
        type: Number,
        default: 5
      },
      towns: {
        type: String
      }
    },
    mounted() {
      this.townData = [
        {
          flex: 1,
          values: this.provinces,
          className: 'provinces',
          textAlign: 'right',
          defaultIndex: this.pro_start
        }, {
          divider: true,
          content: '-',
          className: 'slot2'
        }, {
          flex: 1,
          values: [],
          className: 'citys',
          textAlign: 'left',
          defaultIndex: this.city_start
        }
      ]
      this.getProvince();
    },
    computed: {
      ...mapState(['provinces','citys'])
    },
    methods: {
      ...mapMutations(['SET_PROVINCES', 'SET_CITYS']),
      getProvince() {
        if (! this.provinces) {
          this.$axios.get('api/public/getProvince').then(
            (result) => {
              let data = result.data;
              this.$store.commit('SET_PROVINCES', data);
              this.townData[ 0 ].values = this.provinces;
              this.setProvince();
            }
          );
        } else {
          this.setProvince();
        }

      },
      setProvince() {
        if(!province) return;
        let province = this.towns.split('-')[ 0 ];
        //寻找地址的序号
        for (let i = 0; i < this.provinces.length; i ++) {
          if (province == this.provinces[ i ].name) {
            this.pro_start = i;
            break;
          }
        }
        //设置选中值
        this.townData[ 0 ].defaultIndex = this.pro_start;
      },
      changeProvince(picker, values) {
        if (values == 0) return;
        let data = picker.getSlotValue(0);
        if (data) {
          let uid = data.code;
          if (! this.citys) {
            this.$axios.get('api/public/getCity').then(
              (result) => {
                let data = result.data;
                this.$store.commit('SET_CITYS', data);
                this.setCitys(picker,uid);
              }
            );
          }else{
            this.setCitys(picker,uid);
          }
        }
        //重新编写地址
        this.townValue = '';
        for (let i = 0; i < values.length; i ++) {
          if (values[ i ]) {
            if (values[ i + 1 ]) {
              this.townValue += values[ i ].name + '-'
            } else {
              this.townValue += values[ i ].name;
            }
          }
        }
        //定义towns字段父子数据同步
        this.$emit('update:towns', this.townValue);
      },
      //设置城市的初始值
      setCitys(picker,uid) {
        let res = [];
        let city = this.towns.split('-')[ 1 ];
        for (let i = 0; i < this.citys.length; i ++) {
          if (this.citys[ i ].provinceCode == uid) {
            res.push(this.citys[ i ]);
            if (city == this.citys[ i ].name) {
              this.city_start = i;
            }
          }
        }
        picker.setSlotValues(1, res);
      }

    }
  }
</script>

<style scoped>

</style>
