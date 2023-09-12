import { prisma } from '~/prisma/client'
import type { IApiResponse } from '~/types'
import {
  BOOKMARK_DELETE_FAILED,
  BOOKMARK_NOT_FOUND,
} from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = getRouterParams(event)

  if (id.trim() === '')
    return error(BOOKMARK_NOT_FOUND)

  const bookmark = await prisma.bookmark.findUnique({
    select: {
      id: true,
    },
    where: {
      id: Number.parseInt(id.trim()),
    },
  })

  if (!bookmark)
    return error(BOOKMARK_NOT_FOUND)

  if (await prisma.bookmark.delete({
    where: {
      id: Number.parseInt(id.trim()),
    },
  }))
    return success()

  return error(BOOKMARK_DELETE_FAILED)
})
