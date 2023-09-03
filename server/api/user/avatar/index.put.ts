import { updateUser } from '~/server/model/user'

interface UpdateAvatar {
  avatar: string
}

export default defineEventHandler(async (event) => {
  const { avatar } = await readBody<UpdateAvatar>(event)
  const code = await updateUser(event.context.user.id, { avatar: avatar.trim() })

  return payload(null, code)
})
