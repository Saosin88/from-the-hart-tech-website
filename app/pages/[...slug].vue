<template>
  <template v-if="page">
    <article class="prose dark:prose-invert max-w-none prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300">
      <ContentRenderer :value="page" />
    </article>
  </template>
  <template v-else>
    <div class="empty-page">
      <h1>Page Not Found</h1>
      <p>Oops! The Page you're looking for doesn't exist.</p>
      <ULink to="/">Go back home</ULink>
    </div>
  </template>
</template>

<script setup>
  const route = useRoute()
  const { data: page } = await useAsyncData(route.path, () => queryCollection('pages').path(route.path).first())

  useSeoMeta({
    title: page.value?.title,
    description: page.value?.description,
    keywords: page.value?.keywords,
    robots: page.value?.robots,
    author: page.value?.author,
    ogDescription: page.value?.ogDescription,
    ogImage: page.value?.ogImage,
    ogUrl: page.value?.ogUrl,
    twitterTitle: page.value?.twitterTitle,
    twitterDescription: page.value?.twitterDescription,
    twitterImage: page.value?.twitterImage,
    twitterCard: page.value?.twitterCard,
    twitterSite: page.value?.twitterSite,
    twitterCreator: page.value?.twitterCreator,
  })
</script>
