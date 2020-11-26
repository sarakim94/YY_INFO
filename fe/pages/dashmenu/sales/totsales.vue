<template>
  <div>
    <base-header class="pb-6">
    </base-header>
    <div class="container-fluid mt--5">
      <div class="row mb-3">
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div v-if="CardData.s_ratio < 0" class="col-xl-6 col-md-6">
                <stats-card title=""
                            type="gradient-red"
                            sub-title=""
                            icon="ni ni-fat-delete">
                    <span class="h2">{{ CardData.sales | currency }}</span>  
                  <template slot="footer">
                    <span class="h1 text-warning mr-2"><i class="fa fa-arrow-down"></i> {{ CardData.s_ratio | fixed  }}% <br /> </span>
                    <span class="text-nowrap">작년 대비 매출 성장</span>
                  </template>
                </stats-card>
              </div>
              <div v-else class="col-xl-6 col-md-6">
                <stats-card title=""
                            type="gradient-green"
                            sub-title=""
                            icon="ni ni-fat-add">
                    <span class="h2">{{ CardData.sales | currency }}</span>  
                  <template slot="footer">
                    <span class="h1 text-success mr-2"><i class="fa fa-arrow-up"></i> {{ CardData.s_ratio | fixed }}% <br /> </span>
                    <span class="text-nowrap">작년 대비 매출 성장</span>
                  </template>
                </stats-card>
              </div>

              <div v-if="CardData.m_ratio < 0" class="col-xl-6 col-md-6">
                <stats-card title=""
                            type="gradient-red"
                            sub-title=""
                            icon="ni ni-fat-delete">
                    <span class="h2">{{ CardData.money | currency }}</span>  
                  <template slot="footer">
                    <span class="h1 text-warning mr-2"><i class="fa fa-arrow-down"></i> {{ CardData.m_ratio | fixed  }}% <br /> </span>
                    <span class="text-nowrap">작년 대비 수금 성장</span>
                  </template>
                </stats-card>
              </div>
              <div v-else class="col-xl-6 col-md-6">
                <stats-card title=""
                            type="gradient-green"
                            sub-title=""
                            icon="ni ni-fat-add">
                    <span class="h2">{{ CardData.money | currency }}</span>  
                  <template slot="footer">
                    <span class="h1 text-success mr-2"><i class="fa fa-arrow-up"></i> {{ CardData.m_ratio | fixed }}% <br /> </span>
                    <span class="text-nowrap">작년 대비 수금 성장</span>
                  </template>
                </stats-card>
              </div>
            </div>
            <div class="row">
              <div class="col-xl-6 col-md-6">
                <card >
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">매출 현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">매출 달성율({{year}}년)</h5>
                  </template>
                  <div>
                    <apex-chart align="center" :options="ApexCircleChart.chartOptions" :series="ApexCircleChart.series"></apex-chart>
                  </div>
                </card>
              </div>
              <div class="col-xl-6 col-md-6">
                <card >
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">수금 현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">수금 달성율({{year}}년)</h5>
                  </template>
                  <div>
                    <apex-chart align="center" :options="ApexCircleChart2.chartOptions" :series="ApexCircleChart2.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12 col-md-12">
                <card class="card h-100">
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">매출현황</h6>
                      <h5 class="h3 mb-0">월별 매출 현황</h5>
                    </div>

                    <div class="row mr-3" >
                      <base-input label="">
                        <el-select v-model="selects.type" filterable
                                    placeholder="Type select" @change="updateDropdowns">
                          <el-option v-for="option in selectOptions"
                                      :key="option.label"
                                      :label="option.label"
                                      :value="option.value">
                          </el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>
                  <div>
                    <apex-chart align="center" :options="ApexMixChart.chartOptions" :series="ApexMixChart.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>

          </div>
        </div>
        <div class="col-xl-4 col-md-12">
          <div class="h-100 d-flex flex-column">
            <div class="row">
              <div class="col-xl-12">
                <card >
                  <template slot="header">
                    <!-- Subtitle -->
                    <h6 class="surtitle">매출현황</h6>
                    <!-- Title -->
                    <h5 class="h3 mb-0">매출 현황 비율</h5>
                  </template>
                  <div >
                    <apex-chart align="center" :options="ApexDonutChart.chartOptions" :series="ApexDonutChart.series"></apex-chart>
                  </div>
                </card>
              </div>
            </div>
            <div class="row justify-content-center flex-grow-1">
              <div class="col-xl-12">
                <card class="card h-100">
                  <div slot="header" class="row align-items-center">
                    <div class="col">
                      <h6 class="text-uppercase text-muted ls-1 mb-1">수금현황</h6>
                      <h5 class="h3 mb-0">월별 수금 현황</h5>
                    </div>

                    <div class="row mr-3" >
                      <base-input label="">
                        <el-select v-model="selects.type" filterable
                                    placeholder="Type select" @change="updateDropdowns">
                          <el-option v-for="option in selectOptions"
                                      :key="option.label"
                                      :label="option.label"
                                      :value="option.value">
                          </el-option>
                        </el-select>
                      </base-input>
                    </div>
                  </div>
                  <div >
                    <apex-chart align="center" :options="ApexMixChart2.chartOptions" :series="ApexMixChart2.series"></apex-chart>
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
                      <h5 class="h3 mb-0">매출 성장 추이</h5>
                    </div>

                    <div class="row mr-3" >
                      <base-input label="">
                        <el-select v-model="selects.type" filterable
                                    placeholder="Type select" @change="updateDropdowns">
                          <el-option v-for="option in selectOptions"
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
                        <el-select v-model="selects.type" filterable
                                    placeholder="Type select" @change="updateDropdowns">
                          <el-option v-for="option in selectOptions"
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
        selectOptions: [
        ],
        selects: {
        },
        CardData : {
        },
        CircleData : {
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
            labels: ['Donut1', 'Donut2', 'Donut3', 'Donut4'],
            fill: {
              type: 'gradient',
            },
          },
          series:[33,35,44,41],
        },
        ApexCircleChart: {
          chartOptions : {
            chart: {
              type: 'radialBar',
              offsetY: -20
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                  name: {
                    fontSize: '16px',
                    color: '#00248C',
                    offsetY: 90
                  },
                  value: {
                    offsetY: 46,
                    fontSize: '22px',
                    color: '#00248C',
                    formatter: function (val) {
                      return val + "%";
                    }
                  }
                }
              }
            },
            colors: ['#00248C'],
            fill: {
              type: 'gradient',
              gradient: {
                  shade: 'dark',
                  shadeIntensity: 0.15,
                  inverseColors: false,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 50, 65, 91]
              },
            },
            stroke: {
              dashArray: 2
            },
            labels: ['매출 실적 달성율'],
          },
          series : [67]
          ,
        },

        ApexCircleChart2: {
          chartOptions : {
            chart: {
              type: 'radialBar',
              offsetY: -20
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 135,
                dataLabels: {
                  name: {
                    fontSize: '16px',
                    color: '#A500AD',
                    offsetY: 90
                  },
                  value: {
                    offsetY: 46,
                    fontSize: '22px',
                    color: '#A500AD',
                    formatter: function (val) {
                      return val + "%";
                    }
                  }
                }
              }
            },
            colors: ['#A500AD'],
            fill: {
              type: 'gradient',
              gradient: {
                  shade: 'dark',
                  shadeIntensity: 0.15,
                  inverseColors: false,
                  opacityFrom: 1,
                  opacityTo: 1,
                  stops: [0, 50, 65, 91]
              },
            },
            stroke: {
              dashArray: 2
            },
            labels: ['수금 실적 달성율'],
          },
          series : [78]
          ,
        },
        ApexMixChart: {
          chartOptions : {
            chart : {
              type: 'line',
            },
            colors: ['#5C90FE', '#00FF87','#B200A2'],
            stroke: {
              width: [1, 1, 4]
            },
            fill: {
              type: 'gradient',
            },
            xaxis: {
              categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            },
            yaxis: [
              {
                max : 100000,
                tickAmount: 5,
                axisTicks: {
                  show: true,
                },
                labels: {
                  style: {
                    colors: '#5C90FE'
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
              },
              {
                show : false,
                max : 100000,
                tickAmount: 5,
                opposite: true,
                axisTicks: {
                  show: false,
                },
                labels: {
                  style: {
                    colors: '#00FF87'
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
              },
              {
                tickAmount: 5,
                opposite: true,
                axisTicks: {
                  show: true,
                },
                labels: {
                  style: {
                    colors: '#B200A2'
                  },
                  formatter: function(value) {
                    return value.toFixed(2).toString() + '%';
                  }
                },
              },
            ],
            legend: {
              show : true,
              position: 'bottom',
            },
          },
          series: [],
        },
        ApexMixChart2: {
          chartOptions : {
            chart : {
              type: 'line',
            },
            colors: ['#5C90FE', '#00FF87','#B200A2'],
            stroke: {
              width: [1, 1, 4]
            },
            fill: {
              type: 'gradient',
            },
            xaxis: {
              categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            },
            yaxis: [
              {
                max : 100000,
                tickAmount: 5,
                axisTicks: {
                  show: true,
                },
                labels: {
                  style: {
                    colors: '#5C90FE'
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
              },
              {
                show : false,
                max : 100000,
                tickAmount: 5,
                opposite: true,
                axisTicks: {
                  show: false,
                },
                labels: {
                  style: {
                    colors: '#00FF87'
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
              },
              {
                tickAmount: 5,
                opposite: true,
                axisTicks: {
                  show: true,
                },
                labels: {
                  style: {
                    colors: '#B200A2'
                  },
                  formatter: function(value) {
                    return value.toFixed(2).toString() + '%';
                  }
                },
              },
            ],
            legend: {
              show : true,
              position: 'bottom',
            },
          },
          series: [],
        },
        ApexLineChart: {
          chartOptions : {
            chart : {
              type: 'line',
            },  
            stroke: {
              width: 7,
              curve: 'smooth'
            },
            xaxis: {
              categories: ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],
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
              min: 0,
              max: 3000000,
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
              type: 'line',
            },  
            stroke: {
              width: 7,
              curve: 'smooth'
            },
            xaxis: {
              categories: ['2011','2012','2013','2014','2015','2016','2017','2018','2019','2020'],
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
              min: 0,
              max: 3000000,
              title: {
                text: '수금 금액',
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
      };
    },
    methods : {
      async updateDropdowns(index) {
      },

      async getCardData() {
        try {
            var response = await this.$axios.post('/sales_c1',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getCircleData() {
        try {
            var response = await this.$axios.post('/sales_cc1',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getDonutData() {
        try {
            var response = await this.$axios.post('/sales_d1',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getMixData(dept_cd) {
        try {
            var response = await this.$axios.post('/sales_m1',{
                year: this.year,
                dept: dept_cd
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getMixData2(dept_cd) {
        try {
            var response = await this.$axios.post('/sales_m2',{
                year: this.year,
                dept: dept_cd
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getSelectOptions() {
        try {
            var response = await this.$axios.post('/select_code',{
                type: 'sdept'
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getLineData(dept_cd) {
        try {
            var response = await this.$axios.post('/sales_l1',{
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
            var response = await this.$axios.post('/sales_l2',{
                year: this.year,
                dept: dept_cd
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
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
    async created () {
      this.$store.commit('SET_TITLE', '매출수금현황');
      this.selectOptions = await this.getSelectOptions();
      this.selects.type = this.selectOptions[0].value;

      this.CardData = await this.getCardData();
      this.CircleData = await this.getCircleData();
      this.ApexCircleChart.series = this.CircleData.sales;
      this.ApexCircleChart2.series = this.CircleData.money;

      var tmp = await this.getDonutData();
      this.ApexDonutChart.chartOptions = tmp.chartOptions;
      this.ApexDonutChart.series = tmp.series;
    
      this.ApexMixChart.series = await this.getMixData();
      this.ApexMixChart2.series = await this.getMixData2();

      var lineData1 = await this.getLineData();
      this.ApexLineChart.chartOptions = lineData1.chartOptions;
      this.ApexLineChart.series = lineData1.series;

      var lineData2 = await this.getLineData2();
      this.ApexLineChart2.chartOptions = lineData2.chartOptions;
      this.ApexLineChart2.series = lineData2.series;
    },
  };
</script>
<style></style>
