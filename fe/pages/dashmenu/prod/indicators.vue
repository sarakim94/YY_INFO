<template>
    <div>
    <base-header class="pb-6">
    </base-header>
        <div class="container-fluid mt--5">
            <div class="row mb-3">
                <div class="col-xl-4 col-md-12">
                    <card class="card h-100">
                    <template slot="header">
                        <!-- Subtitle -->
                        <h6 class="surtitle">생산지표현황</h6>
                        <!-- Title -->
                        <h5 class="h3 mb-0">{{ year }}년 1인당 인건비</h5>
                    </template>
                    <div>
                        <apex-chart align="center" :options="ApexBarChart.chartOptions" :series="ApexBarChart.series"></apex-chart>
                    </div>
                    </card>
                </div>
                <div class="col-xl-4 col-md-12">
                    <card class="card h-100">
                    <template slot="header">
                        <!-- Subtitle -->
                        <h6 class="surtitle">생산지표현황</h6>
                        <!-- Title -->
                        <h5 class="h3 mb-0">{{ year }}년 수율현황</h5>
                    </template>
                    <div>
                        <apex-chart align="center" :options="ApexLineChart.chartOptions" :series="ApexLineChart.series"></apex-chart>
                    </div>
                    </card>    
                </div>
                <div class="col-xl-4 col-md-12">
                    <card class="card h-100">
                    <template slot="header">
                        <!-- Subtitle -->
                        <h6 class="surtitle">생산지표현황</h6>
                        <!-- Title -->
                        <h5 class="h3 mb-0">{{ year }}년 1인당 생산금액</h5>
                    </template>
                    <div>
                        <apex-chart align="center" :options="ApexBarChart2.chartOptions" :series="ApexBarChart2.series"></apex-chart>
                    </div>
                    </card>
                </div>
            </div>
        </div>
        <div class="container-fluid">
            <div class="row mb-3">
                <div class="col-xl-4 col-md-12">
                    <card class="card h-100">
                    <template slot="header">
                        <!-- Subtitle -->
                        <h6 class="surtitle">생산지표현황</h6>
                        <!-- Title -->
                        <h5 class="h3 mb-0">{{ year }}년 과다재고현황</h5>
                    </template>
                    <div>
                        <apex-chart align="center" :options="ApexMixChart.chartOptions" :series="ApexMixChart.series"></apex-chart>
                    </div>
                    </card>
                </div>
                <div class="col-xl-4 col-md-12">
                    <card class="card h-100">
                    <template slot="header">
                        <!-- Subtitle -->
                        <h6 class="surtitle">생산지표현황</h6>
                        <!-- Title -->
                        <h5 class="h3 mb-0">{{ year }}년 유효기간별 재고금액</h5>
                    </template>
                    <div>
                        <apex-chart align="center" :options="ApexBarChart3.chartOptions" :series="ApexBarChart3.series"></apex-chart>
                    </div>
                    </card>    
                </div>
                <div class="col-xl-4 col-md-12">
                    <card class="card h-100">
                    <template slot="header">
                        <!-- Subtitle -->
                        <h6 class="surtitle">생산지표현황</h6>
                        <!-- Title -->
                        <h5 class="h3 mb-0">제품별 부족재고</h5>
                    </template>
                    <div>
                        <apex-chart align="center" :options="ApexMixChart2.chartOptions" :series="ApexMixChart2.series"></apex-chart>
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
        ApexBarChart: {
            chartOptions: {
                chart: {
                    height: 400,
                    type: 'bar',
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                },
                stroke: {
                    width: 2
                },
                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    tickPlacement: 'on'
                },
                yaxis: [
                {
                    seriesName: '인건비',
                    tickAmount: 5,
                    max: 5000000,
                    min: 250000,
                    decimalsInFloat: 0,
                    labels: {
                    formatter: function(value) {
                        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    },
                    tooltip: {
                    enabled: true
                    }
                },
                ],
            },
            series: [],  
        },
        ApexBarChart2: {
            chartOptions: {
                chart: {
                    height: 400,
                    type: 'bar',
                },                
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                },
                plotOptions: {
                    bar: {
                        endingShape: 'rounded'  
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2
                },
                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                    tickPlacement: 'on'
                },
                yaxis: [
                {
                    seriesName: '생산금액',
                    tickAmount: 5,
                    max: 35000000,
                    min: 0,
                    decimalsInFloat: 0,
                    labels: {
                    formatter: function(value) {
                        return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    }
                    },
                    tooltip: {
                    enabled: true
                    }
                },
                ],
            },
            series: [],  
        },
        ApexBarChart3: {
            chartOptions: {
                chart: {
                    height: 400,
                    type: 'bar',
                },                
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    width: 2
                },
                title: {
                    text: '천만원<단위>'
                },
                grid: {
                    row: {
                        colors: ['#fff', '#f2f2f2']
                    }
                },
                xaxis: {
                    labels: {
                        rotate: -45
                    },
                    categories: ['03개월 미만', '06개월 미만', '09개월 미만', '12개월 미만', '18개월 미만', '18개월 이상'],
                    tickPlacement: 'on'
                },
            },
            series: [],  
        },
        ApexLineChart: {
          chartOptions: {
            chart: {
              height: 400,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              },
            },
            colors: ['#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            
            xaxis: {
              categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            },
            yaxis: [
              {
                seriesName: '수율',
                tickAmount: 5,
                max: 100,
                min: 50,
                decimalsInFloat: 0,
                labels: {
                  formatter: function(value) {
                    return value.toFixed(0).toString() + '%';
                  }
                },
                tooltip: {
                  enabled: true
                }
              },
            ],
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          },
          series: [],
        },
        ApexMixChart: {
            chartOptions: {
                chart: {
                    height: 400,
                    type: 'line',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                },
                stroke: {
                    width: [0, 4]
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: [],
                xaxis: {
                },
                yaxis: [{
                    title: {
                        text: '재고수량',
                    },
                }, 
                {
                    opposite: true,
                    title: {
                        text: '소모일수'    
                    }
                }]
            },
            
            series: [],
        },
        ApexMixChart2: {
            chartOptions: {
                chart: {
                    height: 400,
                    type: 'line',
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shade: 'light',
                        type: "horizontal",
                        shadeIntensity: 0.25,
                        gradientToColors: undefined,
                        inverseColors: true,
                        opacityFrom: 0.85,
                        opacityTo: 0.85,
                        stops: [50, 0, 100]
                    },
                },
                stroke: {
                    width: [0, 4]
                },
                dataLabels: {
                    enabled: true,
                    enabledOnSeries: [1]
                },
                labels: [],
                xaxis: {
                },
                yaxis: [{
                    title: {
                        text: '재고수량',
                    },
                }, 
                {
                    opposite: true,
                    title: {
                        text: '소모일수'    
                    }
                }]
            },
            
            series: [],
        },
      };
    },
    methods : {
      async getLineData() {
        try {
            var response = await this.$axios.post('/indicators_l1',{
                year: this.year
            });
            console.log(response.data); 
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData() {
        try {
            var response = await this.$axios.post('/indicators_b1',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData2() {
        try {
            var response = await this.$axios.post('/indicators_b2',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getBarData3() {
        try {
            var response = await this.$axios.post('/indicators_b3',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getMixData() {
        try {
            var response = await this.$axios.post('/indicators_m1',{
                year: this.year
            });
          
            return response.data;
        } catch (error) {
          console.log(error);
        }
      },
      async getMixData2() {
        try {
            var response = await this.$axios.post('/indicators_m2',{
                year: this.year
            });
          
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
        this.$store.commit('SET_TITLE', '생산지표현황');

        this.ApexBarChart.series = await this.getBarData();
        this.ApexLineChart.series = await this.getLineData();
        this.ApexBarChart2.series = await this.getBarData2();

        var mixData = await this.getMixData();
        this.ApexMixChart.series = mixData.series;
        this.ApexMixChart.chartOptions = mixData.chartOptions;

        var mixData2 = await this.getMixData2();
        this.ApexMixChart2.series = mixData2.series;
        this.ApexMixChart2.chartOptions = mixData2.chartOptions;

        this.ApexBarChart3.series = await this.getBarData3();
    },
  };
</script>
<style></style>
