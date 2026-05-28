import { jwtDecode } from 'jwt-decode'
import type { AuthResult, LoginResponse, RegisterResponse, VerifyEmailResponse, RefreshTokenResponse } from '~/app/types/auth'

let idToken: string | null = null
const tokenRefreshLoading = ref(false)

export function useAuthController() {
  const api = useAuthAPI()

  function setTokenRefreshLoading(value: boolean) {
    tokenRefreshLoading.value = value
  }

  function getIdToken(): string | null {
    if (!idToken) {
      if (import.meta.client) {
        idToken = localStorage.getItem('id_token')
      }
    }
    return idToken
  }

  function hasIdToken(): boolean {
    return !!getIdToken()
  }

  function setIdToken(token: string): void {
    if (import.meta.client && token) {
      idToken = token
      localStorage.setItem('id_token', token)
    }
  }

  function clearIdToken(): void {
    if (import.meta.client) {
      localStorage.removeItem('id_token')
    }
    idToken = null
  }

  function decodeToken(token: string): any | null {
    try {
      const decoded = jwtDecode(token)
      return decoded
    } catch {
      return null
    }
  }

  function isIdTokenValid(): boolean {
    const token = getIdToken()
    if (!token) return false

    const decoded = decodeToken(token)
    if (!decoded) return false

    const currentTime = Date.now() / 1000
    return decoded.exp ? decoded.exp > currentTime : false
  }

  function isEmailVerified(): boolean {
    const token = getIdToken()
    if (!token) return false

    const decoded = decodeToken(token)
    if (!decoded) return false

    return decoded.email_verified === true
  }

  function getPrincipalEmail(): string | null {
    const token = getIdToken()
    if (!token) return null

    const decoded = decodeToken(token)
    if (!decoded) return null

    return decoded.email || null
  }

  function getPrincipalID(): string | null {
    const token = getIdToken()
    if (!token) return null

    const decoded = decodeToken(token)
    if (!decoded) return null

    return decoded.user_id || null
  }

  function getActingIdentity(): string | null {
    const token = getIdToken()
    if (!token) return null

    const decoded = decodeToken(token)
    if (!decoded) return null

    return decoded.acting_identity || null
  }

  async function register(email: string, password: string, turnstileToken: string): Promise<AuthResult<RegisterResponse>> {
    const response = await api.register(email, password, turnstileToken)
    if (response.success) {
      setIdToken(response.data.idToken)
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
      setIdToken(response.data.idToken)
    }
    return response
  }

  async function verifyEmail(token: string): Promise<AuthResult<VerifyEmailResponse>> {
    const response = await api.verifyEmail(token)
    if (response.success) {
      setIdToken(response.data.idToken)
    }
    return response
  }

  async function refreshToken(): Promise<AuthResult<RefreshTokenResponse>> {
    const response = await api.refreshToken()
    if (response.success) {
      setIdToken(response.data.idToken)
    } else {
      clearIdToken()
    }
    return response
  }

  async function logout() {
    clearIdToken()
    await api.logout()
  }

  return {
    tokenRefreshLoading,
    setTokenRefreshLoading,
    getIdToken,
    hasIdToken,
    setIdToken,
    clearIdToken,
    decodeToken,
    isIdTokenValid,
    isEmailVerified,
    getPrincipalEmail,
    getPrincipalID,
    getActingIdentity,
    register,
    login,
    verifyEmail,
    refreshToken,
    logout,
  }
}
