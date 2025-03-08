<template>
  <!-- Main Homepage Section -->
  <section>
    <!-- Hero Section with Responsive Layout -->
    <div class="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
      <!-- Hero Image Container - Changes Order on Mobile vs Desktop -->
      <div class="flex items-center justify-center p-6 mt-8 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128 order-first lg:order-last">
        <!-- Responsive Hero Image -->
        <img src="/assets/Business_SVG.svg" alt="" class="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
      </div>

      <!-- Hero Text Content Container - Centered on Mobile, Left-Aligned on Desktop -->
      <div class="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
        <!-- Main Headline with Accent Color on "Playground" -->
        <h1 class="text-5xl font-bold leading-none sm:text-6xl">Tech <span class="text-primary-600">Playground</span></h1>
        <!-- Subheading Text with Responsive Margins -->
        <p class="mt-6 mb-8 text-lg sm:mb-12">A website to showcase my work and allow me to experiment with new tech!</p>

        <!-- Call-to-Action Buttons - Stacked on Mobile, Side by Side on Desktop -->
        <div class="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center lg:justify-start">
          <!-- Primary CTA - Projects Button -->
          <UButton to="/projects" class="flex items-center justify-center px-8 py-3 text-lg font-semibold rounded">
            <span class="text-center w-full">Check out my Projects</span>
          </UButton>
          <!-- Secondary CTA - About Button -->
          <UButton to="/about" color="neutral" class="flex items-center justify-center px-8 py-3 text-lg font-semibold rounded">
            <span class="text-center w-full">About me</span>
          </UButton>
        </div>
      </div>
    </div>

    <!-- Blog Section Header -->
    <div class="container px-6 mx-auto mt-12">
      <!-- Blog Section Heading with Link to Blog Page -->
      <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center">My latest <ULink to="/blog" class="text-primary-600">Blog</ULink> posts</h1>
    </div>

    <!-- Blog Posts Display Component -->
    <div class="container px-6 mx-auto mt-6">
      <!-- Latest Blog Posts Component with 3 Post Limit -->
      <LatestBlogPostsDisplay :limit="3" />
    </div>
  </section>
</template>

<script setup lang="ts">
  // SEO Meta Tags Configuration
  // Optimizes the homepage for search engines and social sharing
  useSeoMeta({
    title: 'From The Hart Tech - Sheldon Hart', // Homepage title
    description: 'Solutions architect and developer sharing insights on Java, microservices, and enterprise architecture', // Homepage description
    keywords: 'solutions architect, software development, Java, AWS, microservices, enterprise architecture', // Keywords for SEO
    robots: 'index, follow', // Allow search engines to index the page

    // Open Graph Tags for Social Media Sharing
    ogTitle: 'From The Hart Tech - Solutions Architecture & Development',
    ogDescription: 'Solutions architect and developer exploring enterprise architecture, cloud solutions, and modern development practices',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png', // Preview image for social shares
    ogUrl: 'https://www.fromthehart.tech/', // Canonical URL for the homepage

    // Twitter Card Tags
    twitterTitle: 'From The Hart Tech - Solutions Architecture & Development',
    twitterDescription: 'Solutions architect and developer exploring enterprise architecture, cloud solutions, and modern development practices',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image', // Large image preview when shared on Twitter
  })
</script>
