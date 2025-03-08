<template>
  <!-- Main Experience Card Container -->
  <div class="my-6">
    <!-- Experience Card with Hover Effects -->
    <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
      <!-- Company Header with Logo -->
      <div class="flex items-center gap-4 mb-6">
        <!-- Company Logo Container with Background -->
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-center w-16 h-16 overflow-hidden">
          <!-- Dynamic Image Display with Fallback Icon -->
          <img v-if="experienceData.logo" :src="experienceData.logo" :alt="`${experienceData.companyName} logo`" class="max-w-full max-h-full object-contain" />
          <span v-else class="i-lucide-building text-2xl text-primary-600 dark:text-primary-400"></span>
        </div>
        <!-- Company Name Display -->
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">{{ experienceData.companyName }}</h3>
      </div>

      <!-- Role Timeline Section with Left Padding on Desktop -->
      <div class="space-y-6 pl-0 sm:pl-4">
        <!-- Individual Role Item with Position Indicator -->
        <div v-for="(role, index) in experienceData.roles" :key="index" class="relative">
          <!-- Timeline Vertical Connector Line (Except for Last Item) -->
          <div v-if="index < experienceData.roles.length - 1" class="absolute left-3 top-3 h-[calc(100%+1.5rem)] w-px bg-gray-300 dark:bg-gray-700"></div>

          <!-- Role Content Row with Timeline Dot -->
          <div class="flex gap-4">
            <!-- Timeline Dot Indicator -->
            <div class="flex-shrink-0 mt-1 z-10">
              <!-- Outer Circle with Light Background -->
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <!-- Inner Circle with Accent Color -->
                <div class="w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
            </div>

            <!-- Role Details Container -->
            <div>
              <!-- Role Title / Position -->
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">{{ role.title }}</h4>
              <!-- Role Duration / Time Period -->
              <div class="text-sm text-gray-600 dark:text-gray-400">{{ role.duration }}</div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  // Career Experience Data Object
  // Contains company information and role history:
  // - companyName: Name of the employer
  // - logo: Path to the company logo image (optional)
  // - roles: Array of positions held at the company, each with:
  //   - title: Job title/position name
  //   - duration: Time period in the role
  const experienceData = {
    companyName: 'FNB (First National Bank)',
    logo: '/assets/fnb-logo.png',
    roles: [
      {
        title: 'Solutions Architect',
        duration: 'Jan 2022 - Present',
      },
      {
        title: 'Systems Architect',
        duration: 'Jul 2016 - Dec 2021',
      },
      {
        title: 'Java Developer',
        duration: 'Jan 2011 - Jun 2016',
      },
    ],
  }
</script>
