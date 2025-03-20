<template>
  <div class="my-6">
    <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-neutral-800/40">
      <div class="flex flex-col sm:flex-row sm:items-center gap-4">
        <div class="flex-shrink-0 mx-auto sm:mx-0">
          <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 flex items-center justify-center w-24 h-24 overflow-hidden">
            <NuxtImg v-if="educationData.logo" :src="educationData.logo" alt="University logo" class="max-w-full max-h-full object-contain" />
            <span v-else class="lucide:graduation-cap text-3xl text-primary-600 dark:text-primary-400"></span>
          </div>
        </div>

        <div class="flex-grow text-center sm:text-left">
          <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
            {{ educationData.degree }}
          </h3>

          <div class="text-sm text-neutral-600 dark:text-neutral-400 mb-1"><span class="font-medium">University:</span> {{ educationData.university }}</div>

          <div class="text-sm text-neutral-600 dark:text-neutral-400"><span class="font-medium">Graduated:</span> {{ educationData.year }}</div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  const educationData = {
    degree: 'Bachelor of Sciences in Computer Sciences',
    university: 'University of Pretoria',
    year: '2010',
    logo: '/assets/about/up-logo.png',
  }
</script>
