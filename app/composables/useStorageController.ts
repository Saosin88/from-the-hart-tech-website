import type { StorageListResponse, FileMetadata, StorageAccessResponse, Result } from '~/app/types/storage'

const STORAGE_TOKEN_KEY = 'from_the_hart_storage_access_expires_at'
const TOKEN_BUFFER_SECONDS = 300

export function useStorageController() {
  const api = useStorageAPI()

  async function getStorageAccess(): Promise<Result<StorageAccessResponse>> {
    const result = await api.getStorageAccess()

    if (result.success && import.meta.client) {
      localStorage.setItem(STORAGE_TOKEN_KEY, result.data.expires_at.toString())
    }

    return result
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

  async function getFilesAndFolders(urlPath: string): Promise<Result<StorageListResponse>> {
    return api.getFilesAndFolders(urlPath)
  }

  async function getFileMetadata(path: string): Promise<Result<FileMetadata>> {
    if (!areStorageTokensValid()) {
      const accessResult = await getStorageAccess()
      if (!accessResult.success) {
        return { success: false, error: accessResult.error }
      }
    }

    return api.getFileMetadata(path)
  }

  return {
    getStorageAccess,
    areStorageTokensValid,
    getFilesAndFolders,
    getFileMetadata,
  }
}
