import { USER_NOT_FOUND } from '~/utils/errors'
import { updateUser } from '~/server/model/user'

interface UpdateProfile {
  username: string
  fullname: string
}

export default defineEventHandler(async (event) => {
  const data = await readBody<UpdateProfile>(event)

  if (!data.username || data.username.trim() === '')
    return error(USER_NOT_FOUND)

  const code = await updateUser(event.context.user.id, {
    username: data.username.trim(),
    fullname: data.fullname.trim(),
  })
  return payload(null, code)
})
