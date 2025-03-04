<template>
  <div class="not-prose my-6">
    <UCard class="transition-all duration-200 hover:shadow-md dark:hover:shadow-gray-800/40">
      <!-- Company Header with Logo -->
      <div class="flex items-center gap-4 mb-6">
        <div class="bg-gray-100 dark:bg-gray-800 rounded-lg p-3 flex items-center justify-center w-16 h-16 overflow-hidden">
          <img v-if="logo" :src="logo" alt="FNB logo" class="max-w-full max-h-full object-contain" />
          <span v-else class="i-lucide-building text-2xl text-primary-600 dark:text-primary-400"></span>
        </div>
        <h3 class="text-xl font-semibold text-gray-900 dark:text-gray-100">FNB (First National Bank)</h3>
      </div>

      <!-- Role Timeline -->
      <div class="space-y-6 pl-0 sm:pl-4">
        <!-- Solutions Architect -->
        <div class="relative">
          <!-- Timeline connector line - connects from current dot center to next dot center -->
          <div class="absolute left-3 top-3 h-[calc(100%+1.5rem)] w-px bg-gray-300 dark:bg-gray-700"></div>

          <div class="flex gap-4">
            <!-- Timeline dot -->
            <div class="flex-shrink-0 mt-1 z-10">
              <!-- Added z-10 to keep dot above the line -->
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
            </div>

            <!-- Role Details -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">Solutions Architect</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400">Jan 2022 - Present</div>
            </div>
          </div>
        </div>

        <!-- Systems Architect -->
        <div class="relative">
          <!-- Timeline connector line - connects from current dot center to next dot center -->
          <div class="absolute left-3 top-3 h-[calc(100%+1.5rem)] w-px bg-gray-300 dark:bg-gray-700"></div>

          <div class="flex gap-4">
            <!-- Timeline dot -->
            <div class="flex-shrink-0 mt-1 z-10">
              <!-- Added z-10 to keep dot above the line -->
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
            </div>

            <!-- Role Details -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">Systems Architect</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400">Jul 2016 - Dec 2021</div>
            </div>
          </div>
        </div>

        <!-- Java Developer - Last item doesn't need a connector line -->
        <div class="relative">
          <div class="flex gap-4">
            <!-- Timeline dot -->
            <div class="flex-shrink-0 mt-1 z-10">
              <div class="w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                <div class="w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400"></div>
              </div>
            </div>

            <!-- Role Details -->
            <div>
              <h4 class="text-lg font-medium text-gray-900 dark:text-gray-100">Java Developer</h4>
              <div class="text-sm text-gray-600 dark:text-gray-400">Jan 2011 - Jun 2016</div>
            </div>
          </div>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script setup>
  const logo = '/assets/fnb-logo.png' // Default path to FNB logo
</script>
