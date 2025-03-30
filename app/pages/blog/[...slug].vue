<template>
  <section>
    <template v-if="post">
      <!-- Blog Index Page -->
      <template v-if="isIndexPage">
        <div class="container mx-auto px-6 py-8">
          <h1 class="text-5xl font-bold leading-none sm:text-6xl text-center mb-8">My <span class="text-primary-600">Blog</span></h1>

          <div class="prose dark:prose-invert max-w-none">
            <ContentRenderer :value="post" />
          </div>
        </div>
      </template>

      <!-- Individual Blog Post Page -->
      <div v-else class="container mx-auto px-6 py-8">
        <header class="mb-8">
          <h1 class="text-4xl sm:text-5xl font-bold mb-4">{{ post.title }}</h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-neutral-600 dark:text-neutral-400">
            <time v-if="post.formattedDate" :datetime="post.formattedDate">{{ post.formattedDate }}</time>

            <div v-if="post.author" class="flex items-center">
              <span class="mx-2">•</span>
              <span>{{ post.author }}</span>
            </div>
          </div>
        </header>

        <div class="grid grid-cols-1 md:grid-cols-8 gap-8 md:gap-12 lg:gap-16">
          <div
            :class="{
              'col-span-1 md:col-span-6': post.toc && !isIndexPage,
              'col-span-1 md:col-span-8': !post.toc || isIndexPage,
            }"
          >
            <div
              class="prose dark:prose-invert prose-headings:font-bold prose-headings:text-neutral-900 dark:prose-headings:text-neutral-100 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-img:border prose-img:border-secondary-500 dark:prose-img:border-secondary-700 prose-img:w-full prose-blockquote:text-sm prose-blockquote:font-normal prose-pre:rounded-lg prose-pre:shadow-sm prose-pre:border prose-pre:border-secondary-500 dark:prose-pre:border-secondary-700 prose-h2:no-underline prose-h3:no-underline prose-h4:no-underline prose-headings:hover:no-underline prose-h2:mt-8 prose-h3:mt-6 prose-code:text-inherit prose-pre:bg-transparent dark:prose-pre:bg-transparent max-w-none"
            >
              <ContentRenderer :value="post" />
            </div>
          </div>

          <aside v-if="post.toc && !isIndexPage" class="hidden md:block md:col-span-2 not-prose">
            <div class="sticky top-8 p-4 bg-neutral-50 dark:bg-neutral-800/40 rounded-lg border border-neutral-200 dark:border-neutral-700">
              <h2 class="font-semibold text-lg mb-4">Table of Contents</h2>
              <TocLinks :links="post.body.toc.links" :active-id="activeId" />
            </div>
          </aside>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="container mx-auto px-6 py-8">
        <TheError :statusCode="404" :statusMessage="'Blog post not found'" />
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
  const route = useRoute()

  const post = await useBlogUtils().fetchBlogPost(route.path)

  const isIndexPage = computed(() => {
    return post && (route.path === '/blog' || post.path === '/blog')
  })

  const activeId = ref('')

  onMounted(() => {
    const callback = (entries: any) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          activeId.value = entry.target.id
          break
        }
      }
    }

    const observer = new IntersectionObserver(callback, {
      root: null,
      threshold: 0.5,
    })

    const elements = document.querySelectorAll('h2, h3')

    for (const element of elements) {
      observer.observe(element)
    }

    onBeforeUnmount(() => {
      for (const element of elements) {
        observer.unobserve(element)
      }
    })
  })

  useSeoMeta({
    title: post?.title,
    description: post?.description,
    keywords: post?.keywords,
    robots: post?.robots,
    author: post?.author,
    ogDescription: post?.ogDescription,
    ogImage: post?.ogImage,
    ogUrl: post?.ogUrl,
    ogType: 'article',
    twitterTitle: post?.twitterTitle,
    twitterDescription: post?.twitterDescription,
    twitterImage: post?.twitterImage,
    twitterCard: 'summary_large_image',
    twitterSite: post?.twitterSite,
    twitterCreator: post?.twitterCreator,
  })
</script>
