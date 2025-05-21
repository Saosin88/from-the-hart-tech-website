export default defineNuxtRouteMiddleware(async to => {
  if (import.meta.server) return

  const authRequiredPaths = ['/user']
  const requiresAuth = authRequiredPaths.some(path => to.path.startsWith(path))

  if (!requiresAuth) return

  const authController = useAuthController()
  const hasToken = authController.hasAccessToken()
  const isTokenValid = authController.isAccessTokenValid()

  if (!hasToken) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }

  if (!isTokenValid) {
    try {
      authController.setTokenRefreshLoading(true)

      const result = await authController.refreshToken()

      authController.setTokenRefreshLoading(false)

      if (!result.success) {
        return navigateTo({
          path: '/auth/login',
          query: { redirect: to.fullPath },
        })
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
      authController.setTokenRefreshLoading(false)

      return navigateTo({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    }
  }

  if (!authController.isEmailVerified()) {
    return navigateTo('/auth/email-verification-required')
  }
})
