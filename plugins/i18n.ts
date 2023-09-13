import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin(async ({ vueApp }) => {
  // lazy load i18n instance
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en-US',
    fallbackLocale: 'en-US',
    fallbackWarn: false,
    missingWarn: false,
  })

  vueApp.use(i18n)

  const locale = usePreference('interface.language')
  const buildInfo = useAppConfig().buildInfo

  async function setLocale(locale: string) {
    // eslint-disable-next-line n/prefer-global/process
    if (process.client) {
      // set locale
      i18n.global.locale.value = locale
      // load locale message
      const messages = await $fetch<any>(`/locales/${locale}.json?t=${buildInfo.time}`)
      // set locale and locale message
      i18n.global.setLocaleMessage(locale, messages)
      // set html language
      document && document.querySelector('html')?.setAttribute('lang', locale)
    }
  }

  watch(locale, async () => {
    await setLocale(locale.value)
  })

  await setLocale(locale.value)
})
