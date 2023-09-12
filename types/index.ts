export * from './model'
export * from './payload'
export * from './preference'
export * from './metadata'

export interface BuildInfo {
  version: string
  commit: string
  shortCommit: string
  time: number
  branch: string
  env: 'canary' | 'dev' | 'release'
}
