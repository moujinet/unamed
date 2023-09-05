import type { ErrorCode, ITagModel } from '~/types'
import {
  SUCCESS,
  TAG_ALREADY_EXISTS,
  TAG_CREATE_FAILED,
  TAG_DELETE_FAILED,
  TAG_HAS_BOOKMARKS,
  TAG_NOT_FOUND,
  TAG_UPDATE_FAILED,
} from '~/utils/errors'
import { prisma } from '~/prisma/client'

export async function isExistsTagName(name: string, id?: number): Promise<boolean> {
  return (await prisma.tag.findMany({ where: id ? { name, NOT: { id } } : { name } })).length > 0
}

export async function isExistsTagId(id: number, name?: string): Promise<boolean> {
  return await prisma.tag.findUnique({
    where: name ? { id, NOT: { name } } : { id },
    select: { id: true },
  }) !== null
}

export async function getTags(): Promise<ITagModel[]> {
  return await prisma.tag.findMany()
}

export async function getTag(id: number): Promise<ITagModel | null> {
  return await prisma.tag.findUnique({
    where: { id },
  })
}

export async function createTag(data: Pick<ITagModel, 'name' | 'author_id'>): Promise<ErrorCode | number> {
  const { name } = data

  if (await isExistsTagName(name))
    return TAG_ALREADY_EXISTS

  const newTag = await prisma.tag.create({
    data: {
      ...data,
    },
  })

  if (!newTag)
    return TAG_CREATE_FAILED

  return newTag.id
}

export async function updateTag(id: number, data: Pick<ITagModel, 'name'>): Promise<ErrorCode> {
  const { name } = data

  if (!(await isExistsTagId(id, name)))
    return TAG_NOT_FOUND

  if (await isExistsTagName(name, id))
    return TAG_ALREADY_EXISTS

  const tag = await prisma.tag.update({
    where: { id },
    data: {
      name,
    },
  })

  if (!tag)
    return TAG_UPDATE_FAILED

  return SUCCESS
}

export async function deleteTag(id: number): Promise<ErrorCode> {
  const tag = await prisma.tag.findUnique({
    where: { id },
    include: { bookmarks: true },
  })

  if (!tag)
    return TAG_NOT_FOUND

  if (tag.bookmarks.length > 0)
    return TAG_HAS_BOOKMARKS

  if (!(await prisma.tag.delete({ where: { id } })))
    return TAG_DELETE_FAILED

  return SUCCESS
}
