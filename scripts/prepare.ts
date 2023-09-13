import fs from 'fs-extra'

// copy locales to public/locales
await fs.copy('locales', 'public/locales', { overwrite: true })
