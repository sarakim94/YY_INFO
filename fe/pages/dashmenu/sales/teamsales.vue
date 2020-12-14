<template>
  <div>
    <base-header class="pb-6">
    </base-header>
    <div class="container-fluid mt--5">
      <div class="row mb-3">
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div class="col-xl-12 col-md-12">
                <card >
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">매출현황</h6>
                      <h5 class="h3 mb-0">매출 성장 추이</h5>
                    </div>

                    <div class="row mr-3" >
                      <base-input label="">
                        <el-select v-model="selects1.type" filterable
                                    placeholder="Type select" @change="updateDropdowns1">
                          <el-option v-for="option in selectOptions1"
                                      :key="option.label"
                                      :label="option.label"
                                      :value="option.value">
                          </el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>
                  <div class="chart-area">
                    <apex-chart align="center" :options="ApexLineChart.chartOptions" :series="ApexLineChart.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12 col-md-12">
                <card class="card h-100">
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">수금현황</h6>
                      <h5 class="h3 mb-0">수금 성장 추이</h5>
                    </div>

                    <div class="row mr-3" >
                      <base-input label="">
                        <el-select v-model="selects2.type" filterable
                                    placeholder="Type select" @change="updateDropdowns2">
                          <el-option v-for="option in selectOptions2"
                                      :key="option.label"
                                      :label="option.label"
                                      :value="option.value">
                          </el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>
                  <div>
                    <apex-chart align="center" :options="ApexLineChart2.chartOptions" :series="ApexLineChart2.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>  
          </div>
        </div>
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div class="col-xl-12 col-md-12">
                <card >
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">매출현황</h6>
                      <h5 class="h3 mb-0">매출 목표 달성률</h5>
                    </div>

                    <div class="row mr-3" >
                      <input class="form-control" type="month" :value="yearmonth" id="example-month-input" @change="updateMonth1" />
                    </div>
                  </div>
                  <div class="chart-area">
                    <apex-chart align="center" :options="ApexBarChart.chartOptions" :series="ApexBarChart.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12 col-md-12">
                <card class="card h-100">
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">수금현황</h6>
                      <h5 class="h3 mb-0">수금 목표 달성률</h5>
                    </div>

                    <div class="row mr-3" >
                      <input class="form-control" type="month" :value="yearmonth" id="example-month-input" @change="updateMonth2" />
                    </div>
                  </div>
                  <div>
                    <apex-chart align="center" :options="ApexBarChart2.chartOptions" :series="ApexBarChart2.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>  
          </div>
        </div>
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div class="col-xl-12 col-md-12">
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12 col-md-12">
                <card class="card h-100">
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">콜 현황</h6>
                      <h5 class="h3 mb-0">콜 등록 평균 현황</h5>
                    </div>

                    <div class="row mr-3" >
                      <input class="form-control" type="month" :value="yearmonth" id="example-month-input" @change="updateMonth3" />
                    </div>
                  </div>
                  <div>
                    <apex-chart align="center" :options="ApexBarChart3.chartOptions" :series="ApexBarChart3.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>  
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import * as chartConfigs from '~/components/argon-core/Charts/config';

  import RouteBreadCrumb from '~/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import BaseHeader from '~/components/argon-core/BaseHeader';
  import StatsCard from '~/components/argon-core/Cards/StatsCard';
  import { Charts } from "~/components/argon-core/Charts/config";

//SELECT 사용을 위한 컴포넌트
  import { Select, Option } from 'element-ui'

  function randomScalingFactor() {
    return Math.round(Math.random() * 100);
  }

  export default {
    layout: 'DashboardLayout',
    components: {
      StatsCard,
      BaseHeader,
      RouteBreadCrumb,
      [Select.name]: Select,
      [Option.name]: Option,
    },
    data() {
      return {
        year: new Date().getFullYear(),
        yearmonth : new Date().getFullYear() + '-' + ("0" + (1 + new Date().getMonth())).slice(-2),
        selectOptions1: [
        ],
        selects1: {
          type: '%',
        },
        selectOptions2: [
        ],
        selects2: {
          type: '%',
        },
        ApexLineChart: {
          chartOptions : {
            chart : {
              toolbar: {
                  show: false
              },
              type: 'line',
            },  
            stroke: {
              width: 7,
              curve: 'smooth'
            },
            xaxis: {
              categories: [],
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                gradientToColors: [ '#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              },
            },
            markers: {
              size: 4,
              colors: ["#FFA41B"],
              strokeColors: "#fff",
              strokeWidth: 2,
              hover: {
                size: 7,
              }
            },
            yaxis: {
              title: {
                text: '매출 금액',
              },
              labels: {
                formatter: function(value) {
                  return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              },
            }
          },
          series: [],
        },
        ApexLineChart2: {
          chartOptions : {
            chart : {
              toolbar: {
                  show: false
              },
              type: 'line',
            },  
            stroke: {
              width: 7,
              curve: 'smooth'
            },
            xaxis: {
              categories: [],
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                gradientToColors: [ '#FDD835'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
              },
            },
            markers: {
              size: 4,
              colors: ["#FFA41B"],
              strokeColors: "#fff",
              strokeWidth: 2,
              hover: {
                size: 7,
              }
            },
            yaxis: [{
              title: {
                text: '수금 금액',
              },
              labels: {
                formatter: function(value) {
                  return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              },
            }]
          },
          series: [],
        },
        ApexBarChart: {
          chartOptions : {
            chart : {
              toolbar: {
                  show: false
              },
              type: 'bar',
              stacked: true,
              stackType: '100%'
            },  
            xaxis: {
              categories: [],
            },
            yaxis: [{
              labels: {
                formatter: function(value) {
                  return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              },
            }]
          },
          series: [{
            name: '수금금액',
            data: [65007567, 55, 41, 67, 22, 43, 21, 49]
          }, {
            name: '미달성금액',
            data: [65007567, 23, 20, 8, 13, 27, 33, 12]
          }],
        },
        ApexBarChart2: {
          chartOptions : {
            chart : {
              toolbar: {
                  show: false
              },
              type: 'bar',
              stacked: true,
              stackType: '100%'
            },  
            xaxis: {
              categories: [],
            },
            
            yaxis: [{
              labels: {
                formatter: function(value) {
                  return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              },
            }]
          },
          series: [{
            name: '수금금액',
            data: [65, 55, 41, 67, 22, 43, 21, 49]
          }, {
            name: '미달성금액',
            data: [34, 23, 20, 8, 13, 27, 33, 12]
          }],
        },
        ApexBarChart3: {
          chartOptions : {
            chart : {
              toolbar: {
                  show: false
              },
              type: 'bar',
            },  
            xaxis: {
              categories: [],
            },
            annotations: {
               yaxis: [{
                y: 8,
                borderColor: '#00E396',
                label: {
                  borderColor: '#00E396',
                  style: {
                    color: '#fff',
                    background: '#00E396',
                  },
                  text: '권장콜수',
                }
              }],
            },
            yaxis: [{
              labels: {
                formatter: function(value) {
                  return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                }
              },
            }]
          },
          series: [],
        },
      };
    },
    methods : {
      async updateDropdowns1(index) {
        var lineData1 = await this.getLineData(index);
        this.ApexLineChart.chartOptions = lineData1.chartOptions;
        this.ApexLineChart.series = lineData1.series;
      },
      async updateDropdowns2(index) {
        var lineData2 = await this.getLineData2(index);
        this.ApexLineChart2.chartOptions = lineData2.chartOptions;
        this.ApexLineChart2.series = lineData2.series;
      },
      async updateMonth1(e) {
        var barData1 = await this.getBarData1(e.target.value);
        this.ApexBarChart.chartOptions = barData1.chartOptions;
        this.ApexBarChart.series = barData1.series;
      },
      async updateMonth2(e) {
        var barData2 = await this.getBarData2(e.target.value);
        this.ApexBarChart2.chartOptions = barData2.chartOptions;
        this.ApexBarChart2.series = barData2.series;
      },
      async updateMonth3(e) {
      },

      async getSelectOptions() {
        try {
            var response = await this.$axios.post('/select_code',{
                type: 'sdept2'
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },

      async getLineData(dept_cd) {
        try {
            var response = await this.$axios.post('/tsales_l1',{
                year: this.year,
                dept: dept_cd
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getLineData2(dept_cd) {
        try {
            var response = await this.$axios.post('/tsales_l2',{
                year: this.year,
                dept: dept_cd
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData1(value) {
        try {
            var response = await this.$axios.post('/tsales_b1',{
                year: this.year,
                month: value
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData2(value) {
        try {
            var response = await this.$axios.post('/tsales_b2',{
                year: this.year,
                month: value
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData3(value) {
        try {
            var response = await this.$axios.post('/tsales_b3',{
                year: this.year,
                month: value
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
    },
    async created () {
      this.$store.commit('SET_TITLE', '팀별 목표 현황');
      this.selectOptions1 = await this.getSelectOptions();
      this.selectOptions2 = await this.getSelectOptions();

      var lineData1 = await this.getLineData();
      this.ApexLineChart.chartOptions = lineData1.chartOptions;
      this.ApexLineChart.series = lineData1.series;

      var lineData2 = await this.getLineData2();
      this.ApexLineChart2.chartOptions = lineData2.chartOptions;
      this.ApexLineChart2.series = lineData2.series;

      var barData1 = await this.getBarData1(this.yearmonth);
      this.ApexBarChart.chartOptions = barData1.chartOptions;
      this.ApexBarChart.series = barData1.series;

      var barData2 = await this.getBarData2(this.yearmonth);
      this.ApexBarChart2.chartOptions = barData2.chartOptions;
      this.ApexBarChart2.series = barData2.series;

      var barData3 = await this.getBarData3(this.yearmonth);
      this.ApexBarChart3.chartOptions = barData3.chartOptions;
      this.ApexBarChart3.series = barData3.series;
    },    
    filters: {
      currency: function (value) {
        parseFloat(value)
        var num = new Number(value)
        return num.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      },
      fixed: function (value) {
        var num = new Number(value)
        return parseFloat(num.toFixed(2))
      },
    },
  };
</script>
<style></style>
