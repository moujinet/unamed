const scopes = [
  '',
  'Navigation',
  'Collections',
  'Languages',
  'Settings',
  'Admin',
  'Users',
] as const

export type CommandScopeNames = typeof scopes[number]
