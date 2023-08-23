export function useSplitView(routeName: string) {
  const route = useRoute()

  const isRootPage = computedEager(() => route.name === routeName)

  const showNav = computed(() => {
    if (isRootPage.value)
      return true
    return !isMobile.value
  })

  const showContent = computed(() => {
    if (isMobile.value)
      return !isRootPage.value
    return true
  })

  return {
    showNav,
    showContent,
  }
}
