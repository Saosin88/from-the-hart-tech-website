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
  modules: ["@nuxtjs/sitemap", "@nuxt/content", "@nuxt/ui"],

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
      prerender: true,
    },
  },

  css: ["~/assets/css/main.css"],

  // ui: {
  //   primary: "green",
  //   gray: "cool",
  // },

  // Color Mode Configuration
  // colorMode: {
  //   classSuffix: "",
  // },

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
    preview: {
      api: "https://api.nuxt.studio",
    },
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
