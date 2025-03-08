// Nuxt Configuration
// This is the main configuration file for the Nuxt.js application

export default defineNuxtConfig({
  // Site Information
  // Defines the site URL and name for SEO and metadata purposes
  site: {
    url: 'https://www.fromthehart.tech', // Production URL for the website
    name: 'My frontend sandbox to play with tech', // Site name for metadata
  },

  // Compatibility and Future Settings
  // Controls Nuxt version compatibility and future features
  compatibilityDate: '2024-11-01', // Set compatibility baseline date
  future: {
    compatibilityVersion: 4, // Target future Nuxt version for compatibility
  },

  // Development Tools
  // Configure development experience and debugging options
  devtools: { enabled: true }, // Enable built-in Nuxt DevTools

  // Modules
  // External Nuxt modules that extend functionality
  modules: [
    '@nuxtjs/sitemap', // Automatic sitemap generation
    '@nuxt/content', // Content management system
    '@nuxt/ui', // UI component library
  ],

  // Route Rules
  // Define routing behavior and rendering strategy for different paths
  routeRules: {
    '/': {
      prerender: true, // Statically generate the homepage
    },
    '/about/**': {
      prerender: true, // Statically generate all about pages
    },
    '/blog/**': {
      prerender: true, // Statically generate all blog pages
    },
    '/projects/**': {
      ssr: false, // Client-side render projects pages
    },
  },

  // Global CSS
  // Styles applied throughout the application
  css: ['~/assets/css/main.css'], // Main CSS file for global styling

  // Content Module Configuration
  // Settings for the Nuxt Content module
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'min-light', // Light theme for code blocks
            dark: 'min-dark', // Dark theme for code blocks
          },
        },
      },
    },
    preview: {
      api: 'https://api.nuxt.studio', // API endpoint for content previews
    },
  },

  // App Settings
  // Configure application-level behaviors
  app: {
    pageTransition: { name: 'page', mode: 'out-in' }, // Page transition animations
  },
})
