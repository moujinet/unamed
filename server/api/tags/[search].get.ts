import { getTags } from '~/server/model/tag'
import type { ITagModel } from '~/types'

export default defineEventHandler(async (event) => {
  const { search } = getRouterParams(event)
  const { limit } = getQuery(event)

  return payload<ITagModel[]>(
    await getTags(search, limit ? Number.parseInt(String(limit)) : undefined),
  )
})
