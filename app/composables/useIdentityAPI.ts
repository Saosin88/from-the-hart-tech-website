import type { IdentityRecord, UpdateIdentityRequest, IdentityResult } from '~/app/types/identity'

export function useIdentityAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl
  const authController = useAuthController()

  async function fetchAPI<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<IdentityResult<T>> {
    try {
      const idToken = authController.getIdToken()

      const response = await fetch(`${baseUrl}/${path}`, {
        ...options,
        method: options.method || 'GET',
        headers: {
          ...(idToken && { Authorization: `Bearer ${idToken}` }),
          ...(options.headers || {}),
        },
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
      console.error('Identity API error:', error)
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return { success: false, error: 'Network error. Please check your connection.' }
      }
      return { success: false, error: 'An unexpected error occurred. Please try again later.' }
    }
  }

  async function getIdentity(id: string): Promise<IdentityResult<IdentityRecord>> {
    return fetchAPI<IdentityRecord>(`identity/${id}`)
  }

  async function updateIdentity(
    id: string,
    data: UpdateIdentityRequest
  ): Promise<IdentityResult<IdentityRecord>> {
    return fetchAPI<IdentityRecord>(`identity/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  }

  return {
    getIdentity,
    updateIdentity,
  }
}
