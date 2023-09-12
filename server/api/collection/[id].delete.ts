import { prisma } from '~/prisma/client'
import type { IApiResponse } from '~/types'
import {
  COLLECTION_DELETE_FAILED,
  COLLECTION_HAS_BOOKMARKS,
  COLLECTION_NOT_FOUND,
} from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = getRouterParams(event)

  if (id.trim() === '')
    return error(COLLECTION_NOT_FOUND)

  const collection = await prisma.collection.findUnique({
    where: {
      id: Number.parseInt(id.trim()),
    },
    include: {
      bookmarks: true,
    },
  })

  if (!collection)
    return error(COLLECTION_NOT_FOUND)

  if (collection.bookmarks.length > 0)
    return error(COLLECTION_HAS_BOOKMARKS)

  if (await prisma.collection.delete({
    where: {
      id: Number.parseInt(id.trim()),
    },
  }))
    return success()

  return error(COLLECTION_DELETE_FAILED)
})
