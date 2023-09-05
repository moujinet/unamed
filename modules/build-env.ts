import { defineNuxtModule } from '@nuxt/kit'
import { branch, commit, env, shortCommit, time, version } from '../build-info.json'
import type { BuildInfo } from '~/types'

export default defineNuxtModule({
  meta: {
    name: 'unamed:build-env',
  },
  async setup(_options, nuxt) {
    const buildInfo = {
      version,
      commit,
      shortCommit,
      time,
      branch,
      env,
    } as BuildInfo

    nuxt.options.appConfig = nuxt.options.appConfig || {}
    nuxt.options.appConfig.buildInfo = buildInfo
  },
})
