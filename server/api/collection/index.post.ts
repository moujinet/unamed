import { prisma } from '~/prisma/client'
import type { IApiResponse } from '~/types'
import {
  COLLECTION_ALREADY_EXISTS,
  COLLECTION_CREATE_FAILED,
} from '~/utils/errors'

interface ICreateCollectionBody {
  name: string
  icon: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { name, icon } = await readBody<ICreateCollectionBody>(event)

  if (name.trim() === '' || icon.trim() === '')
    return error(COLLECTION_CREATE_FAILED)

  const exists = await prisma.collection.findUnique({
    where: {
      name: name.trim(),
    },
  })

  if (exists)
    return error(COLLECTION_ALREADY_EXISTS)

  const newCollection = await prisma.collection.create({
    data: {
      author_id: event.context.user?.id,
      name: name.trim(),
      icon: icon.trim(),
    },
  })

  if (newCollection)
    return success()

  return error(COLLECTION_CREATE_FAILED)
})
