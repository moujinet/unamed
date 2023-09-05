import { createTag } from '~/server/model/tag'
import type { ITagModel } from '~/types'

export default defineEventHandler(async (event) => {
  const { name } = await readBody<Pick<ITagModel, 'name'>>(event)
  const result = await createTag({ name, author_id: event.context.user.id })

  if (typeof result === 'number')
    return payload(result)

  return error(result)
})
