export default defineNuxtRouteMiddleware(async to => {
  if (import.meta.server) return

  const authRequiredPaths = ['/user']

  const requiresAuth = authRequiredPaths.some(path => to.path.startsWith(path))

  const authUtils = useAuthUtils()

  if (requiresAuth && !useAuthUtils().isAccessTokenValid()) {
    try {
      authUtils.setTokenRefreshLoading(true)

      const result = await useAuthUtils().refreshToken()

      if (!result.success || !useAuthUtils().isAccessTokenValid()) {
        authUtils.setTokenRefreshLoading(false)
        return navigateTo({
          path: '/auth/login',
          query: { redirect: to.fullPath },
        })
      }

      authUtils.setTokenRefreshLoading(false)
    } catch (error) {
      console.error('Error refreshing token:', error)
      authUtils.setTokenRefreshLoading(false)
      return navigateTo({
        path: '/auth/login',
        query: { redirect: to.fullPath },
      })
    }
  }

  if (requiresAuth && useAuthUtils().isAccessTokenValid() && !useAuthUtils().isEmailVerified()) {
    return navigateTo('/auth/email-verification-required')
  }
})
