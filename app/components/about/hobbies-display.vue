<template>
  <UCard class="p-6">
    <div class="flex flex-col sm:flex-row gap-4">
      <div v-for="hobby in hobbies" :key="hobby.name" class="flex flex-col items-center sm:w-1/4">
        <UIcon :name="hobby.icon" class="text-5xl text-primary-600 dark:text-primary-400 mb-2" />

        <div class="text-center font-medium">{{ hobby.name }}</div>
      </div>
    </div>

    <p class="text-neutral-700 dark:text-neutral-300 mt-6">
      {{ description }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
  interface Hobby {
    name: string
    icon: string
  }

  const hobbies: Hobby[] = [
    { name: 'Gaming', icon: 'i-lucide-gamepad-2' },
    { name: 'Reading', icon: 'i-lucide-book-open' },
    { name: 'Movies & TV', icon: 'i-lucide-film' },
    { name: 'Family', icon: 'i-lucide-heart' },
  ]

  const description = "When I'm not working or being a parent to two amazing girls, I enjoy gaming, reading books and comics, and watching a variety of shows, movies, and anime."
</script>
