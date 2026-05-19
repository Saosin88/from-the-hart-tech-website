import type { Repository, HealthCheckResponse, ProjectsResult } from '~/app/types/projects'

export function useProjectsAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl

  async function fetchAPI<T>(path: string, options: RequestInit = {}): Promise<ProjectsResult<T>> {
    try {
      const response = await fetch(`${baseUrl}/${path}`, {
        method: 'GET',
        ...options,
      })

      if (!response.ok) {
        let errorMessage = 'Request failed. Please try again.'
        try {
          const errorData = await response.json()
          errorMessage = errorData.error?.message || errorMessage
        } catch {
          errorMessage = `Request failed with status ${response.status}`
        }
        return { success: false, error: errorMessage }
      }

      const data = await response.json()
      return { success: true, data: data.data }
    } catch (error) {
      console.error('API error:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { success: false, error: 'Network error. Please check your connection.' }
      }
      return { success: false, error: 'An unexpected error occurred. Please try again later.' }
    }
  }

  async function healthCheck(): Promise<ProjectsResult<HealthCheckResponse>> {
    return fetchAPI<HealthCheckResponse>('projects/health')
  }

  async function getRepositories(): Promise<ProjectsResult<Repository[]>> {
    return fetchAPI<Repository[]>('projects/github/Saosin88')
  }

  return {
    healthCheck,
    getRepositories,
  }
}
