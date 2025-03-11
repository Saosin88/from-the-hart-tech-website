<template>
  <div class="my-6">
    <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-neutral-800/40">
      <div class="flex items-center gap-4 mb-6">
        <div class="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-3 flex items-center justify-center w-16 h-16 overflow-hidden">
          <img v-if="experienceData.logo" :src="experienceData.logo" :alt="`${experienceData.companyName} logo`" class="max-w-full max-h-full object-contain" />
          <span v-else class="i-lucide-building text-2xl text-primary-600 dark:text-primary-400"></span>
        </div>

        <h3 class="text-xl font-semibold text-neutral-900 dark:text-neutral-100">{{ experienceData.companyName }}</h3>
      </div>

      <div class="space-y-6 pl-0 sm:pl-4">
        <div v-for="(role, index) in experienceData.roles" :key="index" class="relative">
          <div v-if="index < experienceData.roles.length - 1" class="absolute left-3 top-3 h-[calc(100%+1.5rem)] w-px bg-neutral-300 dark:bg-neutral-700"></div>

          <div class="flex gap-4">
            <div class="flex-shrink-0 mt-1 z-10">
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
            </div>

            <div>
              <h4 class="text-lg font-medium text-neutral-900 dark:text-neutral-100">{{ role.title }}</h4>

              <div class="text-sm text-neutral-600 dark:text-neutral-400">{{ role.duration }}</div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup lang="ts">
  const experienceData = {
    companyName: 'FNB (First National Bank)',
    logo: '/assets/about/fnb-logo.png',
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
