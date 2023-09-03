import { deleteSession } from '~/server/model/session'

export default defineEventHandler(async (event) => {
  if (event.context.token)
    await deleteSession(event.context.token)

  return success()
})
