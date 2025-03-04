<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <template v-if="page">
      <article
        class="prose dark:prose-invert prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-gray-100 prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-img:rounded-lg prose-img:shadow-md prose-pre:bg-gray-50 dark:prose-pre:bg-gray-800/80 prose-pre:text-gray-700 dark:prose-pre:text-gray-300 prose-pre:rounded-lg prose-pre:shadow-sm prose-ul:list-disc prose-ol:list-decimal prose-li:marker:text-primary-500 dark:prose-li:marker:text-primary-400 prose-blockquote:border-l-4 prose-blockquote:border-primary-500 dark:prose-blockquote:border-primary-400 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-gray-800/50 prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:rounded-r-lg prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-gray-800 dark:prose-code:text-gray-200 prose-code:text-sm prose-pre:code:bg-transparent dark:prose-pre:code:bg-transparent prose-pre:code:p-0 prose-table:border-collapse prose-table:border prose-table:border-gray-300 dark:prose-table:border-gray-700 prose-table:my-6 prose-thead:bg-gray-100 dark:prose-thead:bg-gray-800 prose-th:border prose-th:border-gray-300 dark:prose-th:border-gray-700 prose-th:p-2 prose-td:border prose-td:border-gray-300 dark:prose-td:border-gray-700 prose-td:p-2 max-w-none lg:max-w-4xl mx-auto"
      >
        <ContentRenderer :value="page" />
      </article>
    </template>
    <template v-else>
      <TheError :error="{ statusCode: 404, statusMessage: 'Page not found' }" />
    </template>
  </div>
</template>

<script setup>
  const route = useRoute()
  const { data: page } = await useAsyncData(route.path, () => queryCollection('pages').path(route.path).first())

  useSeoMeta({
    title: page.value?.title,
    description: page.value?.description,
    keywords: page.value?.keywords,
    robots: page.value?.robots || 'index, follow',
    author: page.value?.author,
    ogTitle: page.value?.title,
    ogDescription: page.value?.description,
    ogImage: page.value?.ogImage,
    ogUrl: page.value?.ogUrl || `https://fromthehart.tech${route.path}`,
    twitterTitle: page.value?.title,
    twitterDescription: page.value?.description,
    twitterImage: page.value?.twitterImage,
    twitterCard: page.value?.twitterCard || 'summary_large_image',
    twitterSite: page.value?.twitterSite || '@sheldonhart',
    twitterCreator: page.value?.twitterCreator || '@sheldonhart',
  })
</script>
