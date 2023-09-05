import { deleteCollection } from '~/server/model/collection'
import { COLLECTION_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id)
    return error(COLLECTION_NOT_FOUND)

  const code = await deleteCollection(Number.parseInt(id.trim()))

  return payload(null, code)
})
