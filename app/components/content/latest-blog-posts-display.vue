<template>
  <div class="w-full py-8">
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold">Latest Posts</h2>
      <ULink to="/blog" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1 transition-colors">
        View all
        <span class="i-lucide-arrow-right"></span>
      </ULink>
    </div>

    <BlogPostsDisplay :limit="limit" />
  </div>
</template>

<script setup>
  defineProps({
    limit: {
      type: Number,
      default: 3,
    },
  })
</script>
