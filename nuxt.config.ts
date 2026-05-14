export default defineNuxtConfig({
  site: {
    url: 'https://www.fromthehart.tech',
    name: 'My frontend sandbox to play with tech',
    env: process.env.NUXT_SITE_ENV || 'dev',
  },

  compatibilityDate: '2026-04-01',

  devtools: { enabled: true },

  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'jwt-decode',
      ],
    },
  },

  modules: ['@nuxtjs/robots', '@nuxtjs/sitemap', '@nuxt/content', '@nuxt/ui', '@nuxt/image', '@nuxtjs/turnstile'],

  sitemap: {
    zeroRuntime: true,
  },

  runtimeConfig: {
    public: {
      fromTheHartAPIBaseUrl: 'https://api.fromthehart.tech',
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
      robots: false,
    },
    '/storage/**': {
      prerender: false,
      robots: false,
    },
    '/auth/verify-email': { robots: false },
    '/auth/email-verification-required': { robots: false },
  },

  css: ['~/assets/css/main.css'],

  content: {
    experimental: {
      sqliteConnector: 'native',
    },
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
  },

  icon: {
    clientBundle: {
      icons: ['lucide:align-justify', 'lucide:x', 'lucide:sun', 'lucide:moon'],
      scan: true,
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },
})
