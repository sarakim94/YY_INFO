<template>
  <div>
    <base-header class="pb-6" type="">
      <!-- Card stats -->
      <div class="row mt-4">
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-primary border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="mb-3 row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">월 수금</h5>
                  <span class="h2 font-weight-bold mb-0 text-white"> {{ ApexData.mon_sales | currency }} <br /> </span> 
                </div>
              </div>
              <span v-if="ApexData.mon_sales_up < 0" class="text-warning mr-2"><i class="fa fa-arrow-down"></i> {{ ApexData.mon_sales_up | fixed }}% <br /> </span>
              <span v-else class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{ ApexData.mon_sales_up | fixed }}% <br /> </span>
              <span class="h4 font-weight-bold mb-0 text-white">Since last month</span>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-info border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">월 목표 달성률</h5>
                  <span class="h2 font-weight-bold mb-0 text-white"> {{ ApexData.mon_goal_sales | currency }} </span>
                  <div class="mt-3">
                    <span class="h2 font-weight-bold mb-0 text-white">{{ ApexData.mon_goal_rate | fixed }}%</span>
                    <base-progress class="progress-xs mt-3 mb-0" type="success" :value="ApexData.mon_goal_rate" ></base-progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-default border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="mb-3 row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">연 수금</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">{{ ApexData.year_sales | currency }} <br /> </span> 
                </div>
              </div>
              <span v-if="ApexData.year_sales_up < 0" class="text-warning mr-2"><i class="fa fa-arrow-down"></i> {{ ApexData.year_sales_up | fixed }}% <br /> </span>
              <span v-else class="text-success mr-2"><i class="fa fa-arrow-up"></i> {{ ApexData.year_sales_up | fixed }}% <br /> </span>
              <span class="h4 font-weight-bold mb-0 text-white">Since last year</span>
            </div>
          </div>
        </div>
        <div class="col-xl-3 col-md-6">
          <div class="card bg-gradient-danger border-0">
            <!-- Card body -->
            <div class="card-body">
              <div class="row">
                <div class="col">
                  <h5 class="card-title text-uppercase text-muted mb-0 text-white">연 목표 달성률</h5>
                  <span class="h2 font-weight-bold mb-0 text-white">{{ ApexData.year_goal_sales | currency }}</span>
                  <div class="mt-3">
                    <span class="h2 font-weight-bold mb-0 text-white">{{ ApexData.year_goal_rate | fixed }}%</span>
                    <base-progress class="progress-xs mt-3 mb-0" type="success" :value="ApexData.year_goal_rate" ></base-progress>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--6">
      <div class="card-deck flex-column flex-xl-row">
        <card header-classes="bg-transparent">
          <div slot="header" class="row align-items-center">
            <div class="col">
              <h6 class="text-uppercase text-muted ls-1 mb-1">Performance</h6>
              <h5 class="h3 mb-0">전체 수금 현황</h5>
            </div>
          </div>

          <div class="d-none d-xl-block">
            <apex-chart width="85%" align="center" :options="ApexChart.chartOpetions" :series="ApexData.series"></apex-chart>
          </div>
          <div class="d-xl-none">
            <apex-chart width="100%" align="center" :options="ApexChart.chartOpetions2" :series="ApexData.series"></apex-chart>
          </div>
        </card>

      </div>
      <!-- End charts-->

      <!--Tables & Widgets-->
      <div class="row">
        <div class="col-xl-12">
          <checkbox-colored-table :tdata="ApexData.table"></checkbox-colored-table>
        </div>
      </div>
      <!--End Tables & Widgets-->
    </div>

  </div>
</template>
<script>
  // Charts
  import * as chartConfigs from '@/components/argon-core/Charts/config';

  // Components
  import BaseHeader from '@/components/argon-core/BaseHeader';
  import BaseProgress from '@/components/argon-core/BaseProgress';
  import RouteBreadCrumb from '@/components/argon-core/Breadcrumb/RouteBreadcrumb';
  import StatsCard from '@/components/argon-core/Cards/StatsCard';

  // Table
  import CheckboxColoredTable from '@/components/tables/RegularTables/SalesTable';

  export default {
    layout: 'DashboardLayout',
    components: {
      BaseHeader,
      BaseProgress,
      RouteBreadCrumb,
      StatsCard,
      CheckboxColoredTable,
    },

    data () {
      return {
        ApexData: {},
        ApexChart: {
          chartOpetions: {
            chart: {
              height: 400,
              type: 'line',
              stacked: false
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [2],
              formatter: function(value) {
                return value.toFixed(2) + '%';
              }
            },
            stroke: {
              width: [1, 1, 4]
            },
            xaxis: {
              categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            },
            yaxis: [
              {
                seriesName: 'Sales',
                tickAmount: 8,
                decimalsInFloat: 0,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#008FFB'
                },
                labels: {
                  style: {
                    colors: '#008FFB'
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
                title: {
                  text: '목표 수금',
                  style: {
                    color: '#008FFB',
                    fontSize: '12px',
                  }
                },
                tooltip: {
                  enabled: true
                }
              },
              {
                seriesName: 'Sales',
                opposite: true,
                tickAmount: 8,
                decimalsInFloat: 0,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#00E396'
                },
                labels: {
                  style: {
                    colors: '#00E396',
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
                title: {
                  text: '월 수금 현황',
                  style: {
                    color: '#00E396',
                    fontSize: '12px',
                  }
                },
              },
              {
                seriesName: 'SalesFlow',
                opposite: true,
                tickAmount: 8,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#FEB019'
                },
                labels: {
                  style: {
                    colors: '#FEB019',
                  },
                  formatter: function(value) {
                    return value.toFixed(2) + '%';
                  }
                },
                title: {
                  text: '목표 달성률',
                  style: {
                    color: '#FEB019',
                    fontSize: '12px',
                  }
                },
              },
            ],
            tooltip: {
              fixed: {
                enabled: false,
                offsetY: 30,
                offsetX: 60
              },
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 70
            }
          },
          chartOpetions2: {
            chart: {
              height: 350,
              type: 'line',
              stacked: false
            },
            dataLabels: {
              enabled: true,
              enabledOnSeries: [2],
              formatter: function(value) {
                return value.toFixed(0) + '%';
              }
            },
            stroke: {
              width: [1, 1, 4]
            },
            xaxis: {
              categories: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월']
            },
            yaxis: [
              {
                seriesName: 'Sales',
                show: false,
                tickAmount: 8,
                decimalsInFloat: 0,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#008FFB'
                },
                labels: {
                  style: {
                    colors: '#008FFB'
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
                title: {
                  text: '목표 수금',
                  style: {
                    color: '#008FFB',
                    fontSize: '12px',
                  }
                },
                tooltip: {
                  enabled: true
                }
              },
              {
                show: false,
                seriesName: 'Sales',
                opposite: true,
                tickAmount: 8,
                decimalsInFloat: 0,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#00E396'
                },
                labels: {
                  style: {
                    colors: '#00E396',
                  },
                  formatter: function(value) {
                    return value.toFixed(0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                  }
                },
                title: {
                  text: '월 수금 현황',
                  style: {
                    color: '#00E396',
                    fontSize: '12px',
                  }
                },
              },
              {
                show: false,
                seriesName: 'SalesFlow',
                opposite: true,
                tickAmount: 8,
                axisTicks: {
                  show: true,
                },
                axisBorder: {
                  show: true,
                  color: '#FEB019'
                },
                labels: {
                  style: {
                    colors: '#FEB019',
                  },
                  formatter: function(value) {
                    return value.toFixed(2) + '%';
                  }
                },
                title: {
                  text: '목표 달성률',
                  style: {
                    color: '#FEB019',
                    fontSize: '12px',
                  }
                },
              },
            ],
            tooltip: {
              fixed: {
                enabled: false,
                offsetY: 30,
                offsetX: 60
              },
            },
            legend: {
              horizontalAlign: 'left',
              offsetX: 70
            }
          },
        }
      }
    },
    methods : {
      async getApexData() {
        try {
          const response = await this.$axios.get('/dashmenu/totmoney');
          return response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    async created () {
      this.ApexData = await this.getApexData();
      this.$store.commit('SET_TITLE', '전체수금');
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
    }
  };
</script>
<style></style>