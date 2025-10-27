import type { GitHubRepo } from '~/app/types/projects'

export function useProjectsAPI() {
  const config = useRuntimeConfig()

  async function healthCheck() {
    try {
      const response = await fetch(`${config.public.fromTheHartAPIBaseUrl}/projects/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: response.ok ? data.data : null,
        error: response.ok ? null : data.error?.message || 'Health check failed',
      }
    } catch (error) {
      console.error('Error during health check', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function getGitHubRepos() {
    try {
      const response = await fetch(`${config.public.fromTheHartAPIBaseUrl}/projects/github/Saosin88`)
      const data = await response.json()

      return {
        success: response.ok,
        data: data.data || [],
        error: response.ok ? null : 'Failed to fetch GitHub repositories',
      }
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error)
      return {
        success: false,
        data: [],
        error: 'Unable to connect to the server. Please check your internet connection and try again.',
      }
    }
  }

  return {
    healthCheck,
    getGitHubRepos,
  }
}
