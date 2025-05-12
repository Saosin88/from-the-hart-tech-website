import { jwtDecode } from 'jwt-decode'

export function useAuthUtils() {
  let tokenCache: {
    raw: string | null
    decoded: any | null
  } = { raw: null, decoded: null }

  function getAccessToken(): string | null {
    if (import.meta.client) {
      return localStorage.getItem('access_token')
    }
    return null
  }

  function setAccessToken(token: string): void {
    if (import.meta.client && token) {
      localStorage.setItem('access_token', token)
    }
    tokenCache = { raw: null, decoded: null }
  }

  function clearAccessToken(): void {
    if (import.meta.client) {
      localStorage.removeItem('access_token')
    }
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

  function isTokenValid(token: string | null): boolean {
    if (!token) return false

    const decoded = decodeToken(token)
    if (!decoded) return false

    const currentTime = Date.now() / 1000
    if (decoded.exp && decoded.exp > currentTime) {
      return true
    } else {
      clearAccessToken()
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

  function isAuthenticated(): boolean {
    const token = getAccessToken()
    return isTokenValid(token)
  }

  return {
    getAccessToken,
    setAccessToken,
    clearAccessToken,
    isAuthenticated,
    isEmailVerified,
  }
}
