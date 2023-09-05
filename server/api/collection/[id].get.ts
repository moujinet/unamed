import { getCollection } from '~/server/model/collection'
import { COLLECTION_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id)
    return error(COLLECTION_NOT_FOUND)

  const collection = await getCollection(Number.parseInt(id.trim()))

  if (!collection)
    return error(COLLECTION_NOT_FOUND)

  return payload(collection)
})
