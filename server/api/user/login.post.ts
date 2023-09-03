import { USER_NOT_FOUND, USER_PASSWORD_NOT_MATCH } from '~/utils/errors'
import { createSession } from '~/server/model/session'
import { createHashedPassword, getUserByUsername } from '~/server/model/user'

interface UserLogin {
  username: string
  password: string
}

interface UserToken {
  token: string
}

export default defineEventHandler(async (event) => {
  const { username, password } = await readBody<UserLogin>(event)

  if (!username || !password)
    return error(USER_NOT_FOUND)

  const user = await getUserByUsername(username.trim())

  if (!user)
    return error(USER_NOT_FOUND)

  const passwordHash = await createHashedPassword(password.trim())
  if (user.password !== passwordHash)
    return error(USER_PASSWORD_NOT_MATCH)

  return payload<UserToken>({
    token: await createSession(user.id),
  })
})
