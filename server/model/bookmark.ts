import {
  BOOKMARK_ALREADY_EXISTS,
  BOOKMARK_CREATE_FAILED,
  BOOKMARK_DELETE_FAILED,
  BOOKMARK_NOT_FOUND,
  BOOKMARK_UPDATE_FAILED,
  SUCCESS,
} from '~/utils/errors'
import type { ErrorCode, IBookmarkModel } from '~/types'
import { prisma } from '~/prisma/client'

export async function isExistsBookmarkName(name: string): Promise<boolean> {
  return (await prisma.bookmark.findMany({ where: { name } })).length > 0
}

export async function isExistsBookmarkId(id: number): Promise<boolean> {
  return (await prisma.bookmark.findMany({ where: { id } })).length > 0
}

export async function createBookmark(data: Partial<Omit<IBookmarkModel, 'id'>>): Promise<ErrorCode | number> {
  if (!data.collection_id)
    return BOOKMARK_CREATE_FAILED

  if (!data.author_id)
    return BOOKMARK_CREATE_FAILED

  if (!data.name || data.name.trim() === '')
    return BOOKMARK_CREATE_FAILED

  if (!data.url || data.url.trim() === '')
    return BOOKMARK_CREATE_FAILED

  if (await isExistsBookmarkName(data.name.trim()))
    return BOOKMARK_ALREADY_EXISTS

  // TODO: when create bookmark, create tags in the bookmark

  const newBookmark = await prisma.bookmark.create({
    data: {
      author_id: data.author_id,
      collection_id: data.collection_id,
      name: data.name.trim(),
      url: data.url.trim(),
      description: data.description || '',
      icon: data.icon || '',
    },
  })

  if (!newBookmark)
    return BOOKMARK_CREATE_FAILED

  return newBookmark.id
}

export async function updateBookmark(id: number, data: Partial<Omit<IBookmarkModel, 'id'>>): Promise<ErrorCode> {
  if (!data.collection_id)
    return BOOKMARK_UPDATE_FAILED

  if (!data.name || data.name.trim() === '')
    return BOOKMARK_UPDATE_FAILED

  if (!data.url || data.url.trim() === '')
    return BOOKMARK_UPDATE_FAILED

  if (!(await isExistsBookmarkId(id)))
    return BOOKMARK_NOT_FOUND

  // TODO: when update bookmark, update all tags in the bookmark

  const bookmark = await prisma.bookmark.update({
    where: {
      id,
    },
    data: {
      collection_id: data.collection_id,
      name: data.name.trim(),
      url: data.url.trim(),
      description: data.description || '',
      icon: data.icon || '',
    },
  })

  if (!bookmark)
    return BOOKMARK_UPDATE_FAILED

  return SUCCESS
}

export async function deleteBookmark(id: number): Promise<ErrorCode> {
  if (!(await isExistsBookmarkId(id)))
    return BOOKMARK_NOT_FOUND

  // TODO: when delete bookmark, delete all tags in the bookmark

  if (await prisma.bookmark.delete({
    where: {
      id,
    },
  }))
    return SUCCESS

  return BOOKMARK_DELETE_FAILED
}
