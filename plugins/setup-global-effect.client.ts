export default defineNuxtPlugin(() => {
  const html = document.documentElement

  // Color Theme
  watchEffect(() => {
    const colorTheme = usePreference('interface.colorTheme')
    html.style.setProperty('--color-theme', colorTheme.value)
  })
})
