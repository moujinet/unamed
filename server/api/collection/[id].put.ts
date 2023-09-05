import { updateCollection } from '~/server/model/collection'
import { COLLECTION_NOT_FOUND } from '~/utils/errors'
import type { ICollectionModel } from '~/types'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id)
    return error(COLLECTION_NOT_FOUND)

  const data = await readBody<Omit<ICollectionModel, 'icon' | 'name'>>(event)
  const code = await updateCollection(
    Number.parseInt(id.trim()),
    {
      ...data,
      author_id: event.context.user.id,
    },
  )

  return payload(null, code)
})
