<template>
  <!-- Main Container for Latest Blog Posts Section -->
  <div class="w-full py-8">
    <!-- Header with Title and View All Link -->
    <div class="flex items-center justify-between mb-6">
      <!-- Section Title -->
      <h2 class="text-2xl font-bold">Latest Posts</h2>

      <!-- View All Link with Arrow Icon -->
      <ULink to="/blog" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1 transition-colors">
        View all
        <span class="i-lucide-arrow-right"></span>
      </ULink>
    </div>

    <!-- Blog Posts Display Component with Limit Parameter -->
    <BlogPostsDisplay :limit="limit" />
  </div>
</template>

<script setup lang="ts">
  // Component Props Definition with Defaults
  withDefaults(
    defineProps<{
      limit: number
    }>(),
    {
      limit: 3, // Default to show 3 latest posts
    },
  )
</script>
