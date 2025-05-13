import { jwtDecode } from 'jwt-decode'

let accessToken: string | null = null

let tokenCache: {
  raw: string | null
  decoded: any | null
} = { raw: null, decoded: null }

const tokenRefreshLoading = ref(false)

export function useAuthUtils() {
  async function login(email: string, password: string, turnstileToken: string, returnRefreshToken: boolean = false) {
    const response = await useAuthAPI().login(email, password, turnstileToken, returnRefreshToken)
    setAccessToken(response.data.idToken)
    return response
  }

  async function refreshToken() {
    const response = await useAuthAPI().refreshToken()
    setAccessToken(response.data.idToken)
    return response
  }

  async function logout() {
    clearAccessToken()
    await useAuthAPI().logout()
  }

  function setTokenRefreshLoading(value: boolean) {
    tokenRefreshLoading.value = value
  }

  function getAccessToken(): string | null {
    if (!accessToken) {
      if (import.meta.client) {
        accessToken = localStorage.getItem('access_token')
      }
    }
    return accessToken
  }

  function setAccessToken(token: string): void {
    if (import.meta.client && token) {
      accessToken = token
      localStorage.setItem('access_token', token)
    }
    tokenCache = { raw: null, decoded: null }
  }

  function clearAccessToken(): void {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
    }
    accessToken = null
    tokenCache = { raw: null, decoded: null }
  }

  function decodeToken(token: string): any | null {
    if (tokenCache.raw === token && tokenCache.decoded) {
      return tokenCache.decoded
    }

    try {
      const decoded = jwtDecode(token)
      tokenCache = { raw: token, decoded }
      return decoded
    } catch {
      return null
    }
  }

  function isAccessTokenValid(): boolean {
    const token = getAccessToken()
    if (!token) return false

    const decoded = decodeToken(token)
    if (!decoded) return false

    const currentTime = Date.now() / 1000
    if (decoded.exp && decoded.exp > currentTime) {
      return true
    } else {
      return false
    }
  }

  function isEmailVerified(): boolean {
    const token = getAccessToken()
    if (!token) return false

    const decoded = decodeToken(token)
    if (!decoded) return false

    return decoded.email_verified === true
  }

  return {
    login,
    refreshToken,
    logout,
    tokenRefreshLoading,
    setTokenRefreshLoading,
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    isAccessTokenValid,
    isEmailVerified,
  }
}
