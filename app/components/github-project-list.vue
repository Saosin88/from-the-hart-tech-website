<template>
  <!-- Loading State with Animation -->
  <div v-if="pending" class="flex justify-center items-center py-12">
    <div class="animate-pulse text-lg font-medium">Loading projects...</div>
  </div>

  <!-- Error State with Retry Button -->
  <div v-else-if="error" class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
    <p class="text-red-600 dark:text-red-400 font-medium">Something went wrong while fetching projects.</p>
    <button @click="() => refetch()" class="mt-4 px-4 py-2 bg-red-100 dark:bg-red-800/30 hover:bg-red-200 dark:hover:bg-red-800/50 text-red-600 dark:text-red-400 rounded-md transition-colors">
      Try again
    </button>
  </div>

  <!-- Project List Container -->
  <div v-else>
    <ul class="flex flex-col space-y-4">
      <!-- Individual Project Card Item -->
      <li
        v-for="repo in repos"
        :key="repo.id"
        class="rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md dark:hover:shadow-gray-800/30 transition-shadow duration-300 bg-white dark:bg-gray-800"
      >
        <!-- Repository Link with Group Hover Effects -->
        <a :href="repo.html_url" target="_blank" rel="noopener noreferrer" class="flex justify-between p-4 group">
          <!-- Repository Information Column -->
          <div class="flex flex-col">
            <!-- Repository Name with Hover Color Effect -->
            <h3 class="font-medium text-lg group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ repo.name }}
            </h3>
            <!-- Repository Description with Fallback -->
            <p class="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {{ repo.description || 'No description available' }}
            </p>
          </div>

          <!-- Repository Stats Column -->
          <div class="flex flex-col items-end justify-between">
            <!-- Star Count Display -->
            <div class="flex items-center space-x-1 text-amber-500 dark:text-amber-400">
              <span class="font-mono">{{ repo.stargazers_count }}</span>
              <Icon name="lucide:star" class="w-5 h-5" />
            </div>

            <!-- Repository Metadata Row -->
            <div class="flex items-center text-xs text-gray-500 dark:text-gray-400">
              <!-- Programming Language with Color Indicator -->
              <div class="flex items-center">
                <span class="w-3 h-3 rounded-full mr-1" :style="`background-color: ${repo.language ? languageColors[repo.language] || '#888' : '#888'}`"></span>
                {{ repo.language || 'Unknown' }}
              </div>
              <!-- Separator Dot -->
              <span class="mx-2">•</span>
              <!-- Last Updated Timestamp -->
              <div>Updated {{ useFormatters().formatDateInAgoTerms(repo.updated_at) }}</div>
            </div>
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  // GitHub Repository Data Structure Definition
  interface GitHubRepo {
    id: number // Unique identifier for the repository
    name: string // Repository name
    description: string | null // Repository description (may be null)
    html_url: string // URL to the repository on GitHub
    stargazers_count: number // Number of stars the repository has
    language: string | null // Primary programming language (may be null)
    updated_at: string // Last update timestamp in ISO format
  }

  // Fetch GitHub Repositories Data
  const { error, status, data, refresh: refetch } = await useFetch('https://api.github.com/users/Saosin88/repos')

  // Computed Loading State Based on Request Status
  const pending = computed(() => status.value === 'pending')

  // Computed Repository List Sorted by Star Count
  const repos = computed<GitHubRepo[]>(() => ((data.value ?? []) as GitHubRepo[]).sort((a, b) => b.stargazers_count - a.stargazers_count))

  // Common GitHub Language Color Mapping
  // Maps programming languages to their standard color representation
  const languageColors: { [key: string]: string } = {
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    Vue: '#41b883',
    HTML: '#e34c26',
    CSS: '#563d7c',
    Python: '#3572A5',
    Java: '#b07219',
    PHP: '#4F5D95',
    'C#': '#178600',
    Ruby: '#701516',
  }
</script>
