<template>
  <section class="py-8">
    <div class="container mx-auto px-6">
      <div class="mb-12">
        <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center mb-4">My <span class="text-primary-600">Projects</span></h1>
        <p class="text-lg text-center max-w-3xl mx-auto">Here you can find a collection of my personal projects</p>
      </div>

      <ProjectsGithubList />
    </div>
  </section>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Projects - From The Hart Tech',
    description: 'Explore my software development projects including Java applications, microservices, and web development work',
    keywords: 'software projects, Java development, GitHub repositories, solutions architecture, microservices',
    robots: 'index, follow',
    author: 'Sheldon Hart',

    ogTitle: 'Software Development Projects - From The Hart Tech',
    ogDescription: 'Browse my portfolio of software development projects and GitHub repositories',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    ogUrl: 'https://www.fromthehart.tech/projects',

    twitterTitle: 'Software Projects - From The Hart Tech',
    twitterDescription: 'Browse my portfolio of software development projects and GitHub repositories',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image',
    twitterSite: '@sheldonhart',
    twitterCreator: '@sheldonhart',
  })
</script>
