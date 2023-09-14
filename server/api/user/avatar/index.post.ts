import { stat, unlink, writeFile } from 'node:fs/promises'
import { env } from 'node:process'
import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import { UPLOAD_FILE_TYPE_NOT_ALLOW, UPLOAD_NO_FILE, USER_UPDATE_FAILED } from '~/utils/errors'

const mimeTypes = [
  'image/apng',
  'image/bmp',
  'image/gif',
  'image/jpeg',
  'image/pjpeg',
  'image/png',
  'image/svg+xml',
  'image/webp',
  'image/x-icon',
]

export default defineEventHandler(async (event): IApiResponse<string | null> => {
  const files = await readMultipartFormData(event)
  const { id } = event.context.user

  if (!files || files.length === 0)
    return error(UPLOAD_NO_FILE)

  const uploads: string[] = []
  const uploadPath = env.UPLOAD_PATH || './public/avatars'

  for (let i = 0; i < 1; i++) {
    if (files[i].name === 'file') {
      const mimetype = files[i].type
      const fileExtName = files[i].filename?.split('.').pop() || 'png'
      if (!mimetype || !mimeTypes.includes(mimetype))
        return error(UPLOAD_FILE_TYPE_NOT_ALLOW)

      const data = files[i].data
      const timestamp = (new Date()).getTime()
      const filePath = `${uploadPath}/user-${id}-${timestamp}.${fileExtName}`
      const fileName = `/avatars/user-${id}-${timestamp}.${fileExtName}`

      await writeFile(filePath, data)
      uploads.push(fileName)
    }
  }

  const originAvatar = `${uploadPath.replace('/avatars', '/')}${event.context.user.avatar}`

  try {
    const s = await stat(originAvatar)
    if (s.isFile())
      await unlink(originAvatar)
  }
  catch (e) {}

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      avatar: uploads[0],
    },
  })

  if (!user)
    return error(USER_UPDATE_FAILED)

  return payload(uploads[0])
})
