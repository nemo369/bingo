require('dotenv').config();

export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + 'Matrix Bingo',
    title: 'Matrix Bingo',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'Invite your friends and host your own multiplayer Bingo online. Build beautiful matrix bingo albums as your bingo cards or use a public one',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: process.env.BASE_URL + 'matrix_bingo.jpg',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/styles/main.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~/plugins/filters.ts',
    '~/plugins/upload-api.ts',
    '~/plugins/cloudinary.js',
    '~/plugins/matter.client.js',
    '~/plugins/ga.client.js',
  ],
  env: {
    title: 'LivueJournal',
    cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME,
    cloudinaryPreset: process.env.CLOUDINARY_PRESET,
    socketUrl: process.env.SOCKET_URL,
    serverUrl: process.env.SERVER_URL,
    baseUrl: process.env.BASE_URL,
  },
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/vuetify'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    'nuxt-i18n',
    // Doc: https://cloudinary.nuxtjs.org/setup
    '@nuxtjs/cloudinary',
    '@nuxtjs/auth',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */

  proxy: {
    '/api/': {
      target: process.env.SERVER_URL,
      changeOrigin: true,
    },
  },
  axios: {
    proxy: true,
  },
  // https://auth.nuxtjs.org/guide/setup.html
  auth: {
    // Options
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */

  content: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#2bc600',
          secondary: '#e11b3b',
          accent: '#0e0200',
          error: '#b71c1c',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      options: {
        customProperties: true,
      },
    },
  },
  i18n: {
    locales: [
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en-US.json',
      },
      {
        name: 'עברית',
        code: 'he',
        iso: 'he-IL',
        file: 'he-IL.json',
      },
    ],
    langDir: 'lang/',
    defaultLocale: 'en',
    fallbackLocale: 'en',
    vueI18n: {
      fallbackLocale: 'en',
    },
    lazy: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
    },
  },
  cloudinary: {
    cloudName: 'bingomatrix',
    useComponent: true,
  },
  router: {
    extendRoutes(routes, resolve) {
      routes.push({
        name: 'custom',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
      });
    },
  },
  buildDir: 'dist',
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */

  build: {},
};
