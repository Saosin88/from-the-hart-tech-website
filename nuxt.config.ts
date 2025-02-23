// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: "https://www.fromthehart.tech",
    name: "My frontend sandbox to play with tech",
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/sitemap", "@nuxtjs/robots"],
  future: {
    compatibilityVersion: 4,
  },
  routeRules: {
    "/": { prerender: true },
    "/about/**": { prerender: true },
    "/blog/**": { prerender: true },
    "/projects/**": { ssr: false },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ["/sitemap.xml", "/robots.txt"],
    },
  },
});
