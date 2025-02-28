<template>
  <article class="prose dark:prose-invert">
    <ContentRenderer v-if="post" :value="post" />
  </article>
</template>

<script setup lang="ts">
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).first()
);

useSeoMeta({
  title: post.value?.seo.title as string | null | undefined,
  description: post.value?.seo.description as string | null | undefined,
  keywords: post.value?.meta.keywords as string | null | undefined,
  robots: post.value?.meta.robots as string | null | undefined,
  author: post.value?.meta.author as string | null | undefined,
  ogTitle: post.value?.meta.ogTitle as string | null | undefined,
  ogDescription: post.value?.meta.ogDescription as string | null | undefined,
  ogImage: post.value?.meta.ogImage as string | null | undefined,
  ogUrl: post.value?.meta.ogUrl as string | null | undefined,
  twitterTitle: post.value?.meta.twitterTitle as string | null | undefined,
  twitterDescription: post.value?.meta.twitterDescription as
    | string
    | null
    | undefined,
  twitterImage: post.value?.meta.twitterImage as string | null | undefined,
  twitterCard: post.value?.meta.twitterCard as
    | "summary"
    | "summary_large_image"
    | "app"
    | "player"
    | null
    | undefined,
  twitterSite: post.value?.meta.twitterSite as string | null | undefined,
  twitterCreator: post.value?.meta.twitterCreator as string | null | undefined,
});
</script>
