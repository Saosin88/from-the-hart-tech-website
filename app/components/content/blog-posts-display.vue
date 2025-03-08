<template>
  <!-- Main Container -->
  <section class="not-prose w-full">
    <!-- Empty State - No Posts Found Message -->
    <div v-if="!posts.length" class="flex justify-center items-center py-12 text-gray-500 dark:text-gray-400">
      <p class="text-center">No blog posts found</p>
    </div>

    <!-- Blog Posts Grid Layout -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8">
      <!-- Individual Blog Post Card -->
      <div v-for="post in posts" :key="post.path" class="flex">
        <ULink
          :active="false"
          :to="post.path"
          class="group flex flex-col h-full w-full overflow-hidden border rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <!-- Post Header Content -->
          <div class="flex-1 p-5 space-y-3">
            <!-- Post Title with Hover Effect -->
            <h3 class="text-xl sm:text-2xl font-semibold line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ post.title }}
            </h3>
            <!-- Post Description with Line Clamping -->
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {{ post.formattedDescription }}
            </p>
          </div>

          <!-- Visual Separator -->
          <div class="border-t border-gray-200 dark:border-gray-700"></div>

          <!-- Post Metadata Section -->
          <div class="flex items-start p-5">
            <div class="w-full space-y-3">
              <!-- Publication Date with Icon -->
              <time :datetime="post.formattedDate" class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <span class="i-lucide-calendar mr-1 text-primary-500 dark:text-primary-400"></span>
                {{ post.formattedDate }}
              </time>

              <!-- Post Tags/Keywords Display -->
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
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
  // Import Types for Type Safety
  import type { BlogPostDataObject, BlogPost } from '~/app/types/blog'

  // Component Props Definition with Defaults
  const props = withDefaults(
    defineProps<{
      limit: number
    }>(),
    {
      limit: 0, // Default to show all posts when no limit is provided
    },
  )

  // Data Fetching using Nuxt Content
  const { data } = await useAsyncData<BlogPostDataObject[]>('blog-posts-summary-list-limit-' + props.limit, () => {
    // Query Construction for Blog Collection
    const query = queryCollection('blog')
      .where('path', '<>', '/blog') // Exclude the blog index page
      .select('path', 'title', 'description', 'date', 'keywords', 'author', 'toc', 'body') // Select required fields
      .order('date', 'DESC') // Sort by date descending (newest first)

    // Apply Optional Post Limit
    if (props.limit > 0) {
      query.limit(props.limit)
    }

    // Execute Query and Return Results
    return query.all()
  })

  // Initialize Posts Container
  let posts = reactive<BlogPost[]>([])

  // Process Raw Blog Data into Formatted Posts
  if (data.value) {
    posts = useBlogUtils().mapBlogPostDataArray(data.value)
  }
</script>
