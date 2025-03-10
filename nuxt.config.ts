export default defineNuxtConfig({
  site: {
    url: 'https://www.fromthehart.tech',
    name: 'My frontend sandbox to play with tech',
  },

  compatibilityDate: '2024-11-01',
  future: {
    compatibilityVersion: 4,
  },

  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap', '@nuxt/content', '@nuxt/ui'],

  routeRules: {
    '/': {
      prerender: true,
    },
    '/about/**': {
      prerender: true,
    },
    '/blog/**': {
      prerender: true,
    },
    '/projects/**': {
      ssr: false,
    },
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'min-light',
            dark: 'min-dark',
          },
        },
      },
    },
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
