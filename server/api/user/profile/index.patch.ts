import type { IApiResponse } from '~/types'
import { prisma } from '~/prisma/client'
import { USER_ALREADY_EXISTS, USER_UPDATE_FAILED } from '~/utils/errors'

interface IUpdateProfileBody {
  username?: string
  fullname?: string
}

export default defineEventHandler(async (event): IApiResponse<null> => {
  const { id } = event.context.user
  const { username, fullname } = await readBody<IUpdateProfileBody>(event)

  if (username) {
    const exists = await prisma.user.findUnique({
      where: {
        username: username.trim(),
        NOT: {
          id,
        },
      },
    })

    if (exists)
      return error(USER_ALREADY_EXISTS)
  }

  const user = await prisma.user.update({
    where: {
      id,
    },
    data: {
      username: username?.trim(),
      fullname: fullname?.trim(),
    },
  })

  if (!user)
    return error(USER_UPDATE_FAILED)

  return success()
})
