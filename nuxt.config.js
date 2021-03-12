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
      { hid: 'firebase', src: 'https://www.gstatic.com/firebasejs/8.3.0/firebase-app.js' },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fireauth'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  // modules: [
  //   '@nuxtjs/axios',
  //   '@nuxtjs/auth-next'
  // ],
  // auth: {
  //   strategies: {
  //     auth0: {
  //       domain: "dev-bbknqhj4.us.auth0.com",
  //       clientId: "zuXEMbUBl4dAdYUHg8HZhlETug8l82Wr",
  //       audience: "/"
  //     }
  //   },
  // },
  // Build Configuration: https://go.nuxtjs.dev/config-build
  router: {
    middleware: 'router-auth'
  },
  build: {
  },
  server: {
    port: 3002
  }
}
