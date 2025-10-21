export default defineNuxtConfig({
  site: {
    url: 'https://www.fromthehart.tech',
    name: 'My frontend sandbox to play with tech',
  },

  compatibilityDate: '2025-10-21',

  devtools: { enabled: true },

  modules: ['@nuxtjs/sitemap', '@nuxt/content', '@nuxt/ui', '@nuxt/image', '@nuxtjs/turnstile'],

  runtimeConfig: {
    public: {
      fromTheHartAPIBaseUrl: process.env.FROM_THE_HART_API_BASE_URL || 'https://api.fromthehart.tech',
    },
  },
  turnstile: {
    siteKey: process.env.NUXT_PUBLIC_TURNSTILE_SITE_KEY,
  },

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
      prerender: true,
    },
    '/auth/**': {
      prerender: false,
    },
    '/user/**': {
      prerender: false,
    },
  },

  css: ['~/assets/css/main.css'],

  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'hcl'],
          theme: {
            default: 'vitesse-light',
            dark: 'dracula',
          },
        },
      },
    },
    preview: {
      api: 'https://api.nuxt.studio',
    },
  },

  icon: {
    clientBundle: {
      icons: ['lucide:align-justify', 'lucide:x', 'lucide:sun', 'lucide:moon'],
      scan: true,
    },
  },

  image: {
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
      '2xl': 1536,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
