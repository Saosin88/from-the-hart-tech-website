// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: "https://www.fromthehart.tech",
    name: "My frontend sandbox to play with tech",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/sitemap"],
  future: {
    compatibilityVersion: 4,
  },
  routeRules: {
    "/_nuxt/**": {
      headers: {
        "cache-control": "public, s-maxage=2629800, max-age=6",
      },
    },
    "/": {
      prerender: true,
      headers: {
        "cache-control": "public, s-maxage=2629800, max-age=6",
      },
    },
    "/about/**": {
      prerender: true,
      headers: {
        "cache-control": "public, s-maxage=2629800, max-age=6",
      },
    },
    "/blog/**": {
      prerender: true,
      headers: {
        "cache-control": "public, s-maxage=2629800, max-age=6",
      },
    },
    "/projects/**": {
      ssr: false,
      headers: {
        "cache-control": "public, s-maxage=2629800, max-age=6",
      },
    },
  },
});
