import { USER_NOT_FOUND } from '~/utils/errors'
import { getUser } from '~/server/model/user'

export default defineEventHandler(async (event) => {
  const profile = await getUser(event.context.user.id)

  if (!profile)
    return error(USER_NOT_FOUND)

  return payload(profile)
})
