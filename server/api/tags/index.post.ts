import { prisma } from '~/prisma/client'
import type { IApiResponse, ITagModel } from '~/types'

interface ISearchTagsBody {
  keyword: string
}

export default defineEventHandler(async (event): IApiResponse<Pick<ITagModel, 'id' | 'name'>[]> => {
  const { keyword } = await readBody<ISearchTagsBody>(event)

  const tags = await prisma.tag.findMany({
    select: {
      id: true,
      name: true,
    },
    where: keyword
      ? {
          name: {
            contains: keyword,
          },
        }
      : {},
    take: 5,
  })

  return payload<Pick<ITagModel, 'id' | 'name'>[]>(tags)
})
