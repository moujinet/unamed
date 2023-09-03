import type { RouteLocationNormalized } from 'vue-router'

export default defineNuxtRouteMiddleware((to) => {
  // eslint-disable-next-line n/prefer-global/process
  if (process.server)
    return

  if (to.path === '/bookmarks')
    return

  if (isHydrated.value)
    return handleAuth(to)

  onHydrated(() => handleAuth(to))
})

function handleAuth(to: RouteLocationNormalized) {
  const { isLoggedIn } = useSession()

  if (!isLoggedIn.value || to.path === '/')
    return navigateTo('/bookmarks')
}
