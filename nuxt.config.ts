// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Site Information
  site: {
    url: "https://www.fromthehart.tech",
    name: "My frontend sandbox to play with tech",
  },

  // Compatibility and Future Settings
  compatibilityDate: "2024-11-01",
  future: {
    compatibilityVersion: 4,
  },

  // Development Tools
  devtools: { enabled: true },

  // Modules
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/sitemap",
    "@nuxtjs/color-mode",
    "@nuxt/content",
  ],

  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "min-light",
            dark: "min-dark",
          },
        },
      },
    },
  },

  // Color Mode Configuration
  colorMode: {
    classSuffix: "",
  },

  // Route Rules
  routeRules: {
    "/": {
      prerender: true,
    },
    "/about/**": {
      prerender: true,
    },
    "/blog/**": {
      prerender: true,
    },
    "/projects/**": {
      ssr: false,
    },
  },
});
