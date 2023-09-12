import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import { TAG_ALREADY_EXISTS, TAG_CREATE_FAILED } from '~/utils/errors'

interface ICreateTagBody {
  name: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { name } = await readBody<ICreateTagBody>(event)

  if (name.trim() === '')
    return error(TAG_CREATE_FAILED)

  const exists = await prisma.tag.findUnique({
    where: {
      name,
    },
  })

  if (exists)
    return error(TAG_ALREADY_EXISTS)

  const tag = await prisma.tag.create({
    data: {
      author_id: event.context.user?.id,
      name: name.trim(),
    },
  })

  if (!tag)
    return error(TAG_CREATE_FAILED)

  return success()
})
