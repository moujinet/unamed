import { TAG_NOT_FOUND } from '~/utils/errors'
import { getTag } from '~/server/model/tag'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id)
    return error(TAG_NOT_FOUND)

  const tag = await getTag(Number.parseInt(id.trim()))

  if (!tag)
    return error(TAG_NOT_FOUND)

  return payload(tag)
})
