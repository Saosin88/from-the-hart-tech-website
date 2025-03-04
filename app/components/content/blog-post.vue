<template>
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
        {{ truncatedDescription }}
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
          {{ formattedDate }}
        </time>

        <!-- Keywords/tags -->
        <div class="flex flex-wrap gap-2">
          <span v-for="keyword in keywords" :key="keyword" class="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300">
            {{ keyword }}
          </span>
        </div>
      </div>
    </div>
  </ULink>
</template>

<script setup>
  const props = defineProps({
    post: {
      type: Object,
      required: true,
    },
  })

  const formattedDate = computed(() => {
    const date = new Date(props.post.date)

    const formatter = new Intl.DateTimeFormat('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    })

    return formatter.format(date)
  })

  const keywords = computed(() => {
    if (!props.post.keywords || props.post.keywords.length === 0) {
      return []
    }
    const uniqueKeywords = [...new Set(props.post.keywords.split(','))]
    return uniqueKeywords.slice(0, 5) // Limit to 5 tags for better display
  })

  const truncatedDescription = computed(() => {
    if (!props.post.description) return ''

    const words = props.post.description.split(' ')
    if (words.length > 25) {
      return words.slice(0, 25).join(' ') + '...'
    }
    return props.post.description
  })
</script>
