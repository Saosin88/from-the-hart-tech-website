<template>
  <section>
    <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <div class="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-first lg:order-last">
        <img src="/assets/Business_SVG.svg" alt="" class="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
      </div>

      <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <h1 class="text-5xl font-bold leading-none sm:text-6xl">Tech <span class="text-primary-600">Playground</span></h1>

        <p class="mt-6 mb-8 text-lg sm:mb-12">A website to showcase my work and allow me to experiment with new tech!</p>

        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center lg:justify-start">
          <UButton to="/projects" class="flex items-center justify-center px-8 py-3 text-lg font-semibold rounded">
            <span class="text-center w-full">Check out my Personal Projects</span>
          </UButton>

          <UButton to="/about" color="neutral" class="flex items-center justify-center px-8 py-3 text-lg font-semibold rounded">
            <span class="text-center w-full">About me</span>
          </UButton>
        </div>
      </div>
    </div>

    <div class="container px-6 mx-auto mt-12">
      <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center">My latest <ULink to="/blog" class="text-primary-600">Blog</ULink> posts</h1>
    </div>

    <div class="container px-6 mx-auto mt-6">
      <LatestBlogPostsDisplay :limit="3" />
    </div>
  </section>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'From The Hart Tech - Sheldon Hart',
    description: 'Solutions architect and developer sharing insights on Java, microservices, and enterprise architecture',
    keywords: 'solutions architect, software development, Java, AWS, microservices, enterprise architecture',
    robots: 'index, follow',

    ogTitle: 'From The Hart Tech - Solutions Architecture & Development',
    ogDescription: 'Solutions architect and developer exploring enterprise architecture, cloud solutions, and modern development practices',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    ogUrl: 'https://www.fromthehart.tech/',

    twitterTitle: 'From The Hart Tech - Solutions Architecture & Development',
    twitterDescription: 'Solutions architect and developer exploring enterprise architecture, cloud solutions, and modern development practices',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image',
  })
</script>
