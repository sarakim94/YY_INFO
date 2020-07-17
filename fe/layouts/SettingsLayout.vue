<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot-scope="props" slot="links">
        <sidebar-item :link="{
                  name: '메뉴관리',
                  icon: 'ni ni-bullet-list-67'
                }">
          <sidebar-item :link="{ name: '메뉴 마스터 관리', path: '/settings/settings' }"/>
          <sidebar-item :link="{ name: '사용자 권한 관리', path: '/settings/userauth' }"/>
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
      <settings-navbar :type="$route.name === 'alternative' ? 'light': 'default'"></settings-navbar>

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

  import SettingsNavbar from '~/components/layouts/argon/SettingsNavbar.vue';
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
      SettingsNavbar,
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
      this.$store.commit('SET_TITLE', '메뉴관리');
    }
  };
</script>
<style lang="scss">
</style>
