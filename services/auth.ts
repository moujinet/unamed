export function useAuth() {
  const { isLoggedIn, isAdmin, profile } = useSession()

  function hasUserPermission(userId: number) {
    return isLoggedIn.value && (profile.value?.id === userId || isAdmin.value)
  }

  function hasDeletePermission() {
    return isLoggedIn.value && isAdmin.value
  }

  return {
    hasUserPermission,
    hasDeletePermission,
  }
}
