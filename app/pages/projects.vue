<template>
  <div>
    <h2 class="text-2xl font-semibold mb-10">Projects</h2>
    <ProjectList />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Projects",
  description: "Meta description of the projects page",
  keywords: "keywords",
  robots: "index, follow",
  author: "Sheldon Hart",
  ogTitle: "This is an OpenGraph title",
  ogDescription: "This is the OpenGraph description",
  ogImage: "https://www.fromthehart.tech/logo/from-the-hart.png",
  ogUrl: "https://www.fromthehart.tech/projects",
  twitterTitle: "Twitter Title",
  twitterDescription: "Twitter Description",
  twitterImage: "https://www.fromthehart.tech/logo/from-the-hart.png",
  twitterCard: "summary_large_image",
  twitterSite: "@sheldonhart",
  twitterCreator: "@sheldonhart",
});
</script>
