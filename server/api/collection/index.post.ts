import { createCollection } from '~/server/model/collection'
import type { ICollectionModel } from '~/types'

export default defineEventHandler(async (event) => {
  const data = await readBody<Pick<ICollectionModel, 'icon' | 'name'>>(event)
  const result = await createCollection({
    ...data,
    author_id: event.context.user.id,
  })

  if (typeof result === 'number')
    return payload(result)

  return error(result)
})
