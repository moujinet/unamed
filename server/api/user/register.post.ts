import { USER_NOT_FOUND, USER_PASSWORD_NOT_SAME } from '~/utils/errors'
import { createUser } from '~/server/model/user'

interface UserRegister {
  username: string
  password: string
  passwordConfirm: string
}

export default defineEventHandler(async (event) => {
  const { username, password, passwordConfirm } = await readBody<UserRegister>(event)

  if (!username || !password)
    return error(USER_NOT_FOUND)

  if (password !== passwordConfirm)
    return error(USER_PASSWORD_NOT_SAME)

  const result = await createUser({ username, password })

  if (typeof result === 'number')
    return payload(result)

  return error(result)
})
