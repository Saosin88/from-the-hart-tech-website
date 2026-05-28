import type { Result } from './common'

export interface IdentityRecord {
  identity_id: string
  email: string
  first_name: string
  last_name: string
  identity_type: 'person'
  created_at: string
  updated_at: string
}

export interface UpdateIdentityRequest {
  first_name?: string
  last_name?: string
}

export type IdentityResult<T> = Result<T>
