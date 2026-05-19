import type { Repository, HealthCheckResponse, ProjectsResult } from '~/app/types/projects'

export function useProjectsController() {
  const api = useProjectsAPI()

  async function healthCheck(): Promise<ProjectsResult<HealthCheckResponse>> {
    return api.healthCheck()
  }

  async function getRepositories(): Promise<ProjectsResult<Repository[]>> {
    return api.getRepositories()
  }

  return {
    healthCheck,
    getRepositories,
  }
}
