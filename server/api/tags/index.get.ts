import { getTags } from '~/server/model/tag'
import type { ITagModel } from '~/types'

export default defineEventHandler(async () => {
  return payload<ITagModel[]>(
    await getTags(),
  )
})
