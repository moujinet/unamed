import {
  SUCCESS,
  USER_ALREADY_EXISTS,
  USER_CREATE_FAILED,
  USER_DELETE_FAILED,
  USER_NOT_FOUND,
  USER_UPDATE_FAILED,
} from '~/utils/errors'
import type { ErrorCode, IUserModel } from '~/types'
import { prisma } from '~/prisma/client'

type IUserSafetyModel = Omit<IUserModel, 'password'>

export async function createHashedPassword(password: string): Promise<string> {
  const { createHash } = await import('node:crypto')

  return createHash('sha256')
    .update(password.trim())
    .digest('hex')
}

export async function isExistsUsername(username: string): Promise<boolean> {
  return (await prisma.user.findMany({ where: { username } })).length > 0
}

export async function isExistsUserId(id: number): Promise<boolean> {
  return (await prisma.user.findMany({ where: { id } })).length > 0
}

export async function getUserByUsername(username: string): Promise<Pick<IUserModel, 'id' | 'password'> | null> {
  return await prisma.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      password: true,
    },
  })
}

export async function getUser(id: number): Promise<IUserSafetyModel | null> {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      avatar: true,
      is_admin: true,
      created_at: true,
    },
  })
}

export async function setAdmin(id: number): Promise<ErrorCode> {
  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      is_admin: true,
    },
  })

  if (!user)
    return USER_UPDATE_FAILED

  return SUCCESS
}

export async function createUser(data: Partial<IUserModel>): Promise<ErrorCode | number> {
  if (!data.username || data.username.trim() === '')
    return USER_CREATE_FAILED

  if (!data.password || data.password.trim() === '')
    return USER_CREATE_FAILED

  if (await isExistsUsername(data.username.trim()))
    return USER_ALREADY_EXISTS

  const hashedPassword = await createHashedPassword(data.password.trim())
  const newUser = await prisma.user.create({
    data: {
      username: data.username.trim(),
      password: hashedPassword,
      fullname: data.fullname?.trim(),
      avatar: data.avatar?.trim(),
    },
  })

  if (!newUser)
    return USER_CREATE_FAILED

  return newUser.id
}

export async function updateUser(id: number, data: Partial<IUserModel>): Promise<ErrorCode> {
  if (data.username && !(await isExistsUsername(data.username.trim()))) {
    data.username = data.username.trim()
    return USER_NOT_FOUND
  }

  if (data.fullname)
    data.fullname = data.fullname.trim()

  if (data.password)
    data.password = await createHashedPassword(data.password.trim())

  if (!(await isExistsUserId(id)))
    return USER_NOT_FOUND

  const user = await prisma.user.update({
    where: {
      id,
    },
    data,
  })

  if (!user)
    return USER_UPDATE_FAILED

  return SUCCESS
}

export async function deleteUser(id: number): Promise<ErrorCode> {
  if (!(await isExistsUserId(id)))
    return USER_NOT_FOUND

  const user = await prisma.user.delete({
    where: {
      id,
    },
  })

  if (!user)
    return USER_DELETE_FAILED

  return SUCCESS
}
