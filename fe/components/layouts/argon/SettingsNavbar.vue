<template>
  <base-nav
    container-classes="container-fluid"
    class="navbar-top border-bottom navbar-expand"
    :class="{'bg-success navbar-dark': type === 'default'}"
  >
    <div class="d-none d-xl-block">
      <h1 class="text-white">{{ this.$store.state.title }}</h1>
    </div>
    <!-- Navbar links -->
    <ul class="navbar-nav align-items-center mr-md-auto">
      <li class="nav-item d-xl-none">
        <!-- Sidenav toggler -->
        <div class="pr-3 sidenav-toggler"
             :class="{active: $sidebar.showSidebar, 'sidenav-toggler-dark': type === 'default', 'sidenav-toggler-light': type === 'light'}"
             @click="toggleSidebar">             
          <div class="sidenav-toggler-inner">
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
            <i class="sidenav-toggler-line"></i>
          </div>
        </div>
      </li>
    </ul>
      
      <ul class="navbar-nav align-items-center ml-auto ml-md-0">
      <base-dropdown menu-on-right
                     class="nav-item"
                     tag="li"
                     title-tag="a"
                     title-classes="nav-link pr-0">
            
        <a v-if="this.$auth.loggedIn" href="#" class="nav-link pr-0" @click.prevent slot="title-container">
          <div class="media align-items-center">
                  <span class="avatar avatar-sm rounded-circle">
                    <img v-if="user.emp_cd === 'admin'" alt="Image placeholder" src="/img/theme/jbs.jpg">
                    <img v-else alt="Image placeholder" src="/img/theme/profile.jpg">
                  </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm  font-weight-bold">{{ user.dept_nm }} / {{ user.emp_nm }}</span>
            </div>
            
          </div>
        </a>

        <template>
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </div>

          <div class="dropdown-divider"></div>
          <a href="javascript:void(0)" class="dropdown-item" @click="logout">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </a>
        </template>
      </base-dropdown>
      <div v-if="user.emp_cd === 'admin'" class="ml-3">
        <base-button style="border:0;outline:0;background-color:transparent" tag="a" href="javascript:void(0)" icon="ni ni-curved-next" rounded icon-only @click="settings"></base-button>
      </div>
    </ul>
  </base-nav>
</template>
<script>
  import {CollapseTransition} from 'vue2-transitions';
  import BaseNav from '@/components/argon-core/Navbar/BaseNav.vue';
  import Modal from '@/components/argon-core/Modal.vue';

  export default {
    components: {
      CollapseTransition,
      BaseNav,
      Modal
    },
    props: {
      type: {
        type: String,
        default: 'default', // default|light
        description: 'Look of the dashboard navbar. Default (Green) or light (gray)'
      }
    },
    computed: {
      routeName() {
        const {name} = this.$route;
        return this.capitalizeFirstLetter(name);
      }
    },
    data() {
      return {
        activeNotifications: false,
        showMenu: false,
        searchModalVisible: false,
        searchQuery: '',
        user: this.$auth.user
      };
    },
    methods: {
      settings() {
        this.$router.push('/')  
      },
      async logout() {
        await this.$auth.logout('local')
        .then(() => {
          this.$router.push('/login')
        })
        .catch((reason) => {
          console.log('catch')
          console.log(reason)
        })
      },
      capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      },
      toggleNotificationDropDown() {
        this.activeNotifications = !this.activeNotifications;
      },
      closeDropDown() {
        this.activeNotifications = false;
      },
      toggleSidebar() {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
      },
      hideSidebar() {
        this.$sidebar.displaySidebar(false);
      }
    }
  };
</script>
