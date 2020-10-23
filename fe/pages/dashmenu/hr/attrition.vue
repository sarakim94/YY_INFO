<template>
  <div>
    <base-header class="pb-6">
    </base-header>
    <div class="container-fluid mt--5">
      <div class="row mb-3">
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div class="col-xl-6 col-md-6">
                <stats-card title=""
                            type="gradient-green"
                            sub-title=""
                            icon="ni ni-fat-add">
                    <span class="h4 text-gray mr-2">입사자 수</span>
                    <span class="h1">{{ CardData.in_cnt }}</span>  
                  <template slot="footer">
                    <span class="mr-2"><h1 class="text-success display-3">{{ CardData.in_per | fixed  }}%</h1></span>
                    <span class="text-nowrap">Since last year</span>
                  </template>
                </stats-card>
              </div>
              <div class="col-xl-6 col-md-6">
                <stats-card title=""
                            type="gradient-red"
                            sub-title=""
                            icon="ni ni-fat-delete">
                    <span class="h4 text-gray mr-2">퇴사자 수</span>
                    <span class="h1">{{ CardData.out_cnt }}</span>  
                  <template slot="footer">
                    <span class="mr-2"><h1 class="text-danger display-3">{{ CardData.out_per | fixed  }}%</h1></span>
                    <span class="text-nowrap">Since last year</span>
                  </template>
                </stats-card>
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12">
                <card class = "card h-100">
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">인원현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">직군별 인원</h5>
                  </template>
                  <div >
                    <apex-chart align="center" :options="ApexDonutChart.chartOptions" :series="ApexDonutChart.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8 col-md-12">
          <card class="card h-100">
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">입사추이현황</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">나이/연봉 별 입퇴사 현황(최근 5년)</h5>
            </template>
            <div>
              <apex-chart align="center" :options="ApexScatterChart.chartOptions" :series="ApexScatterChart.series"></apex-chart>
            </div>
          </card>
        </div>
      </div>
      <div class="row">
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div class="col-xl-6 col-md-6">
                <card >
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">입사현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">성별 입사자 현황({{year}}년 기준)</h5>
                  </template>
                  <div>
                    <apex-chart align="center" :options="ApexPieChart.chartOptions" :series="ApexPieChart.series"></apex-chart>
                  </div>
                </card>
              </div>
              <div class="col-xl-6 col-md-6">
                <card >
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">퇴사현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">성별 퇴사자 현황({{year}}년 기준)</h5>
                  </template>
                  <div>
                    <apex-chart align="center" :options="ApexPieChart2.chartOptions" :series="ApexPieChart2.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12 col-md-12">
                <card class="card h-100">
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">퇴사현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">근속연수 별 퇴사자 현황(전체)</h5>
                  </template>
                  <div>
                    <apex-chart align="center" :options="ApexBarChart.chartOptions" :series="ApexBarChart.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-8 col-md-12">
          <card class="card h-100">
            <template slot="header">
              <!-- Subtitle -->
              <h6 class="surtitle">입사추이현황</h6>
              <!-- Title -->
              <h5 class="h3 mb-0">부서 별 입/퇴사자 현황({{year}}년 기준)</h5>
            </template>
            <div class="chart-area">
              <apex-chart align="center" :options="ApexBarChart2.chartOptions" :series="ApexBarChart2.series"></apex-chart>
            </div>
          </card>
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

  function randomScalingFactor() {
    return Math.round(Math.random() * 100);
  }

  export default {
    layout: 'DashboardLayout',
    components: {
      StatsCard,
      BaseHeader,
      RouteBreadCrumb
    },
    data() {
      return {
        year: new Date().getFullYear(),
        CardData : {
        },
        ApexDonutChart: {
          chartOptions:{
            legend: {
              show : true,
              position: 'bottom',
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    name: {
                      show: true,
                      fontSize: '22px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 600,
                      color: undefined,
                      offsetY: -10,
                      formatter: function (val) {
                        return val
                      }
                    },
                    value: {
                      show: true,
                      fontSize: '16px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 400,
                      color: undefined,
                      offsetY: 16,
                      formatter: function (val) {
                        return val
                      }
                    },
                     total: {
                      show: true,
                      showAlways: false,
                      label: 'Total',
                      fontSize: '22px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 600,
                      color: '#373d3f',
                      formatter: function (w) {
                        return w.globals.seriesTotals.reduce((a, b) => {
                          return a + b
                        }, 0)
                      }
                    },
                  }
                }
              }
            },
            chart: {
              type: 'donut',
            },
            labels: ['사무', '연구', 'MSC', '생산'],
          },
          series:[44, 55, 13, 43],
        },

        ApexScatterChart: {
          chartOptions:{
            chart: {
              type: 'scatter',
            },
            colors: ['#48C278', '#FF4646'],
            xaxis: {
              tickAmount: 10,
              labels: {
                formatter: function(val) {
                  return parseFloat(val).toFixed(1) + '만원';
                }
              }
            },
            yaxis: {
              tickAmount: 7,
            }
          },
          series: [
          ],
        },

        ApexBarChart: {
          chartOptions:{
            chart: {
              type: 'bar',
            },
            plotOptions: {
              bar: {
                dataLabels: {
                  position: 'top', // top, center, bottom
                },
              }
            },
            dataLabels: {
              enabled: true,
              formatter: function (val) {
                return val;
              },
              offsetY: -20,
              style: {
                fontSize: '12px',
                colors: ["#304758"]
              }
            },
            xaxis: {
              categories: ["1년", "2년", "3년", "4년", "5년", "6년", "7년", "8년", "9년", "10년"],
              position: 'top',
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false
              },
              crosshairs: {
                fill: {
                  type: 'gradient',
                  gradient: {
                    colorFrom: '#D8E3F0',
                    colorTo: '#BED1E6',
                    stops: [0, 100],
                    opacityFrom: 0.4,
                    opacityTo: 0.5,
                  }
                }
              },
              tooltip: {
                enabled: true,
              }
            },
            yaxis: {
              axisBorder: {
                show: false
              },
              axisTicks: {
                show: false,
              },
              labels: {
                show: false,
                formatter: function (val) {
                  return val;
                }
              }
            
            },
          },
          series: [],
        },

        ApexBarChart2: {
          chartOptions:{
            colors: ['#48C278', '#FF4646'],
            chart: {
              type: 'bar',
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
              },
            },
            dataLabels: {
              enabled: false,
            },
            xaxis: {
              categories : [],
            },
          },
          series: [{
            name: '입사자',
            data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
          }, {
            name: '퇴사자',
            data: [76, 85, 101, 98, 87, 105, 91, 114, 94]
          },],
        },

        ApexPieChart: {
          chartOptions : {
            chart : {
              type: 'pie',
            },
            colors: ['#5C90FE', '#FE5C5C'],
            labels: ['남자', '여자'],
            legend: {
              show : true,
              position: 'bottom',
            },
          },
          series : [34, 76]
          ,
        },

        ApexPieChart2: {
          chartOptions : {
            chart : {
              type: 'pie',
            },
            colors: ['#5C90FE', '#FE5C5C'],
            labels: ['남자', '여자'],
            legend: {
              show : true,
              position: 'bottom',
            },
          },
          series : [34, 76]
          ,
        }
      };
    },
    methods : {
      async getDonutData() {
        try {
          var response = await this.$axios.get('/attrition_d1');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getScatterData() {
        try {
          var response = await this.$axios.get('/attrition_s1');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData() {
        try {
          var response = await this.$axios.get('/attrition_b1');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData2() {
        try {
          var response = await this.$axios.get('/attrition_b2');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getPieData() {
        try {
          var response = await this.$axios.get('/attrition_p1');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getPieData2() {
        try {
          var response = await this.$axios.get('/attrition_p2');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getCardData() {
        try {
          var response = await this.$axios.get('/attrition_v1');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      },
    },
    filters: {
      fixed: function (value) {
        var num = new Number(value)
        return parseFloat(num.toFixed(2))
      },
    },
    async created () {
      this.$store.commit('SET_TITLE', '입사추이현황');

      this.ApexDonutChart.series = await this.getDonutData();
      this.ApexScatterChart.series = await this.getScatterData();
      this.ApexBarChart.series = await this.getBarData();
      
      var data = await this.getBarData2();
      this.ApexBarChart2.series = data.series;
      this.ApexBarChart2.chartOptions = data.chartOptions;
      
      this.ApexPieChart.series = await this.getPieData();
      this.ApexPieChart2.series = await this.getPieData2();

      this.CardData = await this.getCardData();
    },
  };
</script>
<style></style>
