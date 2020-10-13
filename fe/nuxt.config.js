
/*!

=========================================================
* Nuxt Argon Dashboard PRO - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/nuxt-argon-dashboard-pro
* Copyright 2019 Creative Tim (https://www.creative-tim.com)

* Coded by www.creative-tim.com and www.binarcode.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

const pkg = require('./package')
const is_production = process.env.NODE_ENV === 'production'
console.log('ENV', process.env.NODE_ENV)

module.exports = {
  
  mode: 'universal',
  router: {
    base: '/',
    linkExactActiveClass: 'active',
    // Router전체에서 인증필수
    middleware: ['auth'],
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'Yooyoung Dashboard PRO',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Yooyoung Dashboard PRO - Premium Nuxt.js & Bootstrap 4 Dashboard' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: 'favicon.png' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700'},
      { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.6.3/css/all.css', integrity: "sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/", crossorigin: "anonymous"}
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'assets/css/nucleo/css/nucleo.css',
    'assets/sass/argon.scss',
    'assets/vendor/font-awesome/css/font-awesome.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/dashboard/dashboard-plugin',
    {src: '~/plugins/dashboard/full-calendar', ssr: false },
    {src: '~/plugins/dashboard/world-map', ssr: false },
    {src: '~/plugins/dashboard/vue-apexchart', ssr: false },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/pwa',
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: is_production ? 'http://218.38.191.120:8000/api' : 'http://localhost:8000/api',
    //baseURL: 'http://218.38.191.120:8000/api',
    credentials: false,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          // {'key': <value>, 'user': <User obj>}의 Response가 돌아오므로,
          // 'key'에 해당하는 값이 Token value임을 알려주어야 함 (property: 'key')
          login: { url: '/members/auth-token/', method: 'post', propertyName: 'key' },

          // 응답 obj자체가 User인 경우, propretyName은 false
          user: { url: '/members/profile/', method: 'get', propertyName: false },
        },
        // login(auth-token)시 Response에 User가 포함되어있어,
        // setUser()를 직접 실행할 것 이기 때문에 false
        autoFetchUser: false,

        // Token이 있어야 함
        tokenRequired: true,

        // Authorization: Token <value> 형태로 전달될 것
        tokenType: 'Token',
      }
    },
  },

  /*
  ** Build configuration
  */
  build: {
    vendor : [
      'vue-apexchart'
    ],
    transpile: [
      'vee-validate/dist/rules',
    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      config.node = {
        fs: 'empty'
      }
    },
    extractCSS: is_production,
    babel: {
      plugins: [
        [
          "component",
          {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
          }
        ]
      ]
    }
  }
}
