<template>
  <section>
    <div class="container px-6 mx-auto mt-12">
      <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center mb-8">My <span class="text-primary-600">Projects</span></h1>
      <p class="text-lg text-center mb-12 max-w-3xl mx-auto">Here you can find a collection of projects I've worked on.</p>
    </div>

    <div class="container px-6 mx-auto mt-6">
      <GithubProjectList />
    </div>
  </section>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Projects',
    description: 'Meta description of the projects page',
    keywords: 'keywords',
    robots: 'index, follow',
    author: 'Sheldon Hart',
    ogTitle: 'This is an OpenGraph title',
    ogDescription: 'This is the OpenGraph description',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    ogUrl: 'https://www.fromthehart.tech/projects',
    twitterTitle: 'Twitter Title',
    twitterDescription: 'Twitter Description',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@sheldonhart',
    twitterCreator: '@sheldonhart',
  })
</script>
