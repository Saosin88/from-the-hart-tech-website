<template>
  <!-- Root UI Application Container -->
  <UApp>
    <!-- Nuxt Layout Wrapper for Site Structure -->
    <NuxtLayout>
      <!-- Dynamic Page Content Based on Route -->
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  // Global Head Configuration
  // Defines document metadata, title format, and favicon
  useHead({
    titleTemplate: '%s - From The Hart', // Format for page titles with site name
    htmlAttrs: {
      lang: 'en', // Set document language to English
    },
    link: [
      {
        rel: 'icon', // Favicon definition
        type: 'image/png', // Image type
        href: '/favicon.ico', // Path to favicon file
      },
    ],
  })

  // Global SEO Metadata Configuration
  // Defines default SEO tags for the entire site
  useSeoMeta({
    title: 'From The Hart', // Default page title
    description: 'A website to play with technologies and share my experiences.', // Site description for search results
    keywords: 'Sheldon Hart, From The Hart, blog, technology, architecture, development, sandbox', // Keywords for search indexing
    robots: 'index, follow', // Search engine indexing instructions
    author: 'Sheldon Hart', // Content author information

    // Open Graph Tags for Social Media Sharing
    ogTitle: 'From The Hart',
    ogDescription: 'A website to play with technologies and share my experiences.',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png', // Preview image for social shares
    ogUrl: 'https://www.fromthehart.tech', // Canonical site URL

    // Twitter Card Tags for Twitter Sharing
    twitterTitle: 'From The Hart',
    twitterDescription: 'A website to play with technologies and share my experiences.',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image', // Large image preview for Twitter
    twitterSite: '@sheldonhart', // Site's Twitter handle
    twitterCreator: '@sheldonhart', // Content creator's Twitter handle
  })
</script>

<style>
  body {
    /* Page Transition Animations */
    /* Controls the appearance/disappearance of pages during navigation */

    .page-enter-active,
    .page-leave-active {
      transition: opacity 0.1s ease-out;
    }

    .page-leave-to,
    .page-enter-from {
      opacity: 0;
    }
  }
</style>
