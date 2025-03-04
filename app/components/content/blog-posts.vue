<template>
  <section class="not-prose">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
      <div v-for="post in posts" :key="post.path">
        <BlogPost :post="post" />
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
