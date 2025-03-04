<template>
  <slot :posts="posts">
    <section class="not-prose font-mono">
      <div class="flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700 text-gray-400 text-sm">
        <div>date</div>
        <div>title</div>
      </div>

      <ul>
        <li v-for="post in posts" :key="post.path">
          <ULink :to="post.path" class="flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700 group hover:bg-gray-100 dark:hover:bg-gray-800">
            <div
              :class="{
                'text-white group-hover:text-gray-100 dark:text-gray-900 dark:group-hover:text-gray-800': !post.displayYear,
                'text-gray-400 dark:text-gray-500': post.displayYear,
              }"
            >
              {{ post.year }}
            </div>
            <div>{{ post.title }}</div>
          </ULink>
        </li>
      </ul>
    </section>
  </slot>
</template>

<script setup>
  const props = defineProps({
    limit: {
      type: Number,
      default: null,
    },
  })

  const { data } = await useAsyncData('blog-list', () => {
    const query = queryCollection('blog').where('path', '<>', '/blog').select('path', 'title', 'date').order('date', 'DESC')

    if (props.limit) {
      query.limit(props.limit)
    }

    return query.all()
  })

  const posts = computed(() => {
    if (!data.value) {
      return []
    }

    const result = []
    let lastYear = 0

    for (const post of data.value) {
      const year = new Date(post.date).getFullYear()
      const displayYear = year !== lastYear
      post.displayYear = displayYear
      post.year = year
      result.push(post)
      lastYear = year
    }

    return result
  })
</script>
