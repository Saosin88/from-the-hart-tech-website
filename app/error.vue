<template>
  <NuxtLayout>
    <TheError :error="error" />
  </NuxtLayout>
</template>

<script setup>
  defineProps({ error: Object })
</script>
