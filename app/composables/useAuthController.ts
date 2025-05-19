import { jwtDecode } from 'jwt-decode'

let accessToken: string | null = null
const tokenRefreshLoading = ref(false)

export function useAuthController() {
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

  function hasAccessToken(): boolean {
    return !!getAccessToken()
  }

  function setAccessToken(token: string): void {
    if (import.meta.client && token) {
      accessToken = token
      localStorage.setItem('access_token', token)
    }
  }

  function clearAccessToken(): void {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
    }
    accessToken = null
  }

  function decodeToken(token: string): any | null {
    try {
      const decoded = jwtDecode(token)
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

  function getUserEmail(): string | null {
    const token = getAccessToken()
    if (!token) return null

    const decoded = decodeToken(token)
    if (!decoded) return null

    return decoded.email || null
  }

  async function register(email: string, password: string, turnstileToken: string) {
    const response = await useAuthAPI().register(email, password, turnstileToken)
    if (response.success && response.data && response.data.idToken) {
      setAccessToken(response.data.idToken)
    }
    return response
  }

  async function login(email: string, password: string, turnstileToken: string, returnRefreshToken: boolean = false) {
    const response = await useAuthAPI().login(email, password, turnstileToken, returnRefreshToken)
    if (response.success && response.data && response.data.idToken) {
      setAccessToken(response.data.idToken)
    }
    return response
  }

  async function verifyEmail(token: string) {
    const verifyEmailResponse = await useAuthAPI().verifyEmail(token)
    if (verifyEmailResponse.success) {
      try {
        refreshToken()
      } catch (error) {}
    }
    return verifyEmailResponse
  }

  async function refreshToken() {
    const response = await useAuthAPI().refreshToken()
    if (response.success && response.data && response.data.idToken) {
      setAccessToken(response.data.idToken)
    }
    return response
  }

  async function logout() {
    clearAccessToken()
    await useAuthAPI().logout()
  }

  return {
    tokenRefreshLoading,
    setTokenRefreshLoading,
    getAccessToken,
    hasAccessToken,
    setAccessToken,
    clearAccessToken,
    decodeToken,
    isAccessTokenValid,
    isEmailVerified,
    getUserEmail,
    register,
    login,
    verifyEmail,
    refreshToken,
    logout,
  }
}
