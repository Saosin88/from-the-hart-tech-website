<template>
  <!-- Main Hobbies Card Container -->
  <UCard class="p-6">
    <!-- Hobbies Icons Grid with Responsive Layout -->
    <div class="flex flex-col sm:flex-row gap-4">
      <!-- Individual Hobby Item with Icon and Label -->
      <div v-for="hobby in hobbies" :key="hobby.name" class="flex flex-col items-center sm:w-1/4">
        <!-- Hobby Icon with Accent Color -->
        <UIcon :name="hobby.icon" class="text-5xl text-primary-600 dark:text-primary-400 mb-2" />
        <!-- Hobby Name Label -->
        <div class="text-center font-medium">{{ hobby.name }}</div>
      </div>
    </div>

    <!-- Personal Description Text -->
    <p class="text-gray-700 dark:text-gray-300 mt-6">
      {{ description }}
    </p>
  </UCard>
</template>

<script setup lang="ts">
  // Type Definition for Hobby Items
  interface Hobby {
    name: string // Display name of the hobby
    icon: string // Icon identifier for the hobby
  }

  // Hobbies Collection
  // Array of personal interests with corresponding icons
  const hobbies: Hobby[] = [
    { name: 'Gaming', icon: 'i-lucide-gamepad-2' },
    { name: 'Reading', icon: 'i-lucide-book-open' },
    { name: 'Movies & TV', icon: 'i-lucide-film' },
    { name: 'Family', icon: 'i-lucide-heart' },
  ]

  // Personal Description Text
  // Brief paragraph about personal interests and family life
  const description = "When I'm not working or being a parent to two amazing girls, I enjoy gaming, reading books and comics, and watching a variety of shows, movies, and anime."
</script>
