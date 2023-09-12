import { prisma } from '~/prisma/client'
import type { IApiResponse } from '~/types'
import {
  BOOKMARK_ALREADY_EXISTS,
  BOOKMARK_NOT_FOUND,
  BOOKMARK_UPDATE_FAILED,
} from '~/utils/errors'

interface IUpdateBookmarkBody {
  collection_id: number
  name: string
  url: string
  description?: string
  icon?: string
  tags?: string[]
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = getRouterParams(event)
  const {
    collection_id,
    name,
    url,
    description,
    icon,
  } = await readBody<IUpdateBookmarkBody>(event)

  if (!id || id.trim() === '')
    return error(BOOKMARK_NOT_FOUND)

  if (!collection_id || !name || !url || name.trim() === '' || url.trim() === '')
    return error(BOOKMARK_UPDATE_FAILED)

  const exists = await prisma.bookmark.findUnique({
    where: {
      id: Number.parseInt(id.trim()),
    },
  })

  if (!exists)
    return error(BOOKMARK_NOT_FOUND)

  if (await prisma.bookmark.findFirst({
    where: {
      OR: [{ name }, { url }],
      NOT: [
        { id: Number.parseInt(id.trim()) },
      ],
    },
  }))
    return error(BOOKMARK_ALREADY_EXISTS)

  const bookmark = await prisma.bookmark.update({
    where: {
      id: Number.parseInt(id.trim()),
    },
    data: {
      author_id: event.context.user.id,
      collection_id,
      name,
      url,
      description: description || '',
      icon: icon || '',
    },
  })

  if (!bookmark)
    return error(BOOKMARK_UPDATE_FAILED)

  return success()
})
