import type { GitHubRepo, HealthCheckResponse, ProjectsResult } from '~/app/types/projects'

export function useProjectsController() {
  const api = useProjectsAPI()

  async function healthCheck(): Promise<ProjectsResult<HealthCheckResponse>> {
    return api.healthCheck()
  }

  async function getGitHubRepos(): Promise<ProjectsResult<GitHubRepo[]>> {
    return api.getGitHubRepos()
  }

  return {
    healthCheck,
    getGitHubRepos,
  }
}
