import { prisma } from '~/prisma/client'
import type { IApiResponse, ICollectionModel } from '~/types'
import { COLLECTION_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<ICollectionModel | null> => {
  const { id } = getRouterParams(event)

  if (id.trim() === '')
    return error(COLLECTION_NOT_FOUND)

  const collection = await prisma.collection.findUnique({
    where: {
      id: Number.parseInt(id.trim()),
    },
  })

  if (!collection)
    return error(COLLECTION_NOT_FOUND)

  return payload<ICollectionModel>(collection)
})
