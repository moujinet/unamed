import { writeFile } from 'node:fs/promises'
import { UPLOAD_FILE_TYPE_NO_SUPPORT, UPLOAD_NO_FILES } from '~/utils/errors'

const mimeTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/tiff',
  'image/webp',
  'image/x-icon',
]

export default defineEventHandler(async (event) => {
  const files = await readMultipartFormData(event)

  if (!files || files.length === 0)
    return error(UPLOAD_NO_FILES)

  const uploads: string[] = []

  for (let i = 0; i < files.length; i++) {
    if (files[i].name === 'file') {
      const filename = files[i].filename

      const mimetype = files[i].type
      if (!mimetype || validMimeType(mimetype))
        return error(UPLOAD_FILE_TYPE_NO_SUPPORT)

      const data = files[i].data
      const filePath = `./public/avatars/${filename}`
      await writeFile(filePath, data)
      uploads.push(filePath.replace('./public', ''))
    }
  }

  return payload(uploads.length > 1 ? uploads : uploads[0])
})

function validMimeType(mimetype: string) {
  return !mimeTypes.includes(mimetype)
}
