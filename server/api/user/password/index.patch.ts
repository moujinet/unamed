import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import { USER_PASSWORD_NOT_MATCH, USER_PASSWORD_NOT_SAME_TWICE, USER_UPDATE_FAILED } from '~/utils/errors'

interface IChangePasswordBody {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id, password: userPassword } = event.context.user
  const { password, newPassword, newPasswordConfirm } = await readBody<IChangePasswordBody>(event)

  if (password.trim() === '')
    return error(USER_UPDATE_FAILED)

  if (newPassword.trim() !== newPasswordConfirm.trim())
    return error(USER_PASSWORD_NOT_SAME_TWICE)

  const hashedPassword = await createHashedPassword(password.trim())
  if (hashedPassword !== userPassword)
    return error(USER_PASSWORD_NOT_MATCH)

  const hashedNewPassword = await createHashedPassword(newPassword.trim())
  if (await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedNewPassword,
    },
  }))
    return success()

  return error(USER_UPDATE_FAILED)
})
