export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'tailwind-nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      // { hid: 'firebase', src: 'https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fireauth.client',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios'
  ],
axios: {
    baseURL: process.env.API_HOST
  },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  router: {
    middleware: 'router-auth'
  },
  env: {
    google_vision_key: process.env.GOOGLE_VISION_KEY,
    fb_api_key: process.env.GOOGLE_FIREBASE_API_KEY,
    fb_auth_domain: process.env.GOOGLE_FIREBASE_AUTH_DOMAIN,
    fb_db_url: process.env.GOOGLE_FIREBASE_DB_URL,
    fb_project_id: process.env.GOOGLE_FIREBASE_PROJECT_ID,
    fb_storage_bucket: process.env.GOOGLE_FIREBASE_STORAGE_BUCKET,
    fb_messaging_sender_id: process.env.GOOGLE_FIREBASE_MESSAGING_SENDER_ID,
    fb_app_id: process.env.GOOGLE_FIREBASE_APP_ID,
    fb_measurement_id: process.env.GOOGLE_FIREBASE_MEASUREMENT_ID
  },
  publicRuntimeConfig: {
    firebase: {
      key: 'AIzaSyBBPxj3UVp3sT9D4nyyGWD_Xn7lKOxZhpE',
      authDomain: 'rzauthtest-8394d.firebaseapp.com',
      dbUrl: 'https://rzauthtest-8394d.firebaseio.com',
      projectId: 'rzauthtest-8394d',
      storageBucket: 'rzauthtest-8394d.appspot.com',
      messagingSenderId: '229483524369',
      appId: '1:229483524369:web:b0f6713e6a581141ec1cb0',
      measurementId: 'G-G13Y4HGWWE',
    },
  },
  build: {
  },
  server: {
    port: 3002
  }
}
