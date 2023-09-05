import {
  COLLECTION_ALREADY_EXISTS,
  COLLECTION_CREATE_FAILED,
  COLLECTION_DELETE_FAILED,
  COLLECTION_HAS_BOOKMARKS,
  COLLECTION_NOT_FOUND,
  COLLECTION_UPDATE_FAILED,
  SUCCESS,
} from '~/utils/errors'
import type { ErrorCode, ICollectionModel } from '~/types'
import { prisma } from '~/prisma/client'

export async function isExistsCollectionId(id: number): Promise<boolean> {
  return (await prisma.collection.findMany({ where: { id } })).length > 0
}

export async function isExistsCollectionName(name: string): Promise<boolean> {
  return (await prisma.collection.findMany({ where: { name } })).length > 0
}

export async function getCollections(): Promise<ICollectionModel[]> {
  return await prisma.collection.findMany({
    orderBy: {
      created_at: 'desc',
    },
  })
}

export async function getCollection(id: number): Promise<ICollectionModel | null> {
  return await prisma.collection.findUnique({
    where: {
      id,
    },
  })
}

export async function createCollection(data: Partial<Omit<ICollectionModel, 'id' | 'created_at'>>): Promise<ErrorCode | number> {
  if (!data.name || data.name.trim() === '')
    return COLLECTION_CREATE_FAILED

  if (!data.icon || data.icon.trim() === '')
    return COLLECTION_CREATE_FAILED

  if (!data.author_id)
    return COLLECTION_CREATE_FAILED

  if (await isExistsCollectionName(data.name.trim()))
    return COLLECTION_ALREADY_EXISTS

  const newCollection = await prisma.collection.create({
    data: {
      author_id: data.author_id,
      name: data.name.trim(),
      icon: data.icon.trim(),
    },
  })

  if (!newCollection)
    return COLLECTION_CREATE_FAILED

  return newCollection.id
}

export async function updateCollection(id: number, data: Partial<Omit<ICollectionModel, 'id' | 'created_at'>>): Promise<ErrorCode> {
  if (!data.name || data.name.trim() === '')
    return COLLECTION_UPDATE_FAILED

  if (!data.icon || data.icon.trim() === '')
    return COLLECTION_UPDATE_FAILED

  if (!(await isExistsCollectionId(id)))
    return COLLECTION_NOT_FOUND

  const collection = await prisma.collection.update({
    where: {
      id,
    },
    data: {
      name: data.name.trim(),
      icon: data.icon.trim(),
    },
  })

  if (!collection)
    return COLLECTION_UPDATE_FAILED

  return SUCCESS
}

export async function deleteCollection(id: number): Promise<ErrorCode> {
  const collection = await prisma.collection.findUnique({
    where: {
      id,
    },
    include: {
      bookmarks: true,
    },
  })

  if (!collection)
    return COLLECTION_NOT_FOUND

  if (collection.bookmarks.length > 0)
    return COLLECTION_HAS_BOOKMARKS

  if (await prisma.collection.delete({
    where: {
      id,
    },
  }))
    return SUCCESS

  return COLLECTION_DELETE_FAILED
}
