import Git from 'simple-git'
import fs from 'fs-extra'
import { isDevelopment } from 'std-env'
import { version } from '../package.json'
import type { BuildInfo } from '~/types'

const git = Git()

const branch = await git.revparse(['--abbrev-ref', 'HEAD'])
const commit = await git.revparse(['HEAD'])
const shortCommit = await git.revparse(['--short=7', 'HEAD'])

const env = isDevelopment
  ? 'dev'
  : branch === 'main'
    ? 'canary'
    : 'release'

const buildInfo: BuildInfo = {
  version,
  commit,
  shortCommit,
  time: +Date.now(),
  branch,
  env,
}

// Write build info
await fs.writeJSON('build-info.json', buildInfo, { spaces: 2, EOL: '\n' })
