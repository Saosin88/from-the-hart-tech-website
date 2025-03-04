<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <template v-if="post">
      <article>
        <!-- Blog Post Header - Only show if not the index page -->
        <header v-if="!isIndexPage" class="mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ post.title }}</h1>
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time v-if="post.date" :datetime="post.date">{{ formatDate(post.date) }}</time>
            <div v-if="post.author" class="flex items-center">
              <span class="mx-2">•</span>
              <span>{{ post.author }}</span>
            </div>
          </div>
        </header>

        <!-- Blog Content and Sidebar Layout -->
        <div class="grid grid-cols-1 md:grid-cols-6 gap-8 md:gap-12 lg:gap-16">
          <!-- Main Content -->
          <div
            :class="{
              'col-span-1 md:col-span-4': post.toc && !isIndexPage,
              'col-span-1 md:col-span-6 lg:max-w-4xl lg:mx-auto': !post.toc || isIndexPage,
            }"
          >
            <div
              class="prose dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800/80 prose-pre:text-gray-700 dark:prose-pre:text-gray-300 prose-pre:rounded-lg prose-pre:shadow-sm max-w-none"
            >
              <ContentRenderer :value="post" />
            </div>
          </div>

          <!-- Table of Contents Sidebar - Don't show for index page -->
          <aside v-if="post.toc && !isIndexPage" class="hidden md:block md:col-span-2 not-prose">
            <div class="sticky top-8 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 class="font-semibold text-lg mb-4">Table of Contents</h2>
              <TocLinks :links="post.body.toc.links" :active-id="activeId" />
            </div>
          </aside>
        </div>
      </article>
    </template>

    <template v-else>
      <TheError :error="{ statusCode: 404, statusMessage: 'Post not found' }" />
    </template>
  </div>
</template>

<script setup>
  const route = useRoute()
  const { data: post } = await useAsyncData(route.path, () => queryCollection('blog').path(route.path).first())

  // Check if this is the index page
  const isIndexPage = computed(() => {
    return post.value && (route.path === '/blog' || post.value.path === '/blog')
  })

  const activeId = ref(null)

  // Format date function for displaying post date
  const formatDate = dateString => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC',
    }).format(date)
  }

  // Set up the Intersection Observer for TOC highlighting
  onMounted(() => {
    if (isIndexPage.value) return

    // Wait a bit for the content to render
    setTimeout(() => {
      const headings = document.querySelectorAll('h2[id], h3[id], h4[id]')
      if (!headings.length) return

      const observerOptions = {
        rootMargin: '-100px 0px -80% 0px',
        threshold: 0,
      }

      const headingsObserver = new IntersectionObserver(entries => {
        // Get all visible headings
        const visibleHeadings = entries.filter(entry => entry.isIntersecting).map(entry => entry.target)

        // If we have visible headings, update activeId to the first one
        if (visibleHeadings.length > 0) {
          activeId.value = visibleHeadings[0].id
        }
      }, observerOptions)

      // Observe all headings
      headings.forEach(heading => {
        headingsObserver.observe(heading)
      })

      // Clean up observer on component unmount
      onBeforeUnmount(() => {
        headings.forEach(heading => {
          headingsObserver.unobserve(heading)
        })
      })
    }, 500)
  })
</script>
