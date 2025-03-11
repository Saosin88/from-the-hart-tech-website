<template>
  <section class="not-prose w-full">
    <div v-if="!posts.length" class="flex justify-center items-center py-12 text-neutral-500 dark:text-neutral-400">
      <p class="text-center">No blog posts found</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8">
      <div v-for="post in posts" :key="post.path" class="flex">
        <UCard class="p-0 flex flex-col h-full w-full overflow-hidden hover:shadow-md transition-all duration-200">
          <ULink :active="false" :to="post.path" class="group flex flex-col h-full">
            <div class="flex-1 p-5 space-y-3">
              <h3 class="text-xl sm:text-2xl font-semibold line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ post.title }}
              </h3>

              <p class="text-sm text-neutral-600 dark:text-neutral-300 line-clamp-3">
                {{ post.formattedDescription }}
              </p>
            </div>

            <div class="border-t border-neutral-200 dark:border-neutral-700"></div>

            <div class="flex items-start p-5">
              <div class="w-full space-y-3">
                <time :datetime="post.formattedDate" class="text-xs text-neutral-500 dark:text-neutral-400 flex items-center">
                  <span class="i-lucide-calendar mr-1 text-primary-500 dark:text-primary-400"></span>
                  {{ post.formattedDate }}
                </time>

                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="keyword in post.uniqueKeywords"
                    :key="keyword"
                    class="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                  >
                    {{ keyword }}
                  </span>
                </div>
              </div>
            </div>
          </ULink>
        </UCard>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      limit?: number
    }>(),
    {
      limit: 0,
    },
  )

  const posts = await useBlogUtils().fetchBlogPostsSummaries(props.limit)
</script>
