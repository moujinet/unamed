import { prisma } from '~/prisma/client'

export async function getServerSession(token: string) {
  const session = await prisma.session.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  })

  return session
}

export async function checkSession(token: string): Promise<boolean> {
  const session = await getServerSession(token)

  if (!session)
    return false

  if (Math.round(new Date().getTime() / 1000) > session.expires) {
    await destroyToken(token)
    return false
  }

  return true
}

export async function createSession(userId: number): Promise<string> {
  const DEFAULT_SESSION_EXPIRES = useRuntimeConfig().session.expires
  const now = Math.round(new Date().getTime() / 1000)

  await destroySession(userId)

  const { createHash } = await import('node:crypto')
  const token = createHash('sha256')
    .update(now.toString() + userId.toString() + DEFAULT_SESSION_EXPIRES.toString())
    .digest('hex')

  const session = await prisma.session.create({
    data: {
      user_id: userId,
      token,
      expires: now + DEFAULT_SESSION_EXPIRES,
    },
  })

  return session.token
}

export async function destroySession(userId: number) {
  try {
    if (userId === 0)
      return

    if (await prisma.session.findFirst({ where: { user_id: userId } })) {
      await prisma.session.delete({
        where: {
          user_id: userId,
        },
      })
    }
  }
  catch (e) {
  }

  return true
}

export async function destroyToken(token: string) {
  try {
    if (token === '')
      return

    if (await prisma.session.findFirst({ where: { token } })) {
      await prisma.session.delete({
        where: {
          token,
        },
      })
    }
  }
  catch (e) {
  }

  return true
}
