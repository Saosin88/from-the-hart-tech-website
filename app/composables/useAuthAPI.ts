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
        error: data.error || 'Failed to verify your email. Please request a new verification link.',
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
        error: data.error || 'An error occurred while sending the verification email. Please try again.',
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

  return {
    verifyEmail,
    resendVerificationEmail,
  }
}
