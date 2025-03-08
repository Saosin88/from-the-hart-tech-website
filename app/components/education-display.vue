<template>
  <!-- Main Education Card Container -->
  <div class="my-6">
    <!-- Education Card with Hover Effects -->
    <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
      <!-- Responsive Layout Container (Column on Mobile, Row on Desktop) -->
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <!-- University Logo Container -->
        <div class="flex-shrink-0 mx-auto sm:mx-0">
          <!-- Logo Background with Consistent Size -->
          <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-center w-24 h-24 overflow-hidden">
            <!-- Dynamic Image Display with Fallback Icon -->
            <img v-if="educationData.logo" :src="educationData.logo" alt="University logo" class="max-w-full max-h-full object-contain" />
            <span v-else class="i-lucide-graduation-cap text-3xl text-primary-600 dark:text-primary-400"></span>
          </div>
        </div>

        <!-- Education Information Container -->
        <div class="flex-grow text-center sm:text-left">
          <!-- Degree Title -->
          <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
            {{ educationData.degree }}
          </h3>

          <!-- University Name -->
          <div class="text-sm text-gray-600 dark:text-gray-400 mb-1"><span class="font-medium">University:</span> {{ educationData.university }}</div>

          <!-- Graduation Year -->
          <div class="text-sm text-gray-600 dark:text-gray-400"><span class="font-medium">Graduated:</span> {{ educationData.year }}</div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  // Education Data Object
  // Contains all information about the educational background:
  // - degree: The full degree name
  // - university: The institution name
  // - year: Year of graduation
  // - logo: Path to the university logo image
  const educationData = {
    degree: 'Bachelor of Sciences in Computer Sciences',
    university: 'University of Pretoria',
    year: '2010',
    logo: '/assets/up-logo.png',
  }
</script>
