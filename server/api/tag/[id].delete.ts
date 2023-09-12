import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import { TAG_DELETE_FAILED, TAG_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = getRouterParams(event)

  if (id.trim() === '')
    return error(TAG_NOT_FOUND)

  const tag = await prisma.tag.findUnique({
    where: {
      id: Number.parseInt(id.trim()),
    },
  })

  if (!tag)
    return error(TAG_NOT_FOUND)

  if (await prisma.tag.delete({
    where: {
      id: Number.parseInt(id.trim()),
    },
  }))
    return success()

  return error(TAG_DELETE_FAILED)
})
