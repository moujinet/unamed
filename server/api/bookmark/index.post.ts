import { prisma } from '~/prisma/client'
import type { IApiResponse } from '~/types'
import {
  BOOKMARK_ALREADY_EXISTS,
  BOOKMARK_CREATE_FAILED,
} from '~/utils/errors'

interface ICreateBookmarkBody {
  collection_id: number
  name: string
  url: string
  description?: string
  icon?: string
  tags?: string[]
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const {
    collection_id,
    name,
    url,
    description,
    icon,
    tags,
  } = await readBody<ICreateBookmarkBody>(event)

  if (!collection_id || !name || !url || name.trim() === '' || url.trim() === '')
    return error(BOOKMARK_CREATE_FAILED)

  if (await prisma.bookmark.findFirst({
    where: {
      OR: [{ name }, { url }],
    },
  }))
    return error(BOOKMARK_ALREADY_EXISTS)

  const existsTags = (tags && tags.length > 0)
    ? await prisma.tag.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        name: {
          in: tags,
        },
      },
    })
    : []

  const newBookmark = await prisma.bookmark.create({
    data: {
      author_id: event.context.user.id,
      collection_id,
      name,
      url,
      description: description || '',
      icon: icon || '',
      tags: {
        create: tags?.map((tag) => {
          const existsTag = existsTags.find(e => e.name === tag)
          return {
            tag: existsTag
              ? {
                  connect: {
                    id: existsTag.id,
                  },
                }
              : {
                  create: {
                    name: tag,
                    author_id: event.context.user.id,
                  },
                },
          }
        }),
      },
    },
  })

  if (!newBookmark)
    return error(BOOKMARK_CREATE_FAILED)

  return success()
})
