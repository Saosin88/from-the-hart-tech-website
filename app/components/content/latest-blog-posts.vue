<template>
  <BlogPosts :limit="limit" />
  <!-- <BlogPosts v-slot="{ posts }" :limit="limit">
    <div v-for="post in posts" :key="post.id">
      <NuxtLink :to="post.path">{{ post.title }}</NuxtLink>
    </div>
  </BlogPosts> -->
</template>

<script setup>
defineProps({
  limit: {
    type: Number,
    default: null,
  },
});
</script>
