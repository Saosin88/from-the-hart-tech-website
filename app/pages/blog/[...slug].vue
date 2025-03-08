<template>
  <!-- Main Container with Responsive Padding -->
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Post Content Display - Shown when Post Data is Available -->
    <template v-if="post">
      <article>
        <!-- Blog Post Header - Only shown for individual post pages -->
        <header v-if="!isIndexPage" class="mb-8">
          <!-- Post Title with Responsive Sizing -->
          <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ post.title }}</h1>

          <!-- Post Metadata Row - Publication Date and Author Info -->
          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <!-- Publication Date with Semantic Time Element -->
            <time v-if="post.formattedDate" :datetime="post.formattedDate">{{ post.formattedDate }}</time>

            <!-- Author Information with Separator -->
            <div v-if="post.author" class="flex items-center">
              <span class="mx-2">•</span>
              <span>{{ post.author }}</span>
            </div>
          </div>
        </header>

        <!-- Blog Content and Sidebar Layout - Responsive Grid -->
        <div class="grid grid-cols-1 md:grid-cols-8 gap-8 md:gap-12 lg:gap-16">
          <!-- Main Content Column - Adjusts Width Based on TOC Presence -->
          <div
            :class="{
              'col-span-1 md:col-span-6': post.toc && !isIndexPage,
              'col-span-1 md:col-span-8': !post.toc || isIndexPage,
            }"
          >
            <!-- Content Renderer with Typography Styling -->
            <div
              class="prose dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800/80 prose-pre:text-gray-700 dark:prose-pre:text-gray-300 prose-pre:rounded-lg prose-pre:shadow-sm prose-h2:no-underline prose-h3:no-underline prose-h4:no-underline prose-headings:hover:no-underline prose-h2:mt-8 prose-h3:mt-6 max-w-none"
            >
              <ContentRenderer :value="post" />
            </div>
          </div>

          <!-- Table of Contents Sidebar - Only Shown for Posts with TOC -->
          <aside v-if="post.toc && !isIndexPage" class="hidden md:block md:col-span-2 not-prose">
            <!-- Sticky TOC Container with Subtle Background -->
            <div class="sticky top-8 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg border border-gray-200 dark:border-gray-700">
              <h2 class="font-semibold text-lg mb-4">Table of Contents</h2>
              <!-- TOC Links Component with Active Section Tracking -->
              <TocLinks :links="post.body.toc.links" :active-id="activeId" />
            </div>
          </aside>
        </div>
      </article>
    </template>

    <!-- Error State - Shown when Post Not Found -->
    <template v-else>
      <TheError :statusCode="404" :statusMessage="'Blog post not found'" />
    </template>
  </div>
</template>

<script setup lang="ts">
  // Import Types for Blog Post Data
  import type { BlogPostDataObject } from '~/app/types/blog'

  // Access to Current Route for Path Information
  const route = useRoute()

  // Fetch Blog Post Data from Content System
  // Uses route path as both cache key and query parameter
  const { data } = await useAsyncData<BlogPostDataObject>(route.path, () => queryCollection('blog').path(route.path).first())

  // Process Raw Blog Post Data using Utility Functions
  let post = null
  if (data.value) {
    post = useBlogUtils().mapBlogPostData(data.value)
  }

  // Determine if Current Page is Blog Index
  // Blog index can be identified by either route path or post path
  const isIndexPage = computed(() => {
    return post && (route.path === '/blog' || post.path === '/blog')
  })

  // Track Currently Active Heading ID for TOC Highlighting
  const activeId = ref('')

  // Intersection Observer Setup for TOC Active State
  onMounted(() => {
    // Callback for Intersection Observer
    // Updates activeId when a heading enters viewport
    const callback = (entries: any) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    }

    // Create Observer with 50% Threshold
    // This means headings are considered "visible" when 50% in view
    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.5,
    })

    // Select All H2 and H3 Elements for Observation
    const elements = document.querySelectorAll('h2, h3')

    // Start Observing Each Heading Element
    for (const element of elements) {
      observer.observe(element)
    }

    // Cleanup: Stop Observing Elements on Component Unmount
    onBeforeUnmount(() => {
      for (const element of elements) {
        observer.unobserve(element)
      }
    })
  })
</script>
