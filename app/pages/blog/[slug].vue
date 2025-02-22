<template>
  <div>
    <h1>inside a blog post</h1>
  </div>
  <div>
    <h2>Post Slug is {{ route.params.slug }}</h2>
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
