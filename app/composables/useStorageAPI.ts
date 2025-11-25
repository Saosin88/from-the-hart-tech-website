import type { FileMetadata, StorageAccessResponse } from '~/app/types/storage'

const STORAGE_TOKEN_KEY = 'from_the_hart_storage_access_expires_at'
const TOKEN_BUFFER_SECONDS = 300

export function useStorageAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl

  async function getFilesAndFolders(urlPath: string) {
    try {
      const accessToken = useAuthController().getAccessToken() || ''
      const response = await fetch(`${baseUrl}/${urlPath}`, {
        method: 'GET',
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: response.ok ? data.data : null,
        error: response.ok ? null : data.error?.message || 'Getting files and folders failed. Please try again.',
      }
    } catch (error) {
      console.error('Error during getting files and folders:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function getStorageAccess() {
    try {
      const accessToken = useAuthController().getAccessToken() || ''
      const response = await fetch(`${baseUrl}/storage/access`, {
        method: 'GET',
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.data?.expires_at) {
        if (import.meta.client) {
          localStorage.setItem(STORAGE_TOKEN_KEY, data.data.expires_at.toString())
        }
        return {
          success: true,
          data: data.data as StorageAccessResponse,
          error: null,
        }
      }

      return {
        success: false,
        data: null,
        error: data.error?.message || 'Failed to get storage access.',
      }
    } catch (error) {
      console.error('Error getting storage access:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred while getting storage access.',
      }
    }
  }

  function areStorageTokensValid(): boolean {
    if (!import.meta.client) return false

    const expiresAtStr = localStorage.getItem(STORAGE_TOKEN_KEY)
    if (!expiresAtStr) return false

    const expiresAt = parseInt(expiresAtStr, 10)
    if (isNaN(expiresAt)) return false

    const currentTime = Math.floor(Date.now() / 1000)
    const expiryWithBuffer = expiresAt - TOKEN_BUFFER_SECONDS

    return currentTime < expiryWithBuffer
  }

  async function getFileMetadata(path: string) {
    try {
      if (!areStorageTokensValid()) {
        const accessResult = await getStorageAccess()
        if (!accessResult.success) {
          return {
            success: false,
            data: null,
            error: accessResult.error || 'Failed to refresh storage access.',
          }
        }
      }

      const accessToken = useAuthController().getAccessToken() || ''
      const response = await fetch(`${baseUrl}/${path}`, {
        method: 'GET',
        headers: {
          ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
        },
        credentials: 'include',
      })

      const data = await response.json()

      if (response.ok && data.data) {
        return {
          success: true,
          data: data.data as FileMetadata,
          error: null,
        }
      }

      return {
        success: false,
        data: null,
        error: data.error?.message || 'Failed to get file metadata.',
      }
    } catch (error) {
      console.error('Error getting file metadata:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred while getting file metadata.',
      }
    }
  }

  return {
    getFilesAndFolders,
    getStorageAccess,
    areStorageTokensValid,
    getFileMetadata,
  }
}
