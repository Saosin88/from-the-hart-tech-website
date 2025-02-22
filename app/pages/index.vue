<template>
  <div>
    <h1>Welcome to From The Hart Tech</h1>
    <p>This is the home page.</p>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Main Page",
  description: "This is the main page",
  ogTitle: "Main Page",
  ogDescription: "[og:description]",
  ogImage: "[og:image]",
  ogUrl: "[og:url]",
  twitterTitle: "Main Page",
  twitterDescription: "[twitter:description]",
  twitterImage: "[twitter:image]",
  twitterCard: "summary",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.png",
    },
  ],
});
</script>
