import type { IOption, IPreferences, TColorMode, TColorTheme, TLanguage, TPathFormat, TViewMode } from '~/types'

export const DEFAULT_PREFERENCES: IPreferences = {
  'interface.viewMode': 'grid',
  'interface.colorMode': 'system',
  'interface.colorTheme': '45, 210, 190',
  'interface.language': 'en-US',
  'general.openGraphSaving': '1',
  'display.collectionIcon': '1',
  'display.clickCount': '1',
  'display.qrCode': '1',
  'experimental.virtualScrolling': '1',
  'experimental.sourceTags': '1',
  'experimental.globalKeyboardShortcuts': '1',
  'system.appName': 'Unamed',
  'system.appDomain': 'http://localhost:8553',
  'system.allowGuests': '1',
  'system.allowRegistration': '1',
  'system.uploadPath': '/upload',
  'system.uploadPathFormat': 'YYYY-MM-DD',
}

export const ViewModeOptions: IOption<TViewMode>[] = [
  { icon: 'ph:squares-four', label: 'Grid View', value: 'grid' },
  { icon: 'ph:rows', label: 'List View', value: 'list' },
]

export const ColorModeOptions: IOption<TColorMode>[] = [
  { icon: 'ph:moon', label: 'Dark', value: 'dark' },
  { icon: 'ph:sun', label: 'Light', value: 'light' },
  { icon: 'ph:devices', label: 'System', value: 'system' },
]

export const ColorThemeOptions: IOption<TColorTheme>[] = [
  { label: 'Maximum Blue', value: '45, 210, 190' },
  { label: 'Carmine Pink', value: '240, 100, 100' },
  { label: 'Satin Sheen Gold', value: '210, 150, 45' },
  { label: 'Celtic Blue', value: '45, 120, 210' },
  { label: 'Iris', value: '80, 45, 210' },
]

export const PathFormatOptions: IOption<TPathFormat>[] = [
  { label: 'YYYY-MM-DD (default)', value: 'YYYY-MM-DD' },
  { label: 'YYYY-MM', value: 'YYYY-MM' },
]

export const LanguageOptions: IOption<TLanguage>[] = [
  { label: 'English (EN)', value: 'en-US' },
  { label: '中文 (简体) - ZH', value: 'zh-CN' },
  { label: '中文 (繁體) - ZH', value: 'zh-TW' },
]

export function useUserPreferences(): Ref<IPreferences> {
  const preferences = useLocalStorage<IPreferences>('preferences', DEFAULT_PREFERENCES)
  return preferences
}

export function usePreference<K extends keyof IPreferences>(key: K): Ref<IPreferences[K]> {
  const preferences = useUserPreferences()

  return computed({
    get() {
      return preferences.value[key]
    },
    set(newValue) {
      preferences.value[key] = newValue
    },
  })
}

export function togglePreference(key: keyof IPreferences) {
  const flag = usePreference(key)
  flag.value = flag.value === '1' ? '0' : '1'
}
