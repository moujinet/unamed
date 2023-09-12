import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import {
  USER_LOGIN_FAILED,
  USER_NOT_FOUND,
  USER_PASSWORD_NOT_MATCH,
} from '~/utils/errors'

interface ILoginUserBody {
  username: string
  password: string
}

interface ILoginUserToken {
  token: string
}

export default defineEventHandler(async (event): IApiResponse<ILoginUserToken | null> => {
  const { username, password } = await readBody<ILoginUserBody>(event)

  if (username.trim() === '' || password.trim() === '')
    return error(USER_LOGIN_FAILED)

  const user = await prisma.user.findUnique({
    where: {
      username: username.trim(),
    },
  })

  if (!user)
    return error(USER_NOT_FOUND)

  const hashedPassword = await createHashedPassword(password.trim())
  if (user.password !== hashedPassword)
    return error(USER_PASSWORD_NOT_MATCH)

  return payload<ILoginUserToken>({
    token: await createSession(user.id),
  })
})
