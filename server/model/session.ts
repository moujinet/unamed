import { prisma } from '~/prisma/client'

export async function getSession(token: string) {
  const session = await prisma.session.findFirst({
    where: {
      token,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          password: true,
          fullname: true,
          avatar: true,
          is_admin: true,
          created_at: true,
        },
      },
    },
    orderBy: {
      created_at: 'desc',
    },
  })

  if (!session)
    return false

  const now = Math.round(new Date().getTime() / 1000)
  if (now > session.expires)
    return false

  return session
}

export async function createSession(userId: number, expires: number = -1): Promise<string> {
  const DEFAULT_SESSION_EXPIRES = useRuntimeConfig().session.expires
  const now = Math.round(new Date().getTime() / 1000)

  // destroy old session
  await deleteSessionByUserId(userId)

  const { createHash } = await import('node:crypto')
  const token = createHash('sha256')
    .update(now.toString() + userId.toString() + expires.toString())
    .digest('hex')

  const session = await prisma.session.create({
    data: {
      user_id: userId,
      token,
      expires: now + (expires === -1 ? DEFAULT_SESSION_EXPIRES : expires),
    },
  })

  return session.token
}

export async function deleteSessionByUserId(userId: number) {
  return await prisma.session.deleteMany({
    where: {
      user_id: userId,
    },
  })
}

export async function deleteSession(token: string) {
  const session = await getSession(token)

  if (!session)
    return false

  return await deleteSessionByUserId(session.user_id)
}
