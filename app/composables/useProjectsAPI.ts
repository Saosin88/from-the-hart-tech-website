import type { GitHubRepo } from '~/app/types/projects'

export function useProjectsAPI() {
  const config = useRuntimeConfig()
  function getGitHubRepos() {
    const { data, error, status, refresh } = useFetch<{ data: GitHubRepo[] }>(`${config.public.fromTheHartAPIBaseUrl}/projects/github/Saosin88`, {
      server: false,
    })

    const pending = computed(() => status.value === 'pending')

    const repos = computed<GitHubRepo[]>(() => {
      if (!data.value?.data) return []
      return [...data.value.data].sort((a, b) => b.stargazers_count - a.stargazers_count)
    })

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
