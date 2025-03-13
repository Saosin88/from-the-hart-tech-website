<template>
  <div class="my-6 not-prose">
    <UCard class="overflow-hidden transition-all duration-200 hover:shadow-md dark:hover:shadow-neutral-800/40">
      <div class="p-3 flex justify-start text-sm text-neutral-600 dark:text-neutral-400">
        {{ caption }}
      </div>
      <div class="relative">
        <NuxtImg :src="`/assets/blog/${src}`" :alt="alt" class="w-full h-auto object-contain" />
      </div>
    </UCard>
  </div>
</template>
<script setup lang="ts">
  defineProps<{
    src: string
    alt: string
    caption: string
  }>()
</script>
