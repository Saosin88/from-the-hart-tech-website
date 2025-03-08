<template>
  <!-- Table of Contents Container -->
  <div class="text-sm">
    <!-- Primary Navigation Links List -->
    <ul>
      <!-- Top-Level Navigation Item -->
      <li v-for="link in links" :key="link.id" class="mb-1">
        <!-- Primary Section Link with Active State Styling -->
        <NuxtLink
          :to="$route.path + '#' + link.id"
          :class="[
            'block py-1 px-2 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50',
            activeId === link.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium' : '',
          ]"
        >
          {{ link.text }}
        </NuxtLink>

        <!-- Nested Sub-Section Links (if available) -->
        <ul v-if="link.children && link.children.length" class="ml-4">
          <!-- Child Navigation Item -->
          <li v-for="childLink in link.children" :key="childLink.id" class="mb-1">
            <!-- Sub-Section Link with Active State Styling -->
            <NuxtLink
              :to="$route.path + '#' + childLink.id"
              :class="[
                'block py-1 px-2 rounded-md transition-colors text-gray-700 dark:text-gray-300 hover:bg-gray-200/50 dark:hover:bg-gray-700/50',
                activeId === childLink.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium' : '',
              ]"
            >
              {{ childLink.text }}
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  // Define TypeScript Interface for Table of Contents Links
  interface TocLink {
    id: string // Anchor ID for the heading
    text: string // Display text for the link
    children?: TocLink[] // Optional nested sub-links
  }

  // Component Props Definition with Defaults
  withDefaults(
    defineProps<{
      links: TocLink[] // Array of navigation links with hierarchy
      activeId: string // Currently active section ID
    }>(),
    {
      links: () => [], // Default to empty array if no links provided
      activeId: '', // Default to empty string if no active ID provided
    },
  )
</script>
