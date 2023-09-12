import type { IApiResponse, IUserModel } from '~/types'
import { prisma } from '~/prisma/client'
import { USER_NOT_FOUND } from '~/utils/errors'

export default defineEventHandler(async (event): IApiResponse<Omit<IUserModel, 'password'> | null> => {
  const { id } = event.context.user

  const profile = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      username: true,
      fullname: true,
      avatar: true,
      is_admin: true,
      created_at: true,
    },
  })

  if (!profile)
    return error(USER_NOT_FOUND)

  return payload<Omit<IUserModel, 'password'>>(profile)
})
