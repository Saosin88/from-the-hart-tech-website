import type { Result } from './common'

export interface Repository {
  id: number
  name: string
  description: string | null
  html_url: string
  stargazers_count: number
  language: string | null
  updated_at: string
}

export interface HealthCheckResponse {
  status: string
}

export type ProjectsResult<T> = Result<T>
