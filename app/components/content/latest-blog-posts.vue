<template>
  <BlogPosts :limit="limit" />
</template>

<script setup>
  defineProps({
    limit: {
      type: Number,
      default: null,
    },
  })
</script>
