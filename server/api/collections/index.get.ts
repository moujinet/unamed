import { prisma } from '~/prisma/client'
import type { IApiResponse, ICollectionModel } from '~/types'

export default defineEventHandler(async (): IApiResponse<ICollectionModel[]> => {
  const collections = await prisma.collection.findMany({
    orderBy: {
      created_at: 'desc',
    },
  })

  return payload<ICollectionModel[]>(collections)
})
