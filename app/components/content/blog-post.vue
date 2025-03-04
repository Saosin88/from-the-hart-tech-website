<template>
  <ULink :active="false" :to="post.path" class="flex flex-col p-6 divide-y border rounded-xl border-primary-600 h-full w-full">
    <div class="p-3 space-y-1 flex-1">
      <h3 class="text-3xl font-semibold">{{ post.title }}</h3>
      <p class="text-sm">{{ truncatedDescription }}</p>
    </div>
    <div class="flex gap-3 p-3 flex-none">
      <div class="space-y-1">
        <p class="text-xs">{{ formattedDate }}</p>
        <div class="flex flex-wrap gap-3">
          <p v-for="keyword in keywords" :key="keyword" class="inline-block px-2 py-1 text-sm font-semibold rounded-md bg-primary-600 text-gray-50">{{ keyword }}</p>
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
    return new Date(props.post.date).toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' })
  })

  const keywords = computed(() => {
    if (!props.post.keywords || props.post.keywords.length === 0) {
      return []
    }
    const uniqueKeywords = [...new Set(props.post.keywords.split(','))]
    return uniqueKeywords.slice(0, 10)
  })

  const truncatedDescription = computed(() => {
    const words = props.post.description.split(' ')
    if (words.length > 30) {
      return words.slice(0, 30).join(' ') + '...'
    }
    return props.post.description
  })
</script>
