<template>
  <article
    class="prose dark:prose-invert prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300">
    <ContentRenderer v-if="post" :value="post" />
  </article>
</template>

<script setup lang="ts">
const route = useRoute();

interface BlogPost {
  path: string;
  title: string;
  description: string;
  date: Date;
  keywords: string;
  robots: string;
  author: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
}

const { data: post } = await useAsyncData<BlogPost>(route.path, () =>
  queryCollection("blog").path(route.path).order("date", "DESC").first()
);

useSeoMeta({
  title: post.value?.title,
  description: post.value?.description,
  keywords: post.value?.keywords,
  robots: post.value?.robots,
  author: post.value?.author,
  ogDescription: post.value?.ogDescription,
  ogImage: post.value?.ogImage,
  ogUrl: post.value?.ogUrl,
  twitterTitle: post.value?.twitterTitle,
  twitterDescription: post.value?.twitterDescription,
  twitterImage: post.value?.twitterImage,
  twitterCard: post.value?.twitterCard as
    | "summary"
    | "summary_large_image"
    | "app"
    | "player",
  twitterSite: post.value?.twitterSite,
  twitterCreator: post.value?.twitterCreator,
});
</script>
