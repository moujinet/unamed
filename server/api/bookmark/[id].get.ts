import { prisma } from '~/prisma/client'
import type { IApiResponse, IBookmarkModel } from '~/types'
import { BOOKMARK_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<IBookmarkModel | null> => {
  const { id } = getRouterParams(event)

  const bookmark = await prisma.bookmark.findUnique({
    where: {
      id: id.trim() === '' ? undefined : Number.parseInt(id.trim()),
    },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
      collection: true,
    },
  })

  if (!bookmark)
    return error(BOOKMARK_NOT_FOUND)

  return payload<IBookmarkModel>(bookmark)
})
