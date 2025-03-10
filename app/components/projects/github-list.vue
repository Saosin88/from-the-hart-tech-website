<template>
  <div>
    <div v-if="pending" class="flex justify-center items-center py-12">
      <div class="animate-pulse text-lg font-medium">Loading projects...</div>
    </div>

    <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
      <p class="text-red-600 dark:text-red-400 font-medium">Something went wrong while fetching projects.</p>
      <button @click="() => refresh()" class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800/30 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 rounded-md transition-colors">
        Try again
      </button>
    </div>

    <div v-else>
      <ul class="flex flex-col space-y-4">
        <li
          v-for="repo in repos"
          :key="repo.id"
          class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md dark:hover:shadow-gray-800/30 transition-shadow duration-300 bg-white dark:bg-gray-800"
        >
          <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="flex justify-between p-4 group">
            <div class="flex flex-col">
              <h3 class="font-medium text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {{ repo.name }}
              </h3>

              <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {{ repo.description || 'No description available' }}
              </p>
            </div>

            <div class="flex flex-col items-end justify-between">
              <div class="flex items-center space-x-1 text-amber-500 dark:text-amber-400">
                <span class="font-mono">{{ repo.stargazers_count }}</span>
                <Icon name="lucide:star" class="w-5 h-5" />
              </div>

              <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
                <div class="flex items-center">
                  <span class="w-3 h-3 rounded-full mr-1" :style="{ backgroundColor: getLanguageColour(repo.language) }"></span>
                  {{ repo.language || 'Unknown' }}
                </div>

                <span class="mx-2">•</span>

                <div>Updated {{ formatDateInAgoTerms(repo.updated_at) }}</div>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  const { repos, error, pending, refresh } = useAPI().getGitHubRepos()
  const { formatDateInAgoTerms, getLanguageColour } = useFormatters()
</script>
