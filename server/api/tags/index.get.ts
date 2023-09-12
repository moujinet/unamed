import { prisma } from '~/prisma/client'
import type { IApiResponse, ITagModel } from '~/types'

export default defineEventHandler(async (): IApiResponse<ITagModel[]> => {
  const tags = await prisma.tag.findMany()

  return payload<ITagModel[]>(tags)
})
