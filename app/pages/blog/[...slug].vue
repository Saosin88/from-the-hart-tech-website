<template>
  <article
    v-if="post"
    class="prose dark:prose-invert max-w-none prose-pre:bg-white dark:prose-pre:bg-gray-800 prose-pre:text-gray-700 dark:prose-pre:text-gray-300">
    <div class="grid grid-cols-6 gap-16">
      <div :class="{ 'col-span-4': post.toc, 'col-span-6': !post.toc }">
        <ContentRenderer v-if="post" :value="post" />
      </div>
      <div class="col-span-2 not-prose" v-if="post.toc">
        <aside class="sticky top-8">
          <div class="font-semibold mb-2">Table of Contents</div>
          <nav>
            <TocLinks
              :links="post.body.toc.links"
              :level="1"
              :active-id="activeId" />
          </nav>
        </aside>
      </div>
    </div>
  </article>
</template>

<script setup>
const route = useRoute();
const { data: post } = await useAsyncData(route.path, () =>
  queryCollection("blog").path(route.path).order("date", "DESC").first()
);

const activeId = ref(null);

onMounted(() => {
  const callback = (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        activeId.value = entry.target.id;
        break;
      }
    }
  };

  const observer = new IntersectionObserver(callback, {
    root: null,
    threshold: 0.5,
  });
  const elements = document.querySelectorAll("h2, h3");

  for (const element of elements) {
    observer.observe(element);
  }

  onBeforeUnmount(() => {
    for (const element of elements) {
      observer.unobserve(element);
    }
  });
});

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
  twitterCard: post.value?.twitterCard,
  twitterSite: post.value?.twitterSite,
  twitterCreator: post.value?.twitterCreator,
});
</script>
