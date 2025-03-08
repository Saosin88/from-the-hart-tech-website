<template>
  <!-- Main Projects Section -->
  <section>
    <!-- Header Container with Title and Description -->
    <div class="container px-6 mx-auto mt-12">
      <!-- Page Title with Accent Color on "Projects" -->
      <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center mb-8">My <span class="text-primary-600">Projects</span></h1>
      <!-- Descriptive Introduction Text -->
      <p class="text-lg text-center mb-12 max-w-3xl mx-auto">Here you can find a collection of projects I've worked on.</p>
    </div>

    <!-- GitHub Projects Display Container -->
    <div class="container px-6 mx-auto mt-6">
      <!-- GitHub Projects Component - Dynamically Fetches and Displays Repositories -->
      <GithubProjectList />
    </div>
  </section>
</template>

<script setup lang="ts">
  // SEO Meta Tags Configuration
  // Optimizes the projects page for search engines and social sharing
  useSeoMeta({
    title: 'Projects - From The Hart Tech', // Page title for browsers and search results
    description: 'Explore my software development projects including Java applications, microservices, and web development work', // Page description for search results
    keywords: 'software projects, Java development, GitHub repositories, solutions architecture, microservices', // Keywords for search engines
    robots: 'index, follow', // Allow search engines to index this page
    author: 'Sheldon Hart', // Author information

    // Open Graph Tags for Social Media Sharing
    ogTitle: 'Software Development Projects - From The Hart Tech',
    ogDescription: 'Browse my portfolio of software development projects and GitHub repositories',
    ogImage: 'https://www.fromthehart.tech/logo/from-the-hart.png', // Preview image for social shares
    ogUrl: 'https://www.fromthehart.tech/projects', // Canonical URL for the page

    // Twitter Card Tags for Twitter Sharing
    twitterTitle: 'Software Projects - From The Hart Tech',
    twitterDescription: 'Browse my portfolio of software development projects and GitHub repositories',
    twitterImage: 'https://www.fromthehart.tech/logo/from-the-hart.png',
    twitterCard: 'summary_large_image', // Large image preview for Twitter
    twitterSite: '@sheldonhart', // Site's Twitter handle
    twitterCreator: '@sheldonhart', // Content creator's Twitter handle
  })
</script>
