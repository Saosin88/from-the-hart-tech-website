<template>
  <ClientOnly v-if="!colorMode?.forced">
    <UButton
      :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
      color="neutral"
      variant="ghost"
      class="rounded-full w-8 h-8 flex items-center justify-center p-0 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle color mode"
      @click="isDark = !isDark"
    />

    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
  const colorMode = useColorMode()

  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })
</script>
