import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import {
  USER_ALREADY_EXISTS,
  USER_CREATE_FAILED,
  USER_PASSWORD_NOT_SAME_TWICE,
} from '~/utils/errors'

interface IRegisterUserBody {
  username: string
  password: string
  passwordConfirm: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { username, password, passwordConfirm } = await readBody<IRegisterUserBody>(event)

  if (username.trim() === '' || password.trim() === '' || passwordConfirm.trim() === '')
    return error(USER_CREATE_FAILED)

  if (password.trim() !== passwordConfirm.trim())
    return error(USER_PASSWORD_NOT_SAME_TWICE)

  const exists = await prisma.user.findUnique({
    where: {
      username: username.trim(),
    },
  })

  if (exists)
    return error(USER_ALREADY_EXISTS)

  const hashedPassword = await createHashedPassword(password.trim())
  const newUser = await prisma.user.create({
    data: {
      username: username.trim(),
      password: hashedPassword,
    },
  })

  if (!newUser)
    return error(USER_CREATE_FAILED)

  return success()
})
