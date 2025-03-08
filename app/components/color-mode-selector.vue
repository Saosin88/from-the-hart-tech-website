<template>
  <!-- Color Mode Toggle with Client-Side Only Rendering -->
  <ClientOnly v-if="!colorMode?.forced">
    <!-- Theme Toggle Button with Dynamic Icon -->
    <UButton
      :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
      color="neutral"
      variant="ghost"
      class="rounded-full w-8 h-8 flex items-center justify-center p-0 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle color mode"
      @click="isDark = !isDark"
    />

    <!-- Fallback Placeholder When Client-Side JS Not Available -->
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
  // Access Nuxt's Color Mode Composable
  const colorMode = useColorMode()

  // Computed Property for Dark Mode Toggle
  // - Getter: Returns true if current mode is 'dark'
  // - Setter: Toggles between 'light' and 'dark' modes
  const isDark = computed({
    get() {
      return colorMode.value === 'dark'
    },
    set() {
      colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
    },
  })
</script>
