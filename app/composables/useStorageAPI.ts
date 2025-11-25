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

  return {
    getFilesAndFolders,
  }
}
