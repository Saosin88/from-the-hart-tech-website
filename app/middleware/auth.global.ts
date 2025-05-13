export default defineNuxtRouteMiddleware(async to => {
  if (import.meta.server) return

  const authRequiredPaths = ['/user']
  const requiresAuth = authRequiredPaths.some(path => to.path.startsWith(path))

  if (!requiresAuth) return

  const authUtils = useAuthUtils()
  const hasToken = authUtils.hasAccessToken()
  const isTokenValid = authUtils.isAccessTokenValid()

  if (!hasToken) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }

  if (!isTokenValid) {
    try {
      authUtils.setTokenRefreshLoading(true)

      const result = await authUtils.refreshToken()

      authUtils.setTokenRefreshLoading(false)

      if (!result.success) {
        return navigateTo({
          path: '/auth/login',
          query: { redirect: to.fullPath },
        })
      }
    } catch (error) {
      console.error('Error refreshing token:', error)
      authUtils.setTokenRefreshLoading(false)

      return navigateTo({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    }
  }

  if (!authUtils.isEmailVerified()) {
    return navigateTo('/auth/email-verification-required')
  }
})
