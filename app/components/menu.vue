<template>
  <UNavigationMenu
    orientation="horizontal"
    :items="items"
    class="w-full justify-center" />
</template>

<script setup>
const items = ref([
  [
    {
      label: "About",
      icon: "i-lucide-person-standing",
      to: "/about",
    },
    {
      label: "Blog",
      icon: "i-lucide-book-open",
      to: "/blog",
    },
    {
      label: "Projects",
      icon: "i-lucide-codepen",
      to: "/projects",
    },
  ],
]);
</script>
