export type TViewMode = 'grid' | 'list'
export type TColorMode = 'light' | 'dark' | 'system'
export type TColorTheme = `${number}, ${number}, ${number}` | ''
export type TLanguage = 'en-US' | 'zh-CN' | 'zh-TW'
export type TPathFormat = 'YYYY-MM-DD' | 'YYYY-MM'
export type TSwitchMode = '0' | '1'

export interface IPreferences {
  'interface.viewMode': TViewMode
  'interface.colorMode': TColorMode
  'interface.colorTheme': TColorTheme
  'interface.language': TLanguage
  'general.openGraphSaving': TSwitchMode
  'display.collectionIcon': TSwitchMode
  'display.clickCount': TSwitchMode
  'display.qrCode': TSwitchMode
  'experimental.virtualScrolling': TSwitchMode
  'experimental.sourceTags': TSwitchMode
  'experimental.globalKeyboardShortcuts': TSwitchMode
  'system.appName': string
  'system.appDomain': string
  'system.allowGuests': TSwitchMode
  'system.allowRegistration': TSwitchMode
  'system.uploadPath': string
  'system.uploadPathFormat': TPathFormat
}

export interface IOption<T> {
  label?: string
  icon?: string
  value: T
}
