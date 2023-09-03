import { USER_PASSWORD_NOT_MATCH, USER_PASSWORD_NOT_SAME } from '~/utils/errors'
import { createHashedPassword, updateUser } from '~/server/model/user'

interface ChangePassword {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export default defineEventHandler(async (event) => {
  const data = await readBody<ChangePassword>(event)

  if (!data.password || !data.newPassword || !data.newPasswordConfirm)
    return error(USER_PASSWORD_NOT_SAME)

  if (data.newPassword.trim() !== data.newPasswordConfirm.trim())
    return error(USER_PASSWORD_NOT_SAME)

  const password = await createHashedPassword(data.password.trim())
  if (password !== event.context.user.password)
    return error(USER_PASSWORD_NOT_MATCH)

  const code = await updateUser(event.context.user.id, { password: data.newPassword })

  return payload(null, code)
})
