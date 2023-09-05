import { TAG_NOT_FOUND } from '~/utils/errors'
import { updateTag } from '~/server/model/tag'
import type { ITagModel } from '~/types'

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)

  if (!id)
    return error(TAG_NOT_FOUND)

  const { name } = await readBody<Pick<ITagModel, 'name'>>(event)
  const code = await updateTag(Number.parseInt(id.trim()), { name })

  return payload(code)
})
