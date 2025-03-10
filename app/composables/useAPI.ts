import type { GitHubRepo } from '~/app/types/api'

export function useAPI() {
  function getGitHubRepos() {
    const { data, error, status, refresh } = useFetch<GitHubRepo[]>('https://api.github.com/users/Saosin88/repos')

    const pending = computed(() => status.value === 'pending')
    const repos = computed<GitHubRepo[]>(() => ((data.value ?? []) as GitHubRepo[]).sort((a, b) => b.stargazers_count - a.stargazers_count))

    return {
      repos,
      error,
      pending,
      refresh,
    }
  }

  return {
    getGitHubRepos,
  }
}
