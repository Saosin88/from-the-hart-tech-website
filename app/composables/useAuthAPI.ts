export function useAuthAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl

  async function register(email: string, password: string, turnstileToken: string) {
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CF-Turnstile-Token': turnstileToken,
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'Registration failed. Please try again.',
      }
    } catch (error) {
      console.error('Error during registration:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function login(email: string, password: string, turnstileToken: string, returnRefreshToken: boolean = false) {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CF-Turnstile-Token': turnstileToken,
        },
        body: JSON.stringify({ email, password, returnRefreshToken }),
        credentials: 'include',
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'Invalid email or password',
      }
    } catch (error) {
      console.error('Error logging in:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function forgotPassword(email: string, turnstileToken: string) {
    try {
      const response = await fetch(`${baseUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CF-Turnstile-Token': turnstileToken,
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'An error occurred while sending the password reset email. Please try again.',
      }
    } catch (error) {
      console.error('Error sending password reset email:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function resendVerificationEmail(email: string) {
    try {
      const token = useAuthUtils().getAccessToken()
      const response = await fetch(`${baseUrl}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'An error occurred while sending the verification email. Please try again.',
      }
    } catch (error) {
      console.error('Error resending verification:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function verifyEmail(token: string) {
    try {
      const response = await fetch(`${baseUrl}/auth/verify-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'Failed to verify your email. Please request a new verification link.',
      }
    } catch (error) {
      console.error('Error verifying email:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function resetPassword(token: string, password: string) {
    try {
      const response = await fetch(`${baseUrl}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password,
        }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'Failed to reset your password. Please try again or request a new reset link.',
      }
    } catch (error) {
      console.error('Error resetting password:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function refreshToken() {
    try {
      const response = await fetch(`${baseUrl}/auth/refresh-token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'Failed to refresh token',
      }
    } catch (error) {
      console.error('Error getting refresh token:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  async function logout() {
    try {
      const token = useAuthUtils().getAccessToken()

      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: response.ok ? null : data.error?.message || 'Failed to logout',
      }
    } catch (error) {
      console.error('Error during logout:', error)
      return {
        success: false,
        data: null,
        error: 'An unexpected error occurred. Please try again later.',
      }
    }
  }

  return {
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
