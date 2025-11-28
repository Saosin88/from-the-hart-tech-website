import type {
  RegisterResponse,
  LoginResponse,
  VerifyEmailResponse,
  RefreshTokenResponse,
  HealthCheckResponse,
  ForgotPasswordResponse,
  ResetPasswordResponse,
  ResendVerificationResponse,
  LogoutResponse,
  AuthResult,
} from '~/app/types/auth'

export function useAuthAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl

  async function fetchAPI<T>(
    path: string,
    options: RequestInit = {}
  ): Promise<AuthResult<T>> {
    try {
      const response = await fetch(`${baseUrl}/${path}`, {
        method: 'GET',
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

  async function healthCheck(): Promise<AuthResult<HealthCheckResponse>> {
    return fetchAPI<HealthCheckResponse>('auth/health')
  }

  async function register(email: string, password: string, turnstileToken: string): Promise<AuthResult<RegisterResponse>> {
    return fetchAPI<RegisterResponse>('auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CF-Turnstile-Token': turnstileToken,
      },
      body: JSON.stringify({ email, password }),
    })
  }

  async function login(
    email: string,
    password: string,
    turnstileToken: string,
    returnRefreshToken: boolean = false
  ): Promise<AuthResult<LoginResponse>> {
    return fetchAPI<LoginResponse>('auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CF-Turnstile-Token': turnstileToken,
      },
      body: JSON.stringify({ email, password, returnRefreshToken }),
      credentials: 'include',
    })
  }

  async function forgotPassword(email: string, turnstileToken: string): Promise<AuthResult<ForgotPasswordResponse>> {
    return fetchAPI<ForgotPasswordResponse>('auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CF-Turnstile-Token': turnstileToken,
      },
      body: JSON.stringify({ email }),
    })
  }

  async function resendVerificationEmail(accessToken: string): Promise<AuthResult<ResendVerificationResponse>> {
    return fetchAPI<ResendVerificationResponse>('auth/resend-verification', {
      headers: {
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })
  }

  async function verifyEmail(token: string): Promise<AuthResult<VerifyEmailResponse>> {
    return fetchAPI<VerifyEmailResponse>('auth/verify-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })
  }

  async function resetPassword(token: string, password: string): Promise<AuthResult<ResetPasswordResponse>> {
    return fetchAPI<ResetPasswordResponse>('auth/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, password }),
    })
  }

  async function refreshToken(): Promise<AuthResult<RefreshTokenResponse>> {
    return fetchAPI<RefreshTokenResponse>('auth/refresh-token', {
      credentials: 'include',
    })
  }

  async function logout(): Promise<AuthResult<LogoutResponse>> {
    return fetchAPI<LogoutResponse>('auth/logout')
  }

  return {
    healthCheck,
    register,
    login,
    forgotPassword,
    resendVerificationEmail,
    verifyEmail,
    resetPassword,
    refreshToken,
    logout,
  }
}
