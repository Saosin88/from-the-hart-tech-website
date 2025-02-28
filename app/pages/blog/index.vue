<template>
  <div class="blog-index">
    <h1>Blog</h1>
    <NuxtLink to="/blog/first" class="link">First Post</NuxtLink>
    <NuxtLink to="/blog/second" class="link">Second Post</NuxtLink>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Blog",
});
</script>
