import type { IApiResponse, ITagModel } from '~/types'
import { prisma } from '~/prisma/client'
import { TAG_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<ITagModel | null> => {
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

  return payload<ITagModel>(tag)
})
