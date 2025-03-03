<template>
  <BlogPosts :limit="limit" />
  <!-- <BlogPosts v-slot="{ posts }" :limit="limit">
    <div v-for="post in posts" :key="post.id">
      <ULink :to="post.path">{{ post.title }}</ULink>
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
