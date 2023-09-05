import { deleteTag } from '~/server/model/tag'
import { TAG_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id)
    return error(TAG_NOT_FOUND)

  const code = await deleteTag(Number.parseInt(id.trim()))

  return payload(null, code)
})
