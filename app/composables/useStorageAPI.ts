import type { StorageListResponse, FileMetadata, StorageAccessResponse, Result } from '~/app/types/storage'

export function useStorageAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl
  const authController = useAuthController()

  async function fetchAPI<T>(
    path: string,
    options: { credentials?: RequestCredentials } = {}
  ): Promise<Result<T>> {
    try {
      const accessToken = authController.getAccessToken()

      const response = await fetch(`${baseUrl}/${path}`, {
        method: 'GET',
        headers: {
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
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

  async function getFilesAndFolders(urlPath: string): Promise<Result<StorageListResponse>> {
    return fetchAPI<StorageListResponse>(urlPath)
  }

  async function getStorageAccess(): Promise<Result<StorageAccessResponse>> {
    return fetchAPI<StorageAccessResponse>('storage/access', { credentials: 'include' })
  }

  async function getFileMetadata(path: string): Promise<Result<FileMetadata>> {
    return fetchAPI<FileMetadata>(path, { credentials: 'include' })
  }

  return {
    getFilesAndFolders,
    getStorageAccess,
    getFileMetadata,
  }
}
