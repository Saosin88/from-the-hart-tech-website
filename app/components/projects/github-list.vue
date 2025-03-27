<template>
  <ClientOnly>
    <div v-if="error" class="bg-error-50 dark:bg-error-900/20 border border-error-200 dark:border-error-800 rounded-lg p-6 text-center">
      <p class="text-error-600 dark:text-error-400 font-medium">Something went wrong while fetching projects.</p>
      <button
        @click="() => refresh()"
        class="mt-4 px-4 py-2 bg-error-100 dark:bg-error-800/30 hover:bg-error-200 dark:hover:bg-error-800/50 text-error-600 dark:text-error-400 rounded-md transition-colors"
      >
        Try again
      </button>
    </div>

    <!-- Loading state -->
    <div v-else-if="pending" class="flex flex-col space-y-4">
      <UCard v-for="i in 3" :key="i" class="transition-all duration-200 h-full">
        <div class="flex justify-between p-4">
          <div class="flex flex-col">
            <USkeleton class="h-7 w-40 mb-2" />

            <USkeleton class="h-4 w-56 mb-1" />
            <USkeleton class="h-4 w-48" />
          </div>

          <div class="flex flex-col items-end justify-between">
            <div class="flex items-center space-x-1">
              <USkeleton class="h-5 w-8" />
              <USkeleton class="h-5 w-5 rounded" />
            </div>

            <div class="flex items-center mt-auto">
              <USkeleton class="h-4 w-20" />
              <USkeleton class="h-4 w-4 mx-2 rounded-full" />
              <USkeleton class="h-4 w-24" />
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <div v-else class="flex flex-col space-y-4">
      <UCard v-for="repo in repos" :key="repo.id" class="transition-all duration-200 hover:shadow-md dark:hover:shadow-neutral-800/40 h-full">
        <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="flex justify-between p-4 group">
          <div class="flex flex-col">
            <h3 class="font-medium text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ repo.name }}
            </h3>

            <p class="text-sm text-neutral-600 dark:text-neutral-300 mt-1">
              {{ repo.description || 'No description available' }}
            </p>
          </div>

          <div class="flex flex-col items-end justify-between">
            <div class="flex items-center space-x-1 text-secondary-500 dark:text-secondary-400">
              <span class="font-mono">{{ repo.stargazers_count }}</span>
              <Icon name="lucide:star" class="w-5 h-5" />
            </div>

            <div class="flex items-center text-xs text-neutral-500 dark:text-neutral-400">
              <div class="flex items-center">
                <span class="w-3 h-3 rounded-full mr-1" :style="{ backgroundColor: getLanguageColour(repo.language) }"></span>
                {{ repo.language || 'Unknown' }}
              </div>

              <span class="mx-2">•</span>

              <div>Updated {{ formatDateInAgoTerms(repo.updated_at) }}</div>
            </div>
          </div>
        </a>
      </UCard>
    </div>

    <template #fallback>
      <div class="flex flex-col space-y-4">
        <UCard v-for="i in 3" :key="i" class="transition-all duration-200 h-full">
          <div class="flex justify-between p-4">
            <div class="flex flex-col">
              <USkeleton class="h-7 w-40 mb-2" />

              <USkeleton class="h-4 w-56 mb-1" />
              <USkeleton class="h-4 w-48" />
            </div>

            <div class="flex flex-col items-end justify-between">
              <div class="flex items-center space-x-1">
                <USkeleton class="h-5 w-8" />
                <USkeleton class="h-5 w-5 rounded" />
              </div>

              <div class="flex items-center mt-auto">
                <USkeleton class="h-4 w-20" />
                <USkeleton class="h-4 w-4 mx-2 rounded-full" />
                <USkeleton class="h-4 w-24" />
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
  const { repos, error, pending, refresh } = useAPI().getGitHubRepos()
  const { formatDateInAgoTerms, getLanguageColour } = useFormatters()
  onBeforeMount
</script>
