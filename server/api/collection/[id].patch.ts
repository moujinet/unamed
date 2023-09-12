import { prisma } from '~/prisma/client'
import type { IApiResponse } from '~/types'
import {
  COLLECTION_ALREADY_EXISTS,
  COLLECTION_CREATE_FAILED,
  COLLECTION_NOT_FOUND,
  COLLECTION_UPDATE_FAILED,
} from '~/utils/errors'

interface IUpdateCollectionBody {
  name: string
  icon: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = getRouterParams(event)
  const { name, icon } = await readBody<IUpdateCollectionBody>(event)

  if (id.trim() === '')
    return error(COLLECTION_NOT_FOUND)

  if (name.trim() === '' || icon.trim() === '')
    return error(COLLECTION_CREATE_FAILED)

  const existsId = await prisma.collection.findUnique({
    where: {
      id: Number.parseInt(id.trim()),
    },
  })

  if (!existsId)
    return error(COLLECTION_NOT_FOUND)

  const exists = await prisma.collection.findUnique({
    where: {
      name: name.trim(),
      NOT: {
        id: Number.parseInt(id.trim()),
      },
    },
  })

  if (exists)
    return error(COLLECTION_ALREADY_EXISTS)

  const collection = await prisma.collection.update({
    where: {
      id: Number.parseInt(id.trim()),
    },
    data: {
      name: name.trim(),
      icon: icon.trim(),
    },
  })

  if (collection)
    return success()

  return error(COLLECTION_UPDATE_FAILED)
})
