import { jwtDecode } from 'jwt-decode'
import type { AuthResult, LoginResponse, RegisterResponse, VerifyEmailResponse, RefreshTokenResponse } from '~/app/types/auth'

let accessToken: string | null = null
const tokenRefreshLoading = ref(false)

export function useAuthController() {
  const api = useAuthAPI()

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
    return decoded.exp ? decoded.exp > currentTime : false
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

  function getUserID(): string | null {
    const token = getAccessToken()
    if (!token) return null

    const decoded = decodeToken(token)
    if (!decoded) return null

    return decoded.user_id || null
  }

  async function register(email: string, password: string, turnstileToken: string): Promise<AuthResult<RegisterResponse>> {
    const response = await api.register(email, password, turnstileToken)
    if (response.success) {
      setAccessToken(response.data.idToken)
    }
    return response
  }

  async function login(
    email: string,
    password: string,
    turnstileToken: string,
    returnRefreshToken: boolean = false
  ): Promise<AuthResult<LoginResponse>> {
    const response = await api.login(email, password, turnstileToken, returnRefreshToken)
    if (response.success) {
      setAccessToken(response.data.idToken)
    }
    return response
  }

  async function verifyEmail(token: string): Promise<AuthResult<VerifyEmailResponse>> {
    const response = await api.verifyEmail(token)
    if (response.success) {
      setAccessToken(response.data.idToken)
    }
    return response
  }

  async function refreshToken(): Promise<AuthResult<RefreshTokenResponse>> {
    const response = await api.refreshToken()
    if (response.success) {
      setAccessToken(response.data.idToken)
    } else {
      clearAccessToken()
    }
    return response
  }

  async function logout() {
    clearAccessToken()
    await api.logout()
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
    getUserID,
    register,
    login,
    verifyEmail,
    refreshToken,
    logout,
  }
}
