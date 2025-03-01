<template>
  <section class="not-prose font-mono">
    <div class="column text-gray-400 text-sm">
      <div>date</div>
      <div>title</div>
    </div>

    <ul>
      <li v-for="post in posts" :key="post.path">
        <NuxtLink
          :to="post.path"
          class="column hover:bg-gray-100 dark:hover:bg-gray-800">
          <div
            :class="{
              'text-white dark:text-gray-900': !post.displayYear,
              'text-gray-400 dark:text-gray-500': post.displayYear,
            }">
            {{ post.year }}
          </div>
          <div>{{ post.title }}</div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface BlogPost {
  path: string;
  title: string;
  date: string;
  displayYear?: boolean;
  year?: number;
}

const { data } = await useAsyncData("blog-list", () =>
  queryCollection("blog")
    .where("path", "<>", "/blog")
    .select("path", "title", "date")
    .order("date", "DESC")
    .all()
);

const posts = computed<BlogPost[]>(() => {
  if (!data.value) {
    return [];
  }

  const result: BlogPost[] = [];
  let lastYear = 0;

  for (const post of data.value) {
    const blogPost = post as unknown as BlogPost;
    const year = new Date(blogPost.date).getFullYear();
    const displayYear = year !== lastYear;
    blogPost.displayYear = displayYear;
    blogPost.year = year;
    result.push(blogPost);
    lastYear = year;
  }

  return result;
});
</script>

<style scoped>
.column {
  @apply flex items-center space-x-8 py-2 border-b border-gray-200 dark:border-gray-700;
}
</style>
