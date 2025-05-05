export function useAuthAPI() {
  const config = useRuntimeConfig()
  const baseUrl = config.public.fromTheHartAPIBaseUrl

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
        error: data.error.message || 'Failed to verify your email. Please request a new verification link.',
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

  async function resendVerificationEmail(email: string) {
    try {
      const response = await fetch(`${baseUrl}/auth/resend-verification`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: data.error.message || 'An error occurred while sending the verification email. Please try again.',
      }
    } catch (error) {
      console.error('Error resending verification:', error)
      return {
        success: false,
        data: null,
        error: 'Unable to connect to the server. Please check your internet connection and try again.',
      }
    }
  }

  async function forgotPassword(email: string) {
    try {
      const response = await fetch(`${baseUrl}/auth/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()
      return {
        success: response.ok,
        data: data.data,
        error: data.error?.message || 'An error occurred while sending the password reset email. Please try again.',
      }
    } catch (error) {
      console.error('Error sending password reset email:', error)
      return {
        success: false,
        data: null,
        error: 'Unable to connect to the server. Please check your internet connection and try again.',
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
        error: data.error.message || 'Failed to reset your password. Please try again or request a new reset link.',
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

  return {
    verifyEmail,
    resendVerificationEmail,
    forgotPassword,
    resetPassword,
  }
}
