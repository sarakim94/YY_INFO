<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">
        <sidebar-item v-for="item in items" :key="item.name"
          :link="item.header"
        >
          <sidebar-item v-for="program in item.detail" :key="program.name"
            :link="program"
          ></sidebar-item>
        </sidebar-item>

        
        <sidebar-item v-if="user.emp_cd === 'admin'" :link="{
                  name: 'Examples',
                  icon: 'ni ni-ungroup text-orange'
                  }">
          <sidebar-item :link="{ name: 'Pricing', path: '/pricing' }"/>
          <sidebar-item :link="{ name: 'Login', path: '/login' }"/>
          <sidebar-item :link="{ name: 'Register', path: '/register' }"/>
          <sidebar-item :link="{ name: 'Lock', path: '/lock' }"/>
          <sidebar-item :link="{ name: 'Timeline', path: '/pages/timeline' }"/>
          <sidebar-item :link="{ name: 'Profile', path: '/pages/user' }"/>


        </sidebar-item>

        <sidebar-item v-if="user.emp_cd === 'admin'" :link="{
                  name: 'Components',
                  icon: 'ni ni-ui-04 text-info'
                }">
          <sidebar-item :link="{ name: 'Buttons', path: '/components/buttons' }"/>
          <sidebar-item :link="{ name: 'Cards', path: '/components/cards' }"/>
          <sidebar-item :link="{ name: 'Grid', path: '/components/grid-system' }"/>
          <sidebar-item :link="{ name: 'Notifications', path: '/components/notifications' }"/>
          <sidebar-item :link="{ name: 'Icons', path: '/components/icons' }"/>
          <sidebar-item :link="{ name: 'Typography', path: '/components/typography' }"/>

          <sidebar-item v-if="user.emp_cd === 'admin'" :link="{ name: 'Multi Level' }">
            <sidebar-item :link="{ name: 'Third level menu', path:'#' }"/>
            <sidebar-item :link="{ name: 'Just another link', path:'#' }"/>
            <sidebar-item :link="{ name: 'One last link', path:'#' }"/>
          </sidebar-item>
        </sidebar-item>
        <sidebar-item v-if="user.emp_cd === 'admin'" :link="{
                        name: 'Forms',
                        icon: 'ni ni-single-copy-04 text-pink'
                      }">
          <sidebar-item :link="{ name: 'Elements', path: '/forms/elements' }"/>
          <sidebar-item :link="{ name: 'Components', path: '/forms/components' }"/>
          <sidebar-item :link="{ name: 'Validation', path: '/forms/validation' }"/>
        </sidebar-item>

        <sidebar-item v-if="user.emp_cd === 'admin'" :link="{
                        name: 'Tables',
                        icon: 'ni ni-align-left-2 text-default'
                      }">
          <sidebar-item :link="{ name: 'Tables', path: '/tables/regular' }"/>
          <sidebar-item :link="{ name: 'Sortable', path: '/tables/sortable' }"/>
          <sidebar-item :link="{ name: 'Paginated Tables', path: '/tables/paginated' }"/>
        </sidebar-item>

        <sidebar-item v-if="user.emp_cd === 'admin'" :link="{
                        name: 'Maps',
                        icon: 'ni ni-map-big text-primary'
                      }">
          <sidebar-item :link="{ name: 'Google', path: '/maps/google' }"/>
          <sidebar-item :link="{ name: 'Vector', path: '/maps/vector' }"/>
        </sidebar-item>
        <sidebar-item v-if="user.emp_cd === 'admin'"
          :link="{
            name: 'Widgets',
            icon: 'ni ni-archive-2 text-green',
            path: '/widgets'
          }">
        </sidebar-item>
        <sidebar-item v-if="user.emp_cd === 'admin'"
          :link="{
            name: 'Charts',
            icon: 'ni ni-chart-pie-35 text-info',
            path: '/charts'
          }">
        </sidebar-item>

        <sidebar-item v-if="user.emp_cd === 'admin'"
          :link="{
            name: 'Calendar',
            icon: 'ni ni-calendar-grid-58 text-red',
            path: '/calendar'
          }">
        </sidebar-item>
      </template>

      <template slot="links-after">
        <hr class="my-3">
        <h6 class="navbar-heading p-0 text-muted">Our System URL</h6>

        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
              <a class="nav-link"
                  href="http://gw.yypharm.co.kr" target="_blank">
                  <i class="ni ni-money-coins"></i> GroupWare
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link"
                  href="http://sfa.yypharm.co.kr" target="_blank">
                  <i class="ni ni-user-run"></i> SFA System
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link"
                  href="http://mos.yypharm.co.kr" target="_blank">
                  <i class="ni ni-delivery-fast"></i> MOS System
              </a>
          </li>
          <li class="nav-item">
              <a class="nav-link"
                  href="http://cbolt.yypharm.co.kr" target="_blank">
                  <i class="ni ni-folder-17"></i> C.Bolt System
              </a>
          </li>
        </ul>
      </template>
    </side-bar>
    <div class="main-content">
      <dashboard-navbar :type="$route.name === 'alternative' ? 'light': 'default'"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <nuxt></nuxt>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
  /* eslint-disable no-new */
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      // try to init it later in case this component is loaded async
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from '~/components/layouts/argon/DashboardNavbar.vue';
  import ContentFooter from '~/components/layouts/argon/ContentFooter.vue';
  import DashboardContent from '~/components/layouts/argon/Content.vue';

  export default {
    data () {
      return {
        'items' : [],
        'user' : this.$auth.user,
      }
    },
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('scrollbar-inner');
        }
      },
      async getMenu() {
        try {
          const response = await this.$axios.get('/getmenu/' + this.$auth.user.emp_cd);
          return response.data;
        } catch (error) {
          console.log(error);
        }
      }
    },
    mounted() {
      this.initScrollbar()
    },
    async created () {
      this.items = await this.getMenu();
    }
  };
</script>
<style lang="scss">
</style>
