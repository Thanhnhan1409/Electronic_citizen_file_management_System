
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'test',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // { src: '~/plugins/vuex.js', mode: 'client' },
    '@plugins/chart.js',
    { src: '~/plugins/localStorage.js', mode: 'client' },
    '@plugins/components.js',
    '@plugins/vue-multiselect.js',
    {src: '~/plugins/vee-validate.js', ssr: true },
    {src: '~/plugins/validate.js', ssr: true }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    'nuxt-vue-multiselect'
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend (config, { isDev, isClient }) {
      //
    }
  },

  axios: {
    baseURL: 'http://localhost:8080',
    headers: {
      'Content-Type': 'application/json'
    },
  },
  store: true,
  reatePersistedState: {
    storage: {
      getItem: key => Cookies.get(key),
      setItem: (key, value) => Cookies.set(key, value, { expires: 365 }),
      removeItem: key => Cookies.remove(key)
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: '/api/v1/auth/authenticate', method: 'post' },
          logout: { url: '/api/auth/logout', method: 'post' },
          user: { url: '/api/v1/auth/user', method: 'get', propertyName: 'user' }
        },
        tokenType: 'Bearer'
      }
    },
    redirect: {
      login: '/login',
      logout: '/login',
      home: '/'
    },
    watchLoggedIn: true,
    rewriteRedirect: true
  },
  
  server: {
    port: 3001 // Set the port to 3000
  },

  state: {},
  mutations: {},

  actions: {},

  getters: {},

}
