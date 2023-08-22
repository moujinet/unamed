const registered = {
  'add': 'i-fluent-add-20-regular',
  'arrow-left': 'i-fluent-arrow-left-20-regular',
  'arrow-right': 'i-fluent-arrow-right-20-regular',
  'user.profile': 'i-fluent-person-20-regular',
  'user.collections': 'i-fluent-layer-diagonal-20-regular',
  'user.tags': 'i-fluent-tag-multiple-20-regular',
  'admin.users': 'i-fluent-people-team-20-regular',
  'admin.system': 'i-fluent-options-20-regular',
  'settings.interface': 'i-fluent-desktop-20-regular',
  'settings.language': 'i-fluent-globe-location-20-regular',
  'settings.preferences': 'i-fluent-wrench-20-regular',
  'settings.about': 'i-fluent-info-20-regular',
}

type IconAliasNames = keyof typeof registered

export function useRegisteredIconName(alias: IconAliasNames) {
  return registered[alias]
}
