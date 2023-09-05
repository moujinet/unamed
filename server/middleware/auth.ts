import { getSession } from '~/server/model/session'

export default defineEventHandler(async (to) => {
  // check whitelist API routes
  const whitelist = [
    { path: '/api/user/login$', method: 'POST' },
    { path: '/api/user/register$', method: 'POST' },
    { path: '/api/preferences$', method: 'GET' },
    { path: '/api/collection', method: 'GET' },
    { path: '/api/bookmark', method: 'GET' },
    { path: '/api/tag', method: 'GET' },
  ]

  // eslint-disable-next-line n/prefer-global/process
  if (process.server && to.path.startsWith('/api')) {
    if (whitelist.filter(e => (new RegExp(e.path)).test(to.path) && e.method === to.method).length === 0) {
      const token = getRequestHeaders(to).authorization?.replace('Bearer ', '')
      const session = await getSession(token || '')

      if (!token || !session || !session.user)
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })

      to.context.user = session.user
      to.context.token = token
    }
  }
})
