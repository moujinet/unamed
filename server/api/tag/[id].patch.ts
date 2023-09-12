import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import { TAG_ALREADY_EXISTS, TAG_NOT_FOUND, TAG_UPDATE_FAILED } from '~/utils/errors'

interface IUpdateTagBody {
  name: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = getRouterParams(event)
  const { name } = await readBody<IUpdateTagBody>(event)

  if (name.trim() === '')
    return error(TAG_UPDATE_FAILED)

  const oldTag = await prisma.tag.findUnique({
    where: {
      id: Number.parseInt(id.trim()),
    },
  })

  if (!oldTag)
    return error(TAG_NOT_FOUND)

  const exists = await prisma.tag.findUnique({
    where: {
      name: name.trim(),
      NOT: {
        id: Number.parseInt(id.trim()),
      },
    },
  })

  if (exists)
    return error(TAG_ALREADY_EXISTS)

  const tag = await prisma.tag.update({
    where: {
      id: Number.parseInt(id.trim()),
    },
    data: {
      name: name.trim(),
    },
  })

  if (!tag)
    return error(TAG_UPDATE_FAILED)

  return success()
})
