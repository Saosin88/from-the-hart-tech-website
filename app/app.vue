<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  useHead({
    htmlAttrs: {
      lang: 'en',
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.ico',
      },
    ],
  })

  useSeoMeta({
    title: 'From The Hart Tech',
    description: 'A website to play with technologies and share my experiences.',
    keywords: 'Sheldon Hart, From The Hart, blog, technology, architecture, development, sandbox',
    robots: 'index, follow',
    author: 'Sheldon Hart',

    ogTitle: 'From The Hart',
    ogDescription: 'A website to play with technologies and share my experiences.',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    ogUrl: 'https://www.fromthehart.tech',

    twitterTitle: 'From The Hart',
    twitterDescription: 'A website to play with technologies and share my experiences.',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@SheldonHart7',
    twitterCreator: '@SheldonHart7',
  })
</script>

<style>
  .page-enter-active,
  .page-leave-active {
    transition: opacity 0.1s ease-out;
  }

  .page-leave-to,
  .page-enter-from {
    opacity: 0;
  }
</style>
