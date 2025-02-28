<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: "%s - From The Hart",
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico",
    },
  ],
});

useSeoMeta({
  title: "From The Hart",
  description: "A website to play with technologies and share my experiences.",
  keywords:
    "Sheldon Hart, From The Hart, blog, technology, architecture, development, sandbox",
  robots: "index, follow",
  author: "Sheldon Hart",
  ogTitle: "From The Hart",
  ogDescription:
    "A website to play with technologies and share my experiences.",
  ogImage: "/logo/from-the-hart.png",
  ogUrl: "https://www.fromthehart.tech",
  twitterTitle: "From The Hart",
  twitterDescription:
    "A website to play with technologies and share my experiences.",
  twitterImage: "/logo/from-the-hart.png",
  twitterCard: "summary_large_image",
  twitterSite: "@sheldonhart",
  twitterCreator: "@sheldonhart",
});
</script>

<style>
body {
  @apply bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300;
  font-family: "Roboto", sans-serif;

  /* #10B981 */
}
</style>
