<template>
  <section class="py-8">
    <div class="container mx-auto px-6">
      <div class="mb-12">
        <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center mb-4">My <span class="text-primary-600">Projects</span></h1>
        <p class="text-lg text-center max-w-3xl mx-auto">Here you can find a collection of my personal projects</p>
        <p class="text-xs text-center mt-2 text-neutral-500 dark:text-neutral-400">
          If you want to see details of my work projects, please <a href="/about#projects" class="text-primary-600 hover:underline">click here</a>
        </p>
      </div>

      <ClientOnly>
        <ProjectsGithubList />
        <template #fallback>
          <div class="flex justify-center p-8">
            <UIcon name="i-lucide-loader-2" class="animate-spin text-primary-600" size="xl" />
          </div>
        </template>
      </ClientOnly>
    </div>
  </section>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Personal Projects - From The Hart Tech',
    description: 'Explore my collection of personal software development projects, including GitHub repositories, web applications, and technical experiments.',
    keywords: 'personal projects, GitHub repositories, open source, Vue.js, Nuxt, AWS, Java, TypeScript, solutions architecture',
    robots: 'index, follow',
    author: 'Sheldon Hart',

    ogTitle: 'Personal Coding Projects | Sheldon Hart',
    ogDescription: 'Browse my personal software development portfolio featuring open-source projects, technical experiments, and GitHub repositories.',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart-social.svg',
    ogUrl: 'https://www.fromthehart.tech/projects',

    twitterTitle: 'Personal Projects | Sheldon Hart',
    twitterDescription: 'Discover my collection of personal coding projects and open-source contributions. For professional work examples, see my work portfolio.',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart-social.svg',
    twitterCard: 'summary_large_image',
    twitterSite: '@sheldonhart',
    twitterCreator: '@sheldonhart',
  })

  definePageMeta({
    prerender: true,
  })
</script>
