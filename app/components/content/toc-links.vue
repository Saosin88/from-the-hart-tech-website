<template>
  <div class="text-sm">
    <ul>
      <li v-for="link in links" :key="link.id" class="mb-1">
        <NuxtLink
          :to="$route.path + '#' + link.id"
          :class="[
            'block py-1 px-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50',
            activeId === link.id ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium' : '',
          ]"
        >
          {{ link.text }}
        </NuxtLink>

        <ul v-if="link.children && link.children.length" class="ml-4">
          <li v-for="childLink in link.children" :key="childLink.id" class="mb-1">
            <NuxtLink
              :to="$route.path + '#' + childLink.id"
              :class="[
                'block py-1 px-2 rounded-md transition-colors text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50',
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
  interface TocLink {
    id: string
    text: string
    children?: TocLink[]
  }

  withDefaults(
    defineProps<{
      links: TocLink[]
      activeId: string
    }>(),
    {
      links: () => [],
      activeId: '',
    },
  )
</script>
