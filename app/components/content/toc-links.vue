<template>
  <ul>
    <li v-for="link in links" :key="link.id">
      <ULink
        :to="{ path: route.path, hash: `#${link.id}` }"
        :active="false"
        :class="{
          'ml-4': level,
          'text-green-600 dark:text-green-400': activeId === link.id,
        }"
      >
        {{ link.text }}
      </ULink>
      <TocLinks :links="link.children" :level="level + 1" :active-id="activeId" />
    </li>
  </ul>
</template>

<script setup>
  const route = useRoute()
  defineProps({
    links: Array,
    level: {
      type: Number,
      default: 0,
    },
    activeId: {
      type: String,
      default: null,
    },
  })
</script>
