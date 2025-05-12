export default defineNuxtRouteMiddleware(to => {
  if (import.meta.server) return

  const authRequiredPaths = ['/user']

  const requiresAuth = authRequiredPaths.some(path => to.path.startsWith(path))

  if (requiresAuth && !useAuthUtils().isAuthenticated()) {
    return navigateTo({
      path: '/auth/login',
      query: { redirect: to.fullPath },
    })
  }

  if (requiresAuth && useAuthUtils().isAuthenticated() && !useAuthUtils().isEmailVerified()) {
    return navigateTo('/auth/email-verification-required')
  }
})
