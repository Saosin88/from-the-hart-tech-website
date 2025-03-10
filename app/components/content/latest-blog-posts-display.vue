<template>
  <div class="w-full">
    <div class="flex items-center justify-end mb-6">
      <ULink to="/blog" class="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium flex items-center gap-1 transition-colors">
        View all
        <span class="i-lucide-arrow-right"></span>
      </ULink>
    </div>

    <BlogPostsDisplay :limit="limit" />
  </div>
</template>

<script setup lang="ts">
  withDefaults(
    defineProps<{
      limit: number
    }>(),
    {
      limit: 3,
    },
  )
</script>
