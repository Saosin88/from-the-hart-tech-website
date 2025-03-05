<template>
  <section class="not-prose w-full">
    <!-- No posts message -->
    <div v-if="!posts.length" class="flex justify-center items-center py-12 text-gray-500 dark:text-gray-400">
      <p class="text-center">No blog posts found</p>
    </div>

    <!-- Posts grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4 md:gap-6 lg:gap-8">
      <div v-for="post in posts" :key="post.path" class="flex">
        <!-- Individual post card (integrated from blog-post.vue) -->
        <ULink
          :active="false"
          :to="post.path"
          class="group flex flex-col h-full w-full overflow-hidden border rounded-xl border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <!-- Post content -->
          <div class="flex-1 p-5 space-y-3">
            <h3 class="text-xl sm:text-2xl font-semibold line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ post.title }}
            </h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
              {{ truncatedDescription(post) }}
            </p>
          </div>

          <!-- Divider -->
          <div class="border-t border-gray-200 dark:border-gray-700"></div>

          <!-- Post metadata -->
          <div class="flex items-start p-5">
            <div class="w-full space-y-3">
              <!-- Date -->
              <time :datetime="post.date" class="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                <span class="i-lucide-calendar mr-1 text-primary-500 dark:text-primary-400"></span>
                {{ formatDate(post.date) }}
              </time>

              <!-- Keywords/tags -->
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="keyword in getKeywords(post)"
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

<script setup>
  const props = defineProps({
    limit: {
      type: Number,
      default: 0,
    },
  })

  // Fetch blog posts data
  const { data } = await useAsyncData('blog-list' + ' ' + props.limit, () => {
    const query = queryCollection('blog').where('path', '<>', '/blog').select('path', 'title', 'description', 'date', 'keywords').order('date', 'DESC')

    if (props.limit > 0) {
      query.limit(props.limit)
    }

    return query.all()
  })

  const posts = computed(() => {
    if (!data.value) {
      return []
    }
    return data.value
  })

  function formatDate(dateString) {
    const date = new Date(dateString)

    const formatter = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })

    return formatter.format(date)
  }

  function getKeywords(post) {
    if (!post.keywords || post.keywords.length === 0) {
      return []
    }
    const uniqueKeywords = [...new Set(post.keywords.split(','))]
    return uniqueKeywords.slice(0, 5)
  }

  function truncatedDescription(post) {
    if (!post.description) return ''

    const words = post.description.split(' ')
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...'
    }
    return post.description
  }
</script>
